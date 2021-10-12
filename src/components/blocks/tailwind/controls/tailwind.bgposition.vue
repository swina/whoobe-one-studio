<template>
    <div class="flex flex-row flex-wrap">
        
        <div class="w-full flex flex-col">
            Media
        <image-placeholder :image="$store.state.editor.current.image" @noimage="$store.state.editor.current.image=null" @media="$eventBus('linkMedia')" class="text-center"/>
        
        </div>
        <div class="w-full grid grid-cols-2 gap-3" v-if="$store.state.editor.current.image">
            <div class="w-1/2">
                <div>Size</div>
                <select v-model="bgposition.size" @change="updateCSS()">
                    <option value=""></option>
                    <option :key="size" v-for="size in bgsizes" :value="size">{{ size.replace('bg-','') }}</option>
                </select>
            </div>
            <div class="w-1/2 ml-1">
                <div>Position</div>
                <select v-model="bgposition.position" @change="updateCSS()">
                    <option value=""></option>
                    <option :key="pos" v-for="pos in bgpositions" :value="pos">{{ pos.replace('bg-','') }}</option>
                </select>
            </div>
            <div class="col-span-2">
                <div>Repeat</div>
                <select  v-model="bgposition.repeat" @change="updateCSS()">
                    <option value=""></option>
                    <option :key="rep" v-for="rep in bgrepeats" :value="rep">{{ rep.replace('bg-','') }}</option>
                </select>
            </div>
            <div class="col-span-2">
                <div>Attachment</div>
                <select v-model="bgposition.attachment" @change="updateCSS()">
                    <option value=""></option>
                    <option :key="att" v-for="att in bgattachments" :value="att">{{ att.replace('bg-','') }}</option>
                </select>
            </div>
            <div class="col-span-2">
                <div>Clip</div>
                <select v-model="bgposition.clip" @change="updateCSS()">
                    <option value=""></option>
                    <option :key="clip" v-for="clip in bgclips" :value="clip">{{ clip.replace('bg-','') }}</option>
                </select>
            </div>
            <div class="">
                <div>Origin</div>
                <select v-model="bgposition.origin" @change="updateCSS()">
                    <option value=""></option>
                    <option :key="origin" v-for="origin in bgorigin" :value="origin">{{ origin.replace('bg-','') }}</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MokaBgPosition',
    components: {
        'image-placeholder' : () => import ( '@/components/common/block.image.placeholder.vue' )
    },
    data:()=>({
        bgposition:{
            size: '',
            position: '',
            repeat: '',
            attachment: '',
            clip: ''
        },
        bgsizes: [
            'bg-auto',
            'bg-cover',
            'bg-contain'
        ],
        bgpositions: [
            'bg-center',
            'bg-top',
            'bg-bottom',
            'bg-left',
            'bg-left-top',
            'bg-left-bottom',
            'bg-right',
            'bg-right-top',
            'bg-right-bottom'
        ],
        bgrepeats: [
            'bg-no-repeat',
            'bg-repeat',
            'bg-repeat-x',
            'bg-repeat-y',
            'bg-repeat-round',
            'bg-repeat-space'
        ],
        bgattachments: [
            'bg-fixed',
            'bg-local',
            'bg-scroll'
        ],
        bgclips: [
            'bg-clip-border',
            'bg-clip-padding',
            'bg-clip-content',
            'bg-clip-text'
        ],
        bgorigin: [
            'bg-origin-border',
            'bg-origin-padding',
            'bg-origin-content'
        ]
    }),
    props: [ 'css' ],
    mounted(){
        if ( !this.css ) return
        let classi = this.css.split ( ' ' )
        classi.forEach ( cl => {
            this.bgsizes.forEach ( size => {
                if ( cl.indexOf ( size ) > -1 ){
                    this.bgposition['size'] = size
                    this.$emit('css',size)
                }
            })
            this.bgpositions.forEach ( pos => {
                if ( cl.indexOf ( pos ) > -1 ){
                    this.bgposition['position'] = pos
                    this.$emit('css',pos)
                }
            })
            this.bgrepeats.forEach ( rep => {
                if ( cl.indexOf ( rep ) > -1 ){
                    this.bgposition['repeat'] = rep
                    this.$emit('css',rep)
                }
            })
            this.bgattachments.forEach ( att => {
                if ( cl.indexOf ( att ) > -1 ){
                    this.bgposition['attachment'] = att 
                    this.$emit('css',att)
                }
            })
            this.bgclips.forEach ( clip => {
                if ( cl.indexOf ( clip ) > -1 ){
                    this.bgposition['clip'] = clip
                    this.$emit('css',clip)
                }
            })
        })
        this.updateCSS()
    },
    methods:{
        updateCSS(){
            this.$emit ( 'input' , this.$clean ( Object.values(this.bgposition ).join(' ') ) )
            this.$emit ( 'css' , this.$clean ( Object.values(this.bgposition ).join(' ') ) )
        }
    }
}
</script>