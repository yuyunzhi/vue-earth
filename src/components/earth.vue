<template>
    <div>
    
        <div class="world" 
            @mousedown="onMouseDown" @dragstart="ondragstart" @mousemove="onMouseMove"
            @mouseup="onMouseUp" 
             >
            <div class="world-bg" v-show="showEarth">
                <div class="world-globe" >   
                    <div class="world-globe-doms-container" ></div>                                             
                </div> 
                <div class="world-globe-pole"></div> 
                <div class="world-globe-halo"> </div>              
            </div>
  
        </div>
    </div>
</template>

<script>

export default {
  //props:['whiteBackgroundCircle','lightCircle','radius'],
  data(){
    return {
        //地球参数
        config:{
            percent: 0,
            lat: 0,
            lng: 0,
            segX: 20,
            segY: 18,
            isHaloVisible: true,
            isPoleVisible: true,
            autoSpin: true,
            zoom: 0,
            skipPreloaderAnimation: false,
        },
        URLS:{
            //bg: 'http://wow.techbrood.com/uploads/160401/css_globe_bg.jpg',
            diffuse: 'http://wow.techbrood.com/uploads/160401/css_globe_diffuse.jpg',
            //halo: 'http://wow.techbrood.com/uploads/160401/css_globe_halo.png',
        },
        radius:436/2,
        lightCircle:740,
        whiteBackgroundCircle:436,

        transformStyleName:PerspectiveTransform.transformStyleName,
        isMouseDown:false,
        isTweening:false,
        tick:1,
        stats:null, 
        globeDoms:[],
        vertices:[],
        verticesRow:[],
        word:null,
        worldBg:null,
        globe:null,
        globeContainer:null,
        globePole:null,
        globeHalo:null,
        pixelExpandOffset:1.5,
        rX:0,
        rY:0,
        rZ:0,
        sinRX:null,
        sinRY:null,
        sinRZ:null,
        cosRX:null,
        cosRY:null,
        cosRZ:null,
        dragX:null,
        dragY:null,   
        dragLat:null,
        dragLng:null,
        dY:null,
        dX:null,
        //地球参数
        
        showEarth:true,
    }
  },
  mounted(){
      this.init()
  },
  methods:{
    makeEarthSize(){

        let whiteBackgroundCircle=document.querySelector('.world-globe-pole')//白色底
        whiteBackgroundCircle.style.width=this.whiteBackgroundCircle+'px'
        whiteBackgroundCircle.style.height=this.whiteBackgroundCircle+'px'
        this.radius=this.radius
    },

    init() {

        this.makeEarthSize()

        let del=document.querySelectorAll('.dg') || null
        if(del.length){
            for(var i=0;i<del.length;i++){
                del[i].remove()
            }
        }


        this.world = document.querySelector('.world')
        this.worldBg = document.querySelector('.world-bg')
        this.worldBg.style.backgroundImage = 'url(' + this.URLS.bg + ')'
        this.globe = document.querySelector('.world-globe')
        this.globeContainer = document.querySelector('.world-globe-doms-container')
        this.globePole = document.querySelector('.world-globe-pole')
        this.globeHalo = document.querySelector('.world-globe-halo')
        this.globeHalo.style.backgroundImage = 'url(' + this.URLS.halo + ')'

        this.regenerateGlobe();

        // var gui = new dat.GUI()
        // gui.add(this.config, 'lat', -90, 90).listen()
        // gui.add(this.config, 'lng', -180, 180).listen()
        // gui.add(this.config, 'isHaloVisible')
        // gui.add(this.config, 'isPoleVisible')
        // gui.add(this.config, 'autoSpin')
        // gui.add(this.config, 'zoom', 0,1).listen()

        this.stats = new Stats()
        // this.stats.domElement.style.position = 'absolute'
        // this.stats.domElement.style.left = '10px'
        // this.stats.domElement.style.top = '10px'
        this.stats.domElement.style.display="none"
        document.body.appendChild(this.stats.domElement)
        
        this.bindEventAboutPicture()

        // this.world.addEventListener('touchstart', this.touchPass(this.onMouseDown));
        // this.world.addEventListener('touchmove', this.touchPass(this.onMouseMove));
        // this.world.addEventListener('touchend', this.touchPass(this.onMouseUp));

        this.loop();
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
        var segWidth = 1600 / segX | 0;
        var segHeight = 800 / segY | 0;
        
        var phiStart = 0;
        var phiLength = Math.PI * 2;
        var thetaStart = 0;
        var thetaLength = Math.PI;

        for (y = 0; y <= segY; y++) {
            var verticesRow=[]
            for (x = 0; x <= segX; x++) {
                var u = x / segX;
                var v = 0.05 + y / segY * (1 - 0.1);
                var vertex = {
                    x: -this.radius * Math.cos(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength),
                    y: -this.radius * Math.cos(thetaStart + v * thetaLength),
                    z: this.radius * Math.sin(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength),
                    phi: phiStart + u * phiLength,
                    theta: thetaStart + v * thetaLength
                };
                verticesRow.push(vertex);
    
            }
            this.vertices.push(verticesRow);
        }

        for (y = 0; y < segY; ++y) {
            for (x = 0; x < segX; ++x) {
                dom = document.createElement('div')
                dom.id='picture-'+y+'-'+x
                dom.className="picture"
                domStyle = dom.style    
                domStyle.position = 'absolute'
                domStyle.width = segWidth + 'px'
                domStyle.height = segHeight + 'px'
                domStyle.overflow = 'hidden'
                domStyle[PerspectiveTransform.transformOriginStyleName] = '0 0'
                domStyle.backgroundImage = diffuseImgBackgroundStyle
                dom.perspectiveTransform = new PerspectiveTransform(dom, segWidth, segHeight)
                dom.topLeft = this.vertices[y][x]
                dom.topRight = this.vertices[y][x + 1]
                dom.bottomLeft = this.vertices[y + 1][x]
                dom.bottomRight = this.vertices[y + 1][x + 1]
                domStyle.backgroundPosition = (-segWidth * x) + 'px ' + (-segHeight * y) + 'px'
                this.globeContainer.appendChild(dom)
                this.globeDoms.push(dom)
            }
        }
    },
    bindEventAboutPicture(){
        let _this=this
        var picture = document.querySelectorAll('.picture')
        for(var i=0;i<picture.length;i++){
            picture[i].addEventListener('mouseover', function(e){
            var pictureId=e.target.id
            var string=pictureId.split('-')
            var x=string[1]
            var y=string[2]
            console.log('this',this)
            this.addEventListener('mousewheel',function(e){
                console.log('我是滚轮监听',x,y)
                if (e.wheelDelta) {  //第一步：先判断浏览器IE，谷歌滑轮事件               
                    if (e.wheelDelta > 0) { //当滑轮向上滚动时  
                        console.log('滚动向上')
                      
                    } else if (e.wheelDelta < 0) { //当滑轮向下滚动时  
                        console.log('滚动向下')
                        
                    }  
                }                             
            }.bind(_this))
        })
        }   
    },
    ondragstart(e){
        e.preventDefault();
        return false;
    },
    onMouseDown(e) {
        console.log('mousedown  target',e.target)
        this.isMouseDown = true
        this.dragX = e.pageX
        this.dragY = e.pageY
        this.dragLat = this.config.lat
        this.dragLng = this.config.lng
    },
    onMouseMove(e) {
        if (this.isMouseDown) {
            var dX = e.pageX - this.dragX
            var dY = e.pageY - this.dragY
            this.config.lat = this.clamp(this.dragLat + dY * 0.5, -90, 90)
            this.config.lng = this.clampLng(this.dragLng - dX * 0.5, -180, 180)
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
                this.showEarth=true
                
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
    },
    loop(){
        requestAnimationFrame(this.loop);
        this.stats.begin();
        this.render();
        this.stats.end();
    },
    render() {

        if (this.config.autoSpin && !this.isMouseDown && !this.isTweening) {
            this.config.lng = this.clampLng(this.config.lng - 0.2);
        }

        this.rX = this.config.lat / 180 * Math.PI;
        this.rY = (this.clampLng(this.config.lng) - 270) / 180 * Math.PI;

        this.globePole.style.display = this.config.isPoleVisible ? 'block' : 'none';
        this.globeHalo.style.display = this.config.isHaloVisible ? 'block' : 'none';

        var ratio = Math.pow(this.config.zoom, 1.5);
        this.pixelExpandOffset = 1.5 + (ratio) * -1.25;
        ratio = 1 + ratio * 3;
        this.globe.style[this.transformStyleName] = 'scale3d(' + ratio + ',' + ratio + ',1)';
        ratio = 1 + Math.pow(this.config.zoom, 3) * 0.3;
        this.worldBg.style[this.transformStyleName] = 'scale3d(' + ratio + ',' + ratio + ',1)';

        this.transformGlobe();
    },
    transformGlobe(){
        var dom, perspectiveTransform;
        var  v1, v2, v3, v4, vertex, verticesRow,  len;
        if (this.tick ^= 1) {
            this.sinRY = Math.sin(this.rY);
            this.sinRX = Math.sin(-this.rX);
            this.sinRZ = Math.sin(this.rZ);
            this.cosRY = Math.cos(this.rY);
            this.cosRX = Math.cos(-this.rX);
            this.cosRZ = Math.cos(this.rZ);

            var segX = this.config.segX;
            var segY = this.config.segY;

            for (var y = 0; y <= segY; y++) {
                verticesRow = this.vertices[y];
                for (var x = 0; x <= segX; x++) {
                    this.rotate(vertex = verticesRow[x], vertex.x, vertex.y, vertex.z); //这里是否要用过this
                }
            }

            for (var y = 0; y < segY; y++) {
                for (x = 0; x < segX; x++) {
                    dom = this.globeDoms[x + segX * y];

                    v1 = dom.topLeft;
                    v2 = dom.topRight;
                    v3 = dom.bottomLeft;
                    v4 = dom.bottomRight;

                    this.expand(v1, v2);
                    this.expand(v2, v3);
                    this.expand(v3, v4);
                    this.expand(v4, v1);

                    perspectiveTransform = dom.perspectiveTransform;
                    perspectiveTransform.topLeft.x = v1.tx;
                    perspectiveTransform.topLeft.y = v1.ty;
                    perspectiveTransform.topRight.x = v2.tx;
                    perspectiveTransform.topRight.y = v2.ty;
                    perspectiveTransform.bottomLeft.x = v3.tx;
                    perspectiveTransform.bottomLeft.y = v3.ty;
                    perspectiveTransform.bottomRight.x = v4.tx;
                    perspectiveTransform.bottomRight.y = v4.ty;
                    perspectiveTransform.hasError = perspectiveTransform.checkError();

                    if (!(perspectiveTransform.hasError = perspectiveTransform.checkError())) {
                        perspectiveTransform.calc();
                    }
                }
            }
        } else {
            for (var i = 0, len = this.globeDoms.length; i < len; i++) {
                perspectiveTransform = this.globeDoms[i].perspectiveTransform;
                if (!perspectiveTransform.hasError) {
                    perspectiveTransform.update();
                } else {
                    perspectiveTransform.style[this.transformStyleName] = 'translate3d(-8192px, 0, 0)';
                }
            }
        }
    },
    rotate(vertex, x, y, z) {
        var x0 = x * this.cosRY - z * this.sinRY;
        var z0 = z * this.cosRY + x * this.sinRY;
        var y0 = y * this.cosRX - z0 * this.sinRX;
        var z0 = z0 * this.cosRX + y * this.sinRX;

        var offset = 1 + (z0 / 4000);
        var x1 = x0 * this.cosRZ - y0 * this.sinRZ;
        var y0 = y0 * this.cosRZ + x0 * this.sinRZ;

        vertex.px = x1 * offset;
        vertex.py = y0 * offset;
    },
    expand(v1, v2) {

        var x = v2.px - v1.px,
            y = v2.py - v1.py,
            det = x * x + y * y,
            idet;

        if (det === 0) {
            v1.tx = v1.px;
            v1.ty = v1.py;
            v2.tx = v2.px;
            v2.ty = v2.py;
            return;
        }

        idet = this.pixelExpandOffset / Math.sqrt(det);

        x *= idet;
        y *= idet;

        v2.tx = v2.px + x;
        v2.ty = v2.py + y;
        v1.tx = v1.px - x;
        v1.ty = v1.py - y;

    }
  }

}
</script>

<style lang="scss" type="text/css" scoped>



input{
    height:30px;
    width:200px;
    position: absolute;
    z-index: 3;
}

//以下是二级地图的CSS



//以下是地球的CSS
.world {    //修改容器尺寸
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
    cursor: move;
    cursor: -moz-grab;
    cursor: -webkit-grab;
    cursor: grab;
    top:0%;
    left:0%;

}
.world-bg {  //继承world的尺寸，可不修改
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
    z-index: 1;
}
.world-globe-pole {   //修改白底圆圈尺寸，如果修改了宽高，同时要去修改地球的半径，地球的亮光图
    position: absolute;
    left: 50%;
    top: 50%;
    transform:translate(-50%,-50%);
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
.world-globe-halo { //修改地球的亮光图，如果修改了宽高，同时要去修改地球的半径，白底圆圈尺寸
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 740px;
    height: 705px;
    z-index: 2;
    pointer-events: none;
}

//以上是地球的CSS

</style>