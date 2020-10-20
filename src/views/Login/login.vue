<template>
  <div class="login">
    <p class="login-date">{{ nowDate + ' ' + nowTime}}</p>
    <div class="login-inner">
      <!-- 头部标题 -->
      <div class="login_header">
          <div class="public_floatleft login_header_img ">
              <img src="./../../assets/loginleft.png" alt="" class=""/>
          </div>
          
          <div class="public_floatleft login_header_text">{{projectName}}</div>
          <div class="public_floatleft login_header_img ">
              <img src="./../../assets/loginright.png" alt="" class=""/>
          </div>
      </div>
      <!-- 登录部分 -->
      <div class="login_center">
        <div class="login_center_text">
            <div >
                用户登录
            </div>
            <div class="login_center_text_admin">
                <img src="./../../assets/loginadmin.png" alt="" class="public_floatleft">
                <input  class="public_floatleft" type="text" placeholder="" maxlength="20" v-model="loginform.username">
            </div>
            <div class="login_center_text_admin">
                <img src="./../../assets/loginpassword.png" alt="" class="public_floatleft">
                <input  class="public_floatleft" type="password" placeholder="" maxlength="18" v-model="loginform.password">
            </div>
            <div class="login_center_text_btn">
                <input class="login_center_text_btn_btn" type="submit" value="登 录" @click="tohome()">
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      projectName:"万柏林企业信用平台",
      loginform:{
        username:"",
        password:""
      },
      nowDate: "",    // 当前日期
      nowTime: "",    // 当前时间
    }
  },
  created(){
    document.title="登录"
  },
  mounted(){
    this.currentTime();
  },
  methods: {
    // 获取当前时间
    currentTime() {
      setInterval(this.getDate, 500);
    },
    getDate: function() {
        var _this = this;
        let yy = new Date().getFullYear();
        let mm = new Date().getMonth() + 1;
        let dd = new Date().getDate();
        let hh = new Date().getHours();
        let mf = new Date().getMinutes() < 10? "0" + new Date().getMinutes(): new Date().getMinutes();
       
        _this.nowTime = hh + ":" + mf;
        _this.nowDate = yy + "年" + mm + "月" + dd + "日";
    },

    // 登录
    tohome(){
      if(this.loginform.username == ""){
        this.$message.error("请填写登录账号");
      }else if(this.loginform.password == ""){
        this.$message.error("请填写登录密码");
      }else{
        // 调接口
        this.$router.push({ path: '/newhome' })
      }
    }
  },
  // 销毁定时器
  beforeDestroy: function() {
    if (this.getDate) {
      console.log("销毁定时器")
      clearInterval(this.getDate); // 在Vue实例销毁前，清除时间定时器
    }
  }
  
}
</script>

<style lang="scss">
.login{
  width: 100vw;
  height: 100vh;
  padding: 115px 50px 36px;
  box-sizing: border-box;
  background: url(../../assets/bg.png) no-repeat;
  background-size: 100% 100%;
  .login-date{
    color: #DBDEE2;
    font-size: 10px;
    position: absolute;
    top: 30px;
    left: 3%;
  }
  .login-inner{
    width: 55%;
    height: 400px;
    margin: 0 auto;
    background: rgba(0,72,79,0.3);
    border-radius: 10px;
    // 头部标题
    .login_header{
        padding: 25px 60px;
        overflow: hidden;
        width: 100%;
        margin: 0 auto;
        .login_header_text{
            margin: 0 33px;
            width: 240px;
            height: 37px;
            color: rgba(255, 255, 255, 1);
            font-size: 24px;
            text-align: center;
            letter-spacing: 2px;
        }
        .login_header_img{
            width: 100px;
            height: 37px;
            line-height: 37px;
            img{
                width: 100%;
                height: 4px;
                display: inline-block;
                vertical-align: middle;
            }
        }
        
    }
    // 登录 部分
    .login_center{
        // 背景图
        background: url(./../../assets/loginbox.png) no-repeat;
        background-size: 405px 278px;
        height: 280px;
        width: 405px;
        margin: 0 auto 0;
        // 登录数据
        .login_center_text{
            text-align: left;
            width: 318px;
            height: 20px;
            color: rgba(255, 255, 255, 1);
            font-size: 14px;
            padding-left: 86px;
            padding-top: 53px;
            letter-spacing: 2px;
        }
        // 登录账号/密码
        .login_center_text_admin{
            overflow: hidden;
            margin-top: 19px;
            text-align: left;
            img{
                width: 30px;
                height: 27.5px;
                margin-top: 0.5px;
            }
            input{
                width: 186px;
                height: 27.5px;
                margin-top: 1px;
                background: #09858F;
                border: none;
                color: #fff;
                font-size: 14px;
                padding-left: 10px;
            }
        }
        // 登录按钮
        .login_center_text_btn{
            text-align: right;
            width: 226px;
            padding-top: 25px;
            .login_center_text_btn_btn{
                width: 88px;
                height: 30px;
                background:#09858F;
                border: none;
                left: 695px;
                color: rgba(255, 255, 255, 1);
                font-size: 14px;
                text-align: center;
                letter-spacing: 1px;
            }
        }
    }
  }


  .public_floatleft{
    float: left;
  }
}
</style>