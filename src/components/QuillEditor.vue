<template>
    <div class="edit_container">
        <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)">
        </quill-editor>
        <button v-on:click="saveHtml">保存</button>
    </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
    name: 'App',
    data() {
        const toolbarOptions = [
            // ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            // [{ 'color': [] }, { 'background': [] }],             
            // ['blockquote', 'code-block'],
            // [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            // [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            // [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            // [{ 'direction': 'rtl' }],                         // text direction          // dropdown with defaults from theme
            // ['image'],                       
        ]
        return {
            content: `<p>hello world</p>`,
            editorOption: {
                placeholder: '',
                theme: 'snow',  // or 'bubble'
                modules: {
                    toolbar: {
                        container: toolbarOptions,  // 工具栏
                    },
                    syntax: {
                        highlight: text => hljs.highlightAuto(text).value
                    }
                }
            }
        }
    }, 
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        },
    }, methods: {
        onEditorReady(editor) { // 准备编辑器
        },
        onEditorBlur() { }, // 失去焦点事件
        onEditorFocus() { }, // 获得焦点事件
        onEditorChange() { }, // 内容改变事件
        saveHtml: function(event) {
            alert(this.content);
        }
    }
}
</script>

<style>

</style>