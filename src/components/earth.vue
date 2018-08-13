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
        isMouseDown:false,
        isTweening:false,
        tick:1,

        globeContainer:null,
        globeDoms:[],

        pixelExpandOffset:1.5,
        rX:0,
        rY:0,
        rZ:0,
        dragX:null,
        dragY:null,
        dragLat:null,
        dragLng:null,
        dY:null,
        dX:null,
        sinRX:null,
        sinRY:null,
        sinRZ:null,
        cosRX:null,
        cosRY:null,
        cosRZ:null,

        vertices:[],
        verticesRow:[],
        
    }
  },
  created(){},
  mounted(){
      this.init()
  },
  methods:{
      init() {
        var world = document.querySelector('.world')
        var worldBg = document.querySelector('.world-bg')
        worldBg.style.backgroundImage = 'url(' + this.URLS.bg + ')'
        var globe = document.querySelector('.world-globe')
        this.globeContainer = document.querySelector('.world-globe-doms-container')
        var globePole = document.querySelector('.world-globe-pole')
        var globeHalo = document.querySelector('.world-globe-halo')
        globeHalo.style.backgroundImage = 'url(' + this.URLS.halo + ')'

        this.regenerateGlobe();

        //以下直接使用即可
        // var gui = new dat.GUI()
        // gui.add(this.config, 'lat', -90, 90).listen()
        // gui.add(this.config, 'lng', -180, 180).listen()
        // gui.add(this.config, 'isHaloVisible')
        // gui.add(this.config, 'isPoleVisible')
        // gui.add(this.config, 'autoSpin')
        // gui.add(this.config, 'goToBristol')
        // gui.add(this.config, 'zoom', 0,1).listen()

        var stats = new Stats()
        stats.domElement.style.position = 'absolute'
        stats.domElement.style.left = 0
        stats.domElement.style.top = 0
        document.body.appendChild(stats.domElement)

    //     // events
        world.ondragstart = function() {  //禁止鼠标拖动
            return false;
        };
        world.addEventListener('mousedown', this.onMouseDown);
        world.addEventListener('mousemove', this.onMouseMove);
        world.addEventListener('mouseup', this.onMouseUp);
        world.addEventListener('mousewheel', this.onMouseWheel)
        // world.addEventListener('touchstart', this.touchPass(this.onMouseDown));
        // world.addEventListener('touchmove', this.touchPass(this.onMouseMove));
        // world.addEventListener('touchend', this.touchPass(this.onMouseUp));


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
     },
     regenerateGlobe() {
        var dom, domStyle;
        var x, y;
        while (dom = this.globeContainer.firstChild) {
            this.globeContainer.removeChild(dom);
        }

        var segX = this.config.segX;
        var segY = this.config.segY;

        var diffuseImgBackgroundStyle = 'url(' + this.URLS.diffuse + ')';
        var segWidth = 1600 / this.segX | 0;
        var segHeight = 800 / this.segY | 0;

        var radius = (536) / 2;

        var phiStart = 0;
        var phiLength = Math.PI * 2;

        var thetaStart = 0;
        var thetaLength = Math.PI;

        for (y = 0; y <= segY; y++) {


            for (x = 0; x <= segX; x++) {

                var u = x / segX;
                var v = 0.05 + y / segY * (1 - 0.1);

                var vertex = {
                    x: -radius * Math.cos(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength),
                    y: -radius * Math.cos(thetaStart + v * thetaLength),
                    z: radius * Math.sin(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength),
                    phi: phiStart + u * phiLength,
                    theta: thetaStart + v * thetaLength
                };
                this.verticesRow.push(vertex);
            }
            this.vertices.push(this.verticesRow);
        }

        for (y = 0; y < segY; ++y) {
            for (x = 0; x < segX; ++x) {
                dom = document.createElement('div');
                dom.id='picture-'+y+'-'+x
                dom.className="picture"
                domStyle = dom.style;
                domStyle.position = 'absolute';
                domStyle.width = segWidth + 'px';
                domStyle.height = segHeight + 'px';
                domStyle.overflow = 'hidden';
                domStyle[PerspectiveTransform.transformOriginStyleName] = '0 0';
                domStyle.backgroundImage = diffuseImgBackgroundStyle;
                dom.perspectiveTransform = new PerspectiveTransform(dom, segWidth, segHeight);
                dom.topLeft = this.vertices[y][x];
                dom.topRight = this.vertices[y][x + 1];
                dom.bottomLeft = this.vertices[y + 1][x];
                dom.bottomRight = this.vertices[y + 1][x + 1];
                domStyle.backgroundPosition = (-segWidth * x) + 'px ' + (-segHeight * y) + 'px';
                this.globeContainer.appendChild(dom);
                this.globeDoms.push(dom);
            }
        }

    },
     onMouseDown(e) {
        console.log(e.target)
        this.isMouseDown = true
        this.dragX = e.pageX
        this.dragY = e.pageY
        this.dragLat = this.config.lat
        this.dragLng = this.config.lng
        console.log('我是mouseDown',this.dragX,this.dragY)
    },
    onMouseMove(e) {
        if (this.isMouseDown) {
            this.dX = e.pageX - this.dragX
            this.dY = e.pageY - this.dragY
            this.config.lat = this.clamp(this.dragLat + this.dY * 0.5, -90, 90)
            this.config.lng = this.clampLng(this.dragLng - this.dX * 0.5, -180, 180)
        }
    },
    onMouseUp(e) {
        if (this.isMouseDown) {
            this.isMouseDown = false;
        }
    },
    onMouseWheel(e){
        e = e || window.event; 
       //可以直接修改this.config.zoom的值
        if (e.wheelDelta) {  //第一步：先判断浏览器IE，谷歌滑轮事件               
            if (e.wheelDelta > 0) { //当滑轮向上滚动时  
                console.log('滚动向上')
            } else if (e.wheelDelta < 0) { //当滑轮向下滚动时  
                console.log('滚动向下')
            }  
        } 
    },
    //func里pageX传参问题，移动端
    touchPass(func) {
        return function(e) {
            e.preventDefault()
            func.call(this, {
                pageX: e.changedTouches[0].pageX,
                pageY: e.changedTouches[0].pageY,
            });
        }
    },
    clamp(x, min, max) {
        return x < min ? min : x > max ? max : x;
    },
    clampLng(lng) {
        return ((lng + 180) % 360) - 180;
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
</style>