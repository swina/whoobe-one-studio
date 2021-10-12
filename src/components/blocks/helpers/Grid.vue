<template>
    <div class="w-full">
        Columns <select v-model="cols" class="h-8 w-16">
            <option v-for="n in 6" :value="n">{{n}}</option>
        </select>
        <div class="grid" :class="'grid-cols-' + cols">
            <template v-for="layout in colSpans[cols]">
                <template v-for="colspan in layout">
                    <div class="flex m-1 border border-dashed border-gray-500 bg-bluegray-100 items-center justify-center cursor-pointer" :class="'col-span-' + colspan" @click="createGrid(colspan,layout)" :title="layout">
                        {{ colspan }}
                    </div>
                </template>
            </template>
        </div>
    </div>
</template>

<script>
import Element from '@/scripts/ElementsClass'
export default {
    name: 'GridHelper',
    data:()=>({
        n: 1,
        cols: 3,
        colSpans : {
            "1" : [ [1] ],
            "2" : [ [1 , 1] ],
            "3" : [ [1,1,1] , [1,2] , [2,1] ],
            "4" : [ [1,1,1,1], [2,2] , [1,3] , [1,1,2] , [1,2,1] , [ 2 , 1 , 1] , [ 3,1 ] ] ,
            "5" : [ [1,1,1,1,1],[1,1,1,2] , [1,1,3] , [1,4] , [1,1,2,1] , [1,2,1,1] , [ 1, 3 ,1] , [ 2,1,1,1] , [3,1,1] , [3,2] , [4,1] ],
            "6" : [ [1,1,1,1,1,1],[1,1,1,1,2] , [1,1,1,3] , [1,1,4] , [1,5] , [1,1,1,2,1] , [1,1,2,1,1] , [1,1,3,1] , [1,2,1,1,1] , [1,3,1,1] , [1,4,1] , [2,1,1,1,1] , [3,1,1,1] , [4,1,1] , [5,1] ],
        }
    }),
    computed:{
        gridLayout(){
            return this.colSpans[this.cols]
        },
    },
    methods:{
        createGrid(cols,layout){
            let grid = new Element().Grid().Cols(this.cols)
            for ( var n=0 ; n < layout.length ; n++ ){
                let el = new Element()
                    .Flexbox({
                        direction:'row',
                        colspan:layout[n]
                    })
                    .setIcon('highlight_alt')
                grid.blocks.push ( el )
            }
            this.$store.state.editor.current.blocks.push ( grid )
            this.$emit('close')
        }
    }
}
</script>