<template>
  <div class="wrapper">
      <div>100000</div>
      <div class="xxx" @click="clickPop"></div>
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
      },
      clickPop(e){
          console.log(e)
      }
  },

}
</script>
<style lang="scss" type="text/css" scoped>
.wrapper{
    height:80%;
    width:80%;
    margin:0 auto;
    border:1px solid red;
    text-align: center;
}
.abc{
    border:1px solid blue;
}
.xxx{
    height:80%;
    width:80%;
    background:blue;
    opacity:0.3;
    position: absolute;
    pointer-events: none
}
</style>