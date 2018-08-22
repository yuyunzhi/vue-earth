<template>
  <div class="wrapper">
      <div class="container">
          <img class="logo" src="../assets/logo.jpg" alt="">
          <ul class="menu">
              <li class="language">
                    <div>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-theearth2diqiu"></use>
                        </svg>
                    </div>
                    <div @mouseover="showSubmenu('show-Language')" @mouseout="showSubmenu('hide-Language')">
                        <span>Language</span>
                        <ul class="submenu" v-show="showLanguage">
                            <li><a href="#">中文</a></li>
                            <li><a href="">English</a></li>
                            <li><a href="">Espanol</a></li>
                        </ul>
                    </div>
              </li>
              <li >
                    <div class="perpendicula"></div>
                    <div>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-erji"></use>
                        </svg>
                    </div>
                    <span>联系客服</span>
              </li>
              <li v-if="userInformaiton.isTouristStatus">
                    <div class="perpendicula"></div>
                    <div>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-person-fill"></use>
                        </svg>
                    </div>
                    <div>注册/登陆</div>
              </li>
              <li class="individual" v-else>
                    <div class="perpendicula"></div>
                    <div>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-person-fill"></use>
                        </svg>
                    </div>
                    <div @mouseover="showSubmenu('show-Individual')" @mouseout="showSubmenu('hide-Individual')">
                        <span>{{userInformaiton.userName}}</span>
                        <ul class="submenu" v-show="showIndividual">
                            <li>
                                <a href="#" v-if="userInformaiton.isPersonal">置业</a>
                                <a href="#" v-else>企业选址</a>
                            </li>
                            <li>
                                <a href="#" v-if="userInformaiton.isPersonal">定居</a>
                                <a href="#" v-else>项目发展</a>
                            </li>
                            <li><a href="#">收藏夹</a></li>
                            <li><a href="#">收件箱</a></li>
                            <li><a href="#">退出登录</a></li>
                        </ul>
                    </div>
              </li>
              
          </ul>
      </div>
  </div>
</template>

<script>
export default {
  props:[],
  data(){
    return {
        userInformaiton:{
            isTouristStatus:false,//true表示游客状态,false表示登陆状态
            userName:'Lambert', 
            isPersonal:true, // true代表个人用户登陆  false代表企业用户登陆
        },
        showLanguage:false,
        showIndividual:false
    }
  },
  created(){},
  mounted(){},
  methods:{
      showSubmenu(e){
          let arr = e.split('-')
          if(arr[1]==='Language'){arr[0]==='show'?this.showLanguage=true:this.showLanguage=false}
          if(arr[1]==='Individual'){arr[0]==='show'?this.showIndividual=true:this.showIndividual=false}
      }
  },

}
</script>
<style lang="scss" type="text/css" scoped>

$backgroundColor:rgb(255,152,0);
$wordColor:white;
$hoverColor:rgb(255,152,0);
$borderColor:rgb(187,187,187);
$xxx:1px solid red;

.wrapper{
    width:70%;
    height:50%;
    border:1px solid red;
    margin:0 auto;
    .container{
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        align-items: flex-start;
    }
    .logo{
        width:50px;
        height:50px;
        cursor: pointer;
    }
    .menu{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top:5px;
        li{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            cursor: pointer;
            div{
                margin-right:10px;
            }
            .perpendicula{
                height:1.5em;
                border-left:1px solid $borderColor;
                margin-left:10px;
                margin-right:10px;
            }
            span:hover{
                color:$hoverColor;
            }
            .submenu{
                position: absolute;
                border:1px solid $borderColor;    
                border-radius:3px;
                margin-left:-10px;
                margin-top:5px;

                li a{
                        padding:2px 8px;
                        display: block;
                        width:100%;
                    }
                    a:hover{
                        background:$backgroundColor;
                        color:white;                        
                    }
                

               
            }
        }

    }

}



</style>