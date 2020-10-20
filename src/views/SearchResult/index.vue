<template>
  <div class="searchResult" style="width:1920px;height: 1080px;padding: 0 23px 0px;overflow-x: hidden;"> 
    <!-- 顶部导航 -->
    <div class="mainheader">
      <div class="back" v-show="backBtn"><img @click="goback" src="../../assets/back.png" alt=""></div>
      <!-- <div class="mainheader_setup" @click="goLink">
        <img src="./../../assets/exit.png" alt />
        退出
      </div> -->
      <div class="mainheader_title" style="width: 508px;height: 53px;line-height: 53px;font-size: 25px;">万柏林企业信用平台</div>
    </div>
    <!-- <div class="mainheader">
      <div class="back" v-show="backBtn">
       <img @click="goback" src="../../assets/back.png" alt="">
      </div>
      <div class="mainheader_title">万柏林企业信用平台</div>
    </div> -->

    <div class="searchResult-bannerBox">
      <div class="searchResult-bannerHeader">
        共为你查询到<span>{{total}}</span>条含有“{{keyWord}}”的公司
      </div>
      <p class="pnodata" v-show="nodata"><img src="../../assets/nodata.png" alt=""></p>
      <ul id="box" v-show="ulList">
        <li v-for="(item,index) in searchList" :key="index" @click="goDetails(item)">
          <div class="searchList-left">
            <div class="searchList-left-imgBox">
              <img :src="item.image" alt="">
            </div>
            <div class="searchList-left-text">
              <h3 v-html="item.name">{{item.name}}</h3>
              <div class="searchList-left-textFlex">
                <div>法人代表：{{item.legalRepresentative}}</div>
                <div>注册资本：{{item.registeredAssets}}万人民币</div>
                <div>成立时间：{{(item.establishmentDate).substring(0,10)}}</div>
              </div>
              <p>经营范围：<span>{{item.businessScope}}</span></p>
            </div>
          </div>
          <span>{{item.address}}</span>
        </li>
      </ul>
      
    </div>

  </div>
</template>

