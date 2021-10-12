<template>
    <div class="p-4 flex flex-col">
        <h2>Package Dependencies</h2>
        <div class="flex flex-row items-center my-5"> 
            <label>Package</label>
            <input class="dark text-base" type="text" v-model="npmPackage.name" placeholder="socket.io, vue, nuxt, express"/>
            <label>Version</label>
            <input class="ml-2 dark text-base" type="text" v-model="npmPackage.version" placeholder="version"/>
            <button class="lg success" @click="packageInfo()"> 
                <span v-if="!loadData">GO</span>
                <div v-else class="w-4 h-4 animate-spin">|</div>
            </button>
            <button v-if="npmPackage.data" class="lg" @click="viewPre=!viewPre">
                <span v-if="!viewPre">View Data Object</span>
                <span v-else>View Tree</span>
            </button> 
        </div>
        
        
        <div v-if="npmPackage.data && npmPackage.data.dependencies && !viewPre" class="flex flex-col border-b mt-4">
            <ul>
                <template v-for="key in Object.keys(npmPackage.data.dependencies)">
                    <li class="list-none my-4" :key="key">
                        <span class="px-2 pr-4 py-2 bg-black text-white text-base rounded-tl rounded-bl">{{ key }}</span>
                        <span class="px-2 py-2 bg-gray-400 text-base text-black rounded-tr rounded-br">{{ npmPackage.data.dependencies[key].version }}</span>
                    </li>
                    <div class="ml-4" v-if="npmPackage.data.dependencies[key].dependencies">
                        <div v-if="Object.keys ( npmPackage.data.dependencies[key].dependencies ) && Object.keys ( npmPackage.data.dependencies[key].dependencies ).length">
                            <PackageTree 
                                :root="npmPackage.data.dependencies[key].dependencies"  
                                :name="key"
                                @search="dependencyInfo"/>
                        </div>
                    </div>
                </template>
            </ul>
        </div>
        <div class="w-full text-center m-4 text-base text-red-400"> {{ error }}</div>
        <pre v-if="npmPackage.data && viewPre">{{ npmPackage.data }}</pre>
        <div v-if="loadData" class="fixed z-10 top-0 right-0 m-2 animate-spin text-3xl">|</div>
    </div>
</template>

<script>
export default {
  name: 'PackageSearch',
  components:{
      'PackageTree' : () => import ( './PackageTree.vue')
  },
  data:()=>({ 
    npmPackage: {
      name: 'socket.io',
      version: '',
      qryString: '',
      data: null
    },
    loadData: false,
    error: '',
    current : null,
    viewPre: false,
  }),
  methods: {
    packageInfo(){
        this.npmPackage.name.length < 2 || this.npmPackage.version.length < 2 ?
            this.error = 'Package name / version not valid' : this.error = ''
        if ( this.error ) return
        this.npmPackage.data = {}
        this.loadData = true
        fetch ( process.env.VUE_APP_API_URL + 'npmregistry?name=' + this.npmPackage.name + '&version=' + this.npmPackage.version).then ( res => res.json() ).then ( data => {
            console.log ( data )
            this.npmPackage.data = data
            this.loadData = false
        }).catch ( error => {
            console.log ( error )
            this.loadData = false
        })
       
    },
    dependencyInfo(dependency,version,name){
        console.log ( dependency , name )
        this.loadData = true
        fetch ( process.env.VUE_APP_API_URL + 'npmregistry?name=' + dependency + '&version=' + version).then ( res => res.json() ).then ( data => {
            console.log ( data )
            
            this.npmPackage.data.dependencies[name].dependencies[dependency] = { version: version , dependencies : data.dependencies } 
            this.loadData = false
        }).catch ( error => {
            console.log ( error )
            this.loadData = false
        })
    }
  },
}
</script>