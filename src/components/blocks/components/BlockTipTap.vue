<template>
    <div class="p-2 bg-white h-3/4">
        <div v-if="editor" class="flex flex-row w-full shadow p-1 items-center justify-between">
            <m-icon icon="format_bold" class="toolbar-icon" @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }"/>
            
            <m-icon icon="format_italic" class="toolbar-icon" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }"/>


            <m-icon icon="format_strikethrough" class="toolbar-icon" @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }"/>



            <m-icon icon="code" class="toolbar-icon" @click="editor.chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }"/>

      <!-- <button @click="editor.chain().focus().unsetAllMarks().run()">
        clear marks
      </button>
      <button @click="editor.chain().focus().clearNodes().run()">
        clear nodes
      </button> -->
            <m-icon icon="subject" class="toolbar-icon toolbar-icon" @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }"/>

          
            <button class="toolbar-icon bg-transparent text-black p-0" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
                h1
            </button>
            <button class="toolbar-icon bg-transparent text-black p-0" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                h2
            </button>
            <button class="toolbar-icon bg-transparent text-black p-0" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
                h3
            </button>
            <button class="toolbar-icon bg-transparent text-black p-0" @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
                h4
            </button>
            <button class="toolbar-icon bg-transparent text-black p-0" @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
                h5
            </button>
            <button class="toolbar-icon bg-transparent text-black p-0" @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
                h6
            </button>


            <m-icon icon="list" class="toolbar-icon" @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }"/>

            <m-icon icon="format_list_numbered" class="toolbar-icon"  @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }"/>

            <!-- <button @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">
                code block
            </button> -->
            <m-icon icon="format_quote"class="toolbar-icon"  @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }"/>

            <m-icon icon="horizontal_rule"class="toolbar-icon"  @click="editor.chain().focus().setHorizontalRule().run()"/>
            <!-- <button @click="editor.chain().focus().setHardBreak().run()">
            hard break
            </button> -->
            <m-icon icon="photo" class="toolbar-icon" @click="addImage=!addImage"/>
            <!-- <m-icon icon="undo" class="toolbar-icon" @click="editor.chain().focus().undo().run()"/>

            <m-icon icon="redo" class="toolbar-icon" @click="editor.chain().focus().redo().run()"/> -->
            <div v-if="addImage">
                <input type="text" v-model="image"/><button @click="setImage">OK</button>
            </div>
        </div>
        <div class="absolute inset-0 overflow-y-auto mt-32 mb-10 mx-4 border">
            <editor-content :editor="editor" />
        </div>
    </div>
</template> 

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
export default {
  components: {
    EditorContent,
  },


  data:()=>({
      editor: null,
      image: null,
      addImage: false
   }),

  watch: {
      image(value){
        if (!value) return
        this.editor.chain().focus().setImage({ src: value }).run()
        //this.image = null
      },
    modelValue(value) {
      // HTML
      const isSame = this.editor.getHTML() === value

      // JSON
      // const isSame = this.editor.getJSON().toString() === value.toString()

      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    },
  },
    methods:{
        setImage(){
            this.editor.chain().focus().setImage({ src: this.image }).run()
            this.image = null
        }
    },
  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        Image
      ],
      content: this.$attrs.value ? this.$attrs.value : this.$store.state.editor.current.content ,
      onUpdate: () => {
        // HTML
        this.$attrs.value ?
            this.$emit('input', this.editor.getHTML()) :
                this.$store.state.editor.current.content = this.editor.getHTML() 

        // JSON
        // this.$emit('update:modelValue', this.editor.getJSON())
      },
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>

