<template>
  <div class="clearfix">
        <!-- action="https://b.tb-test-k8s.enbrands.com/api/upload/image" -->
    <a-upload
      :action="preFixUrl + '/api/upload/image'"
      accept=".png, .jpg, .webp, .gif"
      name="image"
      :withCredentials="false"
      list-type="picture-card"
      v-model:file-list="fileList"
      @preview="handlePreview"
      :headers="headers"
      @change="handleChange"
      :before-upload="beforeUpload"
    >
      <div v-if="fileList.length < maxLength">
        <plus-outlined />
        <div class="ant-upload-text">上传图片</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script lang="ts">
import { PlusOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
import { message } from 'ant-design-vue';
import storage from "@/utils/storage";
function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response?: any;
  percent?: number;
  url?: string;
  preview?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  originFileObj?: any;
  size?: number;
  type?: string;

}

interface FileInfo {
  file: FileItem;
  fileList: FileItem[];
}

export default defineComponent({
  components: {
    PlusOutlined,
  },
  props: {
    maxLength: {
      type: Number,
      default: 1
    },
    imgList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  expose: ['clearImg'],
  emits: ['uploadImgList'],
  setup(props, context) {
    const previewVisible = ref<boolean>(false);
    const previewImage = ref<string | undefined>('');
    const fileList = ref<FileItem[]>([]);
    const preFixUrl = ref(storage.get('domain') || 'https://tb-testphp1.enbrands.com')
    const headers = ref({
      authorization: storage.get('TOKEN'),
      token: storage.get('TOKEN')
    })
    if (props && props['imgList'] && props['imgList'].length > 0) {
      fileList.value = fileList.value.concat(JSON.parse(JSON.stringify(props['imgList'])))
    }
    console.log('11111111')
    // if (props && props['imgList'] && props['imgList'].length > 0) {
    //   fileList.value = fileList.value.concat(JSON.parse(JSON.stringify(props['imgList'])))
    // } else {
    //   fileList.value = []
    // }
    const handleCancel = () => {
      previewVisible.value = false;
    };
    const handlePreview = async (file: FileItem) => {
      if (!file.url && !file.preview) {
        file.preview = (await getBase64(file.originFileObj)) as string;
      }
      previewImage.value = file.url || file.preview;
      previewVisible.value = true;
    };

    // 上传文件之前
    const beforeUpload = (file: FileItem) => {
      if(fileList.value.length > props['maxLength']) {
        message.error('最大不能超过'+ props['maxLength'] + '图片');
        return
      }
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('必须上传png|jpeg|jpg的图片格式');
      }
      const isLt2M = file && file.size &&(file.size / 1024 / 1024 < 1);
      if (!isLt2M) {
        message.error('图片大小不超过1M!');
      }
      return isJpgOrPng && isLt2M;
    };
    const handleChange = ({ fileList: newFileList}: FileInfo) => {
      fileList.value = newFileList
      console.log(newFileList, 'temp')
      // 上传完都成功了吧图片抛出去
      const arr  = fileList.value.filter(item =>  item &&  item.response && item.response.retcode === 0)
      if (arr.length > 0) {
        const temp = arr.map (item => {
          return {
            name: item.name,
            type: item.type,
            uid: item.uid,
            size: item.size,
            status: 'done',
            url: item.response.content.imageUrl
          }
        })
        console.log(temp, arr, 'temptemptemp')
        context.emit('uploadImgList', temp, arr)
      } else {
         context.emit('uploadImgList', [], arr)
      }
    };
    const clearImg = () => {
        fileList.value = []
        context.emit('uploadImgList', [])
    }
    context.expose(clearImg)
    // watch(() => props['imgList'], () => {
    //   console.log( props['imgList'], 'ddddddddddddddddd')
    //     fileList.value = fileList.value.concat(JSON.parse(JSON.stringify(props['imgList'])))
    // } )
    return {
      // 清空文件
      clearImg,
      previewVisible,
      previewImage,
      fileList,
      // 上传文件之前
      beforeUpload,
      handleCancel,
      handlePreview,
      // 文件发生变化了
      handleChange,
      preFixUrl,
      headers
      // 文件发生变化
      // uploadImgChange
    };
  },
});
</script>
<style lang="less" scoped>
.ant-upload-select-picture-card i {
  color: #999;
  font-size: 32px;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