<script>
import qs from 'qs'
export default {
  created(){
    document.title = "查询结果"
  },
  data(){
    return{
      backBtn: true, //顶部导航返回按钮  
      // 接受的id 和 关键字
      businessClassificationId:"",
      creditRatingId:"",
      keyWord:"",
      baseUrl:"",
      nodata: false,
      ulList:true,

      total: "",
      searchList:[]
    }
  },
  mounted(){
    this.baseUrl = this.globals.requesturl
    this.businessClassificationId = this.$route.query.businessClassificationId
    this.creditRatingId = this.$route.query.creditRatingId
    this.keyWord = this.$route.query.keyWord
    if(this.$route.query.type == "0"){
      this.preciseQuery()
    }else{
      this.fuzzyQuery()
    }
    
  },
  methods:{
    // 精准查询
    preciseQuery(){
      let that = this
      let obj ={
        businessClassificationId: this.businessClassificationId ? this.businessClassificationId : "",
        creditRatingId: this.creditRatingId ? this.creditRatingId : "",
        keyWord: this.keyWord ? this.keyWord : "",
      }
      // console.log(obj)
      this.$ajax({
        method: "post",
        url: this.globals.requesturl + 'web/enterprise/preciseQuery',
        data: obj,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: [function (data) {
          return qs.stringify(data)
        }]
      }).then(res => {
        // console.log(res.data)
        if (res.data.errorCode == "-1") {
          that.searchList = []
          if(res.data.body.enterprises.length != 0){
            that.total = res.data.body.enterprises.length
            res.data.body.enterprises.map(function(list){
              list.image = that.baseUrl + list.image
              that.searchList.push(list)
            })
            // 搜索关键字显示高亮
            let search = that.keyWord
            that.searchList = that.searchList.map(item => {
              // console.log(item)
                for (let key in item) {
                  if (key === 'name') {
                      let replaceReg = new RegExp(search, 'g')// 匹配关键字正则
                      let replaceString = '<span class="highlights-text">' + search + '</span>' // 高亮替换v-html值
                      item[key] = item[key].replace(replaceReg, replaceString) // 开始替换
                      // console.log(item[key])
                  }
                }
                return item
            })
          }else{
            that.total = 0
            that.nodata = true
            that.ulList = false
          }
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },

    // 模糊查询
    fuzzyQuery(){
      let that = this
      let obj ={
        businessClassificationId: this.businessClassificationId ? this.businessClassificationId : "",
        creditRatingId: this.creditRatingId ? this.creditRatingId : "",
        keyWord: this.keyWord ? this.keyWord : "",
      }
      // console.log(obj)
      this.$ajax({
        method: "post",
        url: this.globals.requesturl + 'web/enterprise/fuzzyQuery',
        data: obj,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: [function (data) {
          return qs.stringify(data)
        }]
      }).then(res => {
        // console.log(res.data)
        if (res.data.errorCode == "-1") {
          that.searchList = []
          if(res.data.body.enterprises.length != 0){
            that.total = res.data.body.enterprises.length
            res.data.body.enterprises.map(function(list){
              list.image = that.baseUrl + list.image
              that.searchList.push(list)
            })
            // 搜索关键字显示高亮
            let search = that.keyWord
              that.searchList = that.searchList.map(item => {
                  for (let key in item) {
                    if (key == 'name') {
                        let replaceReg = new RegExp(search, 'g')// 匹配关键字正则
                        let replaceString = '<span class="highlights-text">' + search + '</span>' // 高亮替换v-html值
                        item[key] = item[key].replace(replaceReg, replaceString) // 开始替换
                    }
                  }
                  return item
              })
          }else{
            that.total = 0
            that.nodata = true
            that.ulList = false
          }
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },

    // 跳转公司详情
    goDetails(item){
      let name = (item.name).split(">")[1].split("<")[0] + (item.name).split(">")[2]
      // console.log(name)
      this.$router.push({path:"/CompanyInfo",query:{id:item.id,content:item.content,name:name}})
    },

    // 返回上一页
    goback(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
.searchResult{
  // width: 100%;
  // height: 100%;
  // height: 100vh;
  // padding: 0 50px 36px;
  box-sizing: border-box;
  background: url(../../assets/bg.png) no-repeat;
  background-size: 100% 100%;
  // 顶部导航
  .mainheader{
    width: 100%;
    height: 40px;
    margin-bottom: 23px;
    z-index: 1000;
    position: relative;
    .back{
      width: 25px;
      height: 25px;
      position: absolute;
      top: 9px;
      left: 0px;
      cursor: pointer;
      img{
      width: 100%;
      height: 100%;
      }
    }
    // 个人设置
    .mainheader_setup{
      height: 25px;
      color: #ECECED;
      font-size: 16px;
      position: absolute;
      top: 9px;
      right: 0px;
      cursor: pointer;
      img{
        width: 16px;
        height: 16px;
        vertical-align: middle;
      }
    }
    // 标题
    .mainheader_title{
      width: 30%;
      height: 100%;
      color: #fff;
      font-size: 20px;
      text-align: center;
      line-height: 40px;
      letter-spacing: 2px;
      margin: 0 auto;
      background: url(../../assets/topFrame.png) no-repeat;
      background-size: 100% 100%;
    }
  }
  // 搜索列表
  .searchResult-bannerBox{
    width: 100%;
    .searchResult-bannerHeader{
      width: 100%;
      color: #FCFCFC;
      font-size: 12px;
      letter-spacing: 1px;
      padding: 8px 10px;
      box-sizing: border-box;
      border-left: 2px solid #05ACB6;
      background: linear-gradient(to right,rgba(1,57,63,0.5),rgba(0,110,121,0.8));
      span{
        color: #FF3A30;
      }
    }
    ul{
      width: 100%;
      height: 580px;
      // height: 480px;
      // height: 80vh;
      margin-top: 10px;
      overflow-y: auto;
      li{
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 15px;
        margin-bottom: 10px;
        box-sizing: border-box;
        background: rgba(0,72,79,0.45);
        border: 1px solid #023D4A;
        cursor: pointer;
        .searchList-left{
          width: 50%;
          display: flex;
          align-items: center;
          // justify-content: space-between;
          
          .searchList-left-imgBox{
            width: 13%;
            margin-right: 15px;
            img{
              width: 100%;
              border-radius: 15px;
            }
          }
          .searchList-left-text{
            width: 90%;
            color: #F0F2F2;
            font-size: 10px;
            h3{
              font-size: 12px;
              font-weight: 500;
              letter-spacing: 1px;
            }
            .searchList-left-textFlex{
              display: flex;
              justify-content: space-between;
              color: #FEFEFE;
              letter-spacing: 1px;
              padding: 12px 0;
              box-sizing: border-box;
            }
            p span{
              color: #CC342F;
              letter-spacing: 2px;
            }
          }
        }
        span{
          color: #F0F2F2;
          letter-spacing: 1px;
        }
        .highlights-text {
          color: #CC342F;
        }
      }
      li:last-child{
        margin-bottom: 0;
      }
    }
    .pnodata{
      padding: 50px 0;
      img{
        width: 30%;
        margin: 0 auto;
        display: block;
      }
    }
  }

  /* 设置滚动条的样式 */
  ::-webkit-scrollbar{
    width: 3px;
    height: 5px;
    background: rgba(0,72,79,0.45);
  }
  /* 滚动槽 */
  ::-webkit-scrollbar-track{
    border-radius: 10px;
  }
  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background: #0E848D;
  }
}
</style>