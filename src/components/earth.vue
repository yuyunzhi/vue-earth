<template>
     <div class="world">
        <div class="world-bg"></div>
        <div class="world-globe">
            <div class="world-globe-pole"></div>
            <div class="world-globe-doms-container"></div>
            <div class="world-globe-halo"></div>
        </div>
    </div>
</template>

<script>

export default {
  props:[],
  render(createElement){
      return createElement()
  },
  data(){
    return {
        config:{
            percent: 0,
            lat: 0,
            lng: 0,
            segX: 14,
            segY: 12,
            isHaloVisible: true,
            isPoleVisible: true,
            autoSpin: false,
            zoom: 0,

            skipPreloaderAnimation: false,

            goToBristol: function() {
                goTo(51.4500, 2.5833);
            }
    },
        URLS:{
            bg: 'http://wow.techbrood.com/uploads/160401/css_globe_bg.jpg',
            diffuse: 'http://wow.techbrood.com/uploads/160401/css_globe_diffuse.jpg',
            halo: 'http://wow.techbrood.com/uploads/160401/css_globe_halo.png',
        },
        
    }
  },
  created(){},
  mounted(){
      this.init()
  },
  methods:{
      init(ref) {
        var world = document.querySelector('.world')
        var worldBg = document.querySelector('.world-bg')
        worldBg.style.backgroundImage = 'url(' + this.URLS.bg + ')'
        var globe = document.querySelector('.world-globe')
        var globeContainer = document.querySelector('.world-globe-doms-container')
        var globePole = document.querySelector('.world-globe-pole')
        var globeHalo = document.querySelector('.world-globe-halo')
        globeHalo.style.backgroundImage = 'url(' + this.URLS.halo + ')'

        //this.regenerateGlobe();

        var gui = new dat.GUI();
        gui.add(this.config, 'lat', -90, 90).listen();
        gui.add(this.config, 'lng', -180, 180).listen();
        gui.add(this.config, 'isHaloVisible');
        gui.add(this.config, 'isPoleVisible');
        gui.add(this.config, 'autoSpin');
        gui.add(this.config, 'goToBristol');
        gui.add(this.config, 'zoom', 0,1).listen();

        var stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = 0;
        stats.domElement.style.top = 0;
        document.body.appendChild(stats.domElement);

    //     // events
    //     world.ondragstart = function() {  //禁止鼠标拖动
    //         return false;
    //     };
    //     world.addEventListener('mousedown', onMouseDown);
    //     world.addEventListener('mousemove', onMouseMove);
    //     world.addEventListener('mouseup', onMouseUp);
    //     world.addEventListener('touchstart', touchPass(onMouseDown));
    //     world.addEventListener('touchmove', touchPass(onMouseMove));
    //     world.addEventListener('touchend', touchPass(onMouseUp));
    //     world.addEventListener('mousewheel', function(e){
    //         e = e || window.event;  
    //                 if (e.wheelDelta) {  //第一步：先判断浏览器IE，谷歌滑轮事件               
    //                     if (e.wheelDelta > 0) { //当滑轮向上滚动时  
    //                         if('zoom==0){
    //                             'zoom=0.5
                                
    //                         } else if('zoom==1){
    //                             return
    //                         }else if('zoom==0.5){
    //                             'zoom=1
    //                         }
    //                     } else if (e.wheelDelta < 0) { //当滑轮向下滚动时  
    //                         if('zoom==0){
    //                             return
    //                         } else if('zoom==1){
    //                             'zoom=0.5
    //                         }else if('zoom==0.5){
    //                             'zoom=0
    //                         } 
    //                 }  
    //             } 
    //     });
    //     var picture = document.querySelectorAll('.picture')
    //     for(var i=0;i<picture.length;i++){
    //         picture[i].addEventListener('mouseover', function(e){
    //         pictureId=e.target.id
    //         string=pictureId.split('-')
    //         x=string[1]
    //         y=string[2]
    //         console.log('this',this)
    //         this.addEventListener('mousewheel',function(e){
    //             console.log('我是滚轮监听',x,y)
    //         })
    //     });
    //     }

    //     loop();
     }
  },
components:{}
}
</script>

<style lang="scss" type="text/css" scoped>

html,
body {
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0 0;
    overflow: hidden;
    font-family: 'Lato', sans-serif;
    background-color: #000;
    color: #fff;
}
.world {
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
    cursor: move;
    cursor: -moz-grab;
    cursor: -webkit-grab;
    cursor: grab;
    border:5px solid red;
}
.world-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background-position: 50% 50%;
    background-size: cover;
}
.world-globe {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 0;
    height: 0;
}
.world-globe-pole {
    position: absolute;
    width: 530px;
    height: 530px;
    left: -265px;
    top: -265px;
    border-radius: 50% 50%;
    background-color: #fff;
}
.world-globe-doms-container {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 0;
    height: 0;
}
.world-globe-halo {
    position: absolute;
    left: 50%;
    top: 50%;
    width:530px;
    height:530px;
    margin-left: -368px;
    margin-top: -350px;
    display: none;
}
.info {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 10px 10px;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    font-size: 12px;
}
.info-desc {
    color: #ddd;
    font-size: 10px;
}
a {
    color: #ff5f5f;
}
</style>