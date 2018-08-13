<template>
  <div class="wrapper">

  </div>
</template>

<script>
export default {
  props:[],
  data(){
    return {
    }
  },
  created(){},
  mounted(){
      this.init()
  },
  computed:{},
  methods:{
      init(){

            for(var i=0;i<10;i++){
                var dom=document.querySelector('.wrapper')
                var div=document.createElement('div')
                div.id='xxx'+i
                div.className="abc"
                div.innerText=i
                dom.appendChild(div)   
                div.add
            }
            var abc=document.querySelectorAll('.abc')
            console.log(abc)
            for(var i=0;i<abc.length;i++){
                abc[i].addEventListener('click',this.yyy)
            }
      },
      yyy(e){
          console.log(e.target.id)
      }
  },

}
</script>
<style lang="scss" type="text/css" scoped>
.wrapper{
    height:80%;
    width:80%;

}
</style>