<template>
  <quill-editor
    v-model:value="state.content"
    :options="state.editorOption"
    :disabled="state.disabled"
    @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)"
    @ready="onEditorReady($event)"
    @change="onEditorChange($event)"
  />
</template>

<script lang="ts">
import { reactive, defineComponent } from "vue";
import { quillEditor } from "vue3-quill";

export default defineComponent({
  components: {
    quillEditor,
  },
  props: {
    content: {
      type: String
    }
  },
  emits: ['contentChange'],
  setup(props, context) {
    
    const state = reactive({
      dynamicComponent: null,
      content: "<p>2333</p>",
      _content: "",
      editorOption: {
        placeholder: "core",
        modules: {
          toolbar: [
            // custom toolbars options
            // will override the default configuration
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ["clean"],
            ["link", "image", "video"],
          ],
          // other moudle options here
        },
        // more options
      },
      disabled: false,
    });
    console.log(JSON.stringify(props["content"]), 'state')
    const content = props['content'] && props['content'].length > 0 ? props['content'] : ''
    state.content = content
    const onEditorBlur = (quill) => {
      console.log("editor blur!", quill);
    };
    const onEditorFocus = (quill) => {
      console.log("editor focus!", quill);
    };
    const onEditorReady = (quill) => {
      console.log("editor ready!", quill);
    };
    const onEditorChange = ({ quill, html, text }) => {
      console.log("editor change!", quill, html, text);
      console.log("editor change!",  html);
      state._content = html;
      context.emit('contentChange', state)
    };

    return { state, onEditorBlur, onEditorFocus, onEditorReady, onEditorChange };
  },
});
</script>
