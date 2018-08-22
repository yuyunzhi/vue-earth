<template>
  <div id="app">
    <Header></Header>
    <router-view/>
  </div>
</template>

<script>

import Header from './components/Header.vue'

export default {
 
  data(){
    return{

    }
  },
  components:{
    Header,
  }
}

</script>

<style lang="scss" type="text/css">
*{
  margin:0;
  padding:0;
}
a,ul,ol,li{
  list-style: none;
  text-decoration: none;
  color:black;
}

.icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    
}


</style>
