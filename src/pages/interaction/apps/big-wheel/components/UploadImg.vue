<template>
  <div class="clearfix">
    <a-upload
      action="https://tb-testphp1.enbrands.com/api/upload/image"
      list-type="picture-card"
      v-model:file-list="fileList"
      @preview="handlePreview"
      method="post"
      name="image"
      :beforeUpload="hangleCheck"
      @change="handleChange"
    >
      <div v-if="fileList.length == 0">
        <plus-outlined />
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
    <div class="sizesuggess" :style="textpos == 'common' ? 'float:left' : 'none'">
      尺寸建议：{{ size }}，支持png、jpg、大小不超过{{ space }}M
    </div>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script lang="ts">
import { PlusOutlined } from "@ant-design/icons-vue";
import { defineComponent, ref, computed,watch } from "vue";
import { message } from "ant-design-vue";
function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
interface TheContent {
  imageUrl: string;
}
interface Response {
  content: TheContent;
}
interface FileItem {
  uid: any;
  name?: string;
  status?: string;
  response?: Response;
  percent?: number;
  url?: string;
  preview?: string;
  originFileObj?: any;
}

interface FileInfo {
  file: FileItem;
  fileList: FileItem[];
}

export default defineComponent({
  components: {
    PlusOutlined
  },
  props: {
    size: {
      type: String,
      default: "250*250"
    },
    space: { type: Number || String, default: 10 },
    para: {
      type: String,
      default: ""
    },
    textpos: {
      type: String,
      default: "common"
    },
    picUrl: {
      type: String,
      default: ""
    }
  },
  
  setup(props, context) {
    const previewVisible = ref<boolean>(false);
    const previewImage = ref<string | undefined>("");
    let fileList = ref<FileItem[]>([]);
    if(props.picUrl){   //编辑
         let obj={
           url:props.picUrl,
           status:'done',
           uid:Math.random()
         }
         fileList.value[0]= obj
    }
    watch(props,(newValue, old) => { //新增
       if(newValue.picUrl){
         let obj={
           url:newValue.picUrl,
           status:'done',
           uid:Math.random()
         }

         fileList.value[0]= obj
       }
    });
    const handleCancel = () => {
      previewVisible.value = false;
    };
    const hangleCheck = (file: { name: string; size: number }) => {
      let type = file.name.split(".")[1];
      let commonSpace = props.space * 1024 * 1024;
      let typeData = "jpg,png,jpeg";
      if (file.size >= commonSpace) {
        //941296
        message.warning(`图片尺寸不能超过${props.space}M`);
        return false;
      }
      if (typeData.indexOf(type) == -1) {
        message.warning(`图片仅支持${typeData}格式`);
        return false;
      }
      return true;
    };
    /* const handRemove = () => {
      //fileList.value=[];
      let obj = {
        para: props.para,
        name: ""
      };
      context.emit("imageUrl", obj);
    }; */
    const handlePreview = async (file: FileItem) => {
      if (!file.url && !file.preview) {
        file.preview = (await getBase64(file.originFileObj)) as string;
      }
      previewImage.value = file.url || file.preview;
      previewVisible.value = true;
    };
    const handleChange = ({ file, fileList: newFileList }: FileInfo) => {
      if (file.status == "removed") {
        let obj = {
          para: props.para,
          name: ""
        };
        context.emit("imageUrl", obj);
        return;
      }
      let theContent = null;
      let theUrl = null;
      if (newFileList.length == 0) {
        theUrl = "";
      } else {
        if (newFileList[0].status == "done" && newFileList[0].response) {
          theContent = newFileList[0].response.content;
          if (theContent) {
            theUrl = theContent.imageUrl;
          }
          let obj = {
            para: props.para,
            name: theUrl
          };
          context.emit("imageUrl", obj);
        }
      }
    };
    
    return {
      previewVisible,
      previewImage,
      fileList,
      //handRemove,
      hangleCheck,
      handleCancel,
      handlePreview,
      handleChange
    };
  },
  
});
</script>
<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  color: #999;
  font-size: 32px;
}

.clearfix .ant-upload-picture-card-wrapper {
  float: left;
  width: 110px;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

.sizesuggess {
  width: 100px;
  margin-right: 10px;
  margin-left: 5px;
  font-size: 12px;
}
</style>
