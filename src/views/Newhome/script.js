import Shape from '@/components/Home/Homeecharts/Shape/index.vue'
import Gender from '@/components/Home/Homeecharts/Gender/index.vue'
import Radar from '@/components/Home/Homeecharts/Radar/index.vue'

import qs from 'qs'
export default {
  components: {
    Shape,
    Gender,
    Radar
  },
  data() {
    return{
      nowTime: "",    //当前时间
      nowDate: "",    //当前日期
      nowDays: "",    //当前星期几

      companyList: [ //企业信用排行
        // { number: "01", companyName: "山西省太原市创新器皿有限公司" },
        // { number: "01", companyName: "东华实况有限公司" },
        // { number: "01", companyName: "山西省太原市创新器皿有限公司" },
        // { number: "01", companyName: "山西省太原市创新器皿有限公司" },
        // { number: "01", companyName: "东华实况有限公司" }
      ],
      inquireInput:"", //平台查询 input值

      //信用占比图
      titlePreNoHollow: '餐饮行业',
      dataPreNoHollow: [
        {
          value: 12,
          name: 'A级'
        },
        {
          value: 8,
          name: 'B级'
        },
        {
          value: 10,
          name: 'C级'
        },
        {
          value: 10,
          name: 'D级'
        },
        {
          value: 45,
          name: 'AA级'
        },
        {
          value: 15,
          name: 'AAA级'
        }
      ],
      
      //查询各行业信用等级
      industryName: [],
      industryavg: [],

      // 选项卡
      page:0,
      tabContentList:[],
      tabContentList1:[],
      tabContentList2:[],
    }
  },
  created() {
    document.title = "首页"
  },
  mounted() {
    let that = this
    let map = new AMap.Map('container', {
      resizeEnable: true, //是否监控地图容器尺寸变化
      zoom: 11, //初始化地图层级
      // mapStyle: "amap://styles/whitesmoke",
      center: [112.517647, 37.830294] //初始化地图中心点 112.517647,37.830294
    });
    AMapUI.setDomLibrary($)

    // let markerList;
    AMapUI.loadUI(['misc/MarkerList', 'overlay/SimpleMarker', 'overlay/SimpleInfoWindow'],
    function (MarkerList, SimpleMarker, SimpleInfoWindow) {
      that.markerList = new MarkerList({
          //关联的map对象
          map: map,
          getDataId: function (dataItem, index) {
              //index表示该数据项在数组中的索引位置，从0开始，如果确实没有id，可以返回index代替
              return index;
          },
          getPosition: function (dataItem) {
              // console.log(dataItem)
              return [dataItem.lon, dataItem.lat];//原来的
              // return [dataItem.lat,dataItem.lon];//修改后
          },
          getMarker: function (dataItem, context, recycledMarker) {
              //	var urlimg=mapimgurl(dataItem);
              //存在可回收利用的marker
              if (recycledMarker) {
                  //直接更新内容返回
                  //recycledMarker.setIconLabel(context.id);
                  //recycledMarker.setIconLabel(dataItem.showForm);
                  //recycledMarker.setIconStyle(urlimg);
                  //recycledMarker.setIcon();
                  return recycledMarker;
              }

              //返回一个新的Marker
              return new SimpleMarker({
                  //containerClassNames: 'my-marker',
                  //iconStyle: urlimg,
                  //iconLabel: context.id
                  //iconLabel:dataItem.showForm

              });
          },
          //返回数据项对应的infoWindow
          getInfoWindow: function (dataItem, context, recycledInfoWindow) {
              // console.log(recycledInfoWindow);
              // if (recycledInfoWindow) {
              //     //存在可回收利用的infoWindow, 直接更新内容返回
              //     var str = dataItem.pictureUp;
              //     var strs = new Array(); //定义一数组
              //     strs = str.split("|"); //字符分割
              //     if (picurl.length > 0) {
              //         var picurl = strs[0];
              //         recycledInfoWindow.setInfoBody("企业名称：" + dataItem.name + "<br/>企业信用：" + dataItem.content + "<a href='that.globals.requesturl + 'web/index/findEnterpriseList?id=" + dataItem.id + "'></a>" + "<br/>");
              //     }
              //     else {
              //         recycledInfoWindow.setInfoBody("企业名称：" + dataItem.name + "<br/>企业信用：" + dataItem.content + "<a href='that.globals.requesturl + 'web/index/findEnterpriseList?id=" + dataItem.id + "'></a>" + "<br/>");
              //     }

              //     // recycledInfoWindow.setInfoTitle(dataItem.zone + dataItem.num);

              //     return recycledInfoWindow;
              // }

              //返回一个新的InfoWindow
              // console.log(dataItem)
              if(dataItem.grade == "0"){
                  dataItem.grade = "D级"
              }else if(dataItem.grade == "1"){
                  dataItem.grade = "C级"
              }else if(dataItem.grade == "2"){
                  dataItem.grade = "B级"
              }else if(dataItem.grade == "3"){
                  dataItem.grade = "A级"
              }else if(dataItem.grade == "4"){
                  dataItem.grade = "AA级"
              }else if(dataItem.grade == "5"){
                  dataItem.grade = "AAA级"
              }
              return new SimpleInfoWindow({
                  offset: new AMap.Pixel(0, -37),
                  // icon: './../../assets/marker.png', // 添加 Icon 图标 URL
                  // infoTitle: dataItem.zone + dataItem.num,//原来的
                  infoBody: "<br/>企业名称：" + dataItem.name + "<br/>企业信用：" + dataItem.grade + "<a href='that.globals.requesturl + 'web/index/findEnterpriseList?id=" + dataItem.id + "'></a>" + "<br/>"
              });
          }
      });
      that.$ajax({
        method: "post",
        url: that.globals.requesturl + 'web/index/findEnterpriseList',
        data: "",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: [function (data) {
          return qs.stringify(data)
        }]
      }).then(res => {
        // console.log(res.data)
        if (res.data.errorCode == "-1") {
            that.markerList.render(res.data.body.enterprises);
        } else {
            this.$message.error(res.data.msg);
        }
      })
    });
    this.corporateCreditRating() //查询企业信用排行
    this.init()
    this.currentTime();
  },
  methods: {
    // 获取当前时间
    currentTime() {
      setInterval(this.getDate, 1000);
    },
    getDate: function() {
        var _this = this;
        let yy = new Date().getFullYear();
        let mm = new Date().getMonth() + 1;
        let dd = new Date().getDate();
        let hh = new Date().getHours();
        let mf = new Date().getMinutes() < 10? "0" + new Date().getMinutes(): new Date().getMinutes();
        let ms = new Date().getSeconds() < 10? "0" + new Date().getSeconds(): new Date().getSeconds();
        let days = new Date().getDay();
        switch(days){
          case 1:
            days = '星期一';
            break;
          case 2:
            days = '星期二';
            break;
          case 3:
            days = '星期三';
            break;
          case 4:
            days = '星期四';
            break;
          case 5:
            days = '星期五';
            break;
          case 6:
            days = '星期六';
            break;
          case 0:
            days = '星期日';
            break;
        }
        let str = days
        _this.nowTime = hh + ":" + mf + ":" + ms;
        _this.nowDate = yy + "年" + mm + "月" + dd + "日";
        _this.nowDays = str
        return str
    },

    //检查手机号
    isCellPhone(val) {
      if (!/^1(3|4|5|6|7|8)\d{9}$/.test(val)) {
        return false;
      } else {
        return true;
      }
    },

      format(percentage) {
        return percentage = `${percentage}`;
      },

    // 查询企业信用排行
    corporateCreditRating() {
      let that = this
      this.$ajax({
        method: "post",
        url: this.globals.requesturl + 'web/index/corporateCreditRating',
        data: "",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: [function (data) {
          return qs.stringify(data)
        }]
      }).then(res => {
        // console.log(res.data)
        if (res.data.errorCode == "-1") {
          res.data.body.list.map(function(list){
            that.companyList.push(list)
            if(list.grade == 1){
              list.grade = "D"
            }else if(list.grade == 2){
              list.grade = "C"
            }else if(list.grade == 3){
              list.grade = "B"
            }else if(list.grade == 4){
              list.grade = "A"
            }else if(list.grade == 5){
              list.grade = "AA"
            }else if(list.grade == 6){
              list.grade = "AAA"
            }
          })
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
    // 点击企业信用排行列表跳转企业详情
    goCopany(item) {
      this.$router.push({path: '/companyInfo',query:{id:item.id}})
    },

    // 平台查询
    platformFindBtn(){
      this.$router.push({path:"/PlatformFindDatile"})
    },
    // 平台查询搜索按钮
    searchbtn(){
      if(this.inquireInput == ""){
        this.$message.warning("请输入关键字")
      }else{
        this.$router.push({path:'/SearchResult',query:{keyWord:this.inquireInput,type:1}})
      }
    },

    // 刚进页面获取通知公告
    init(){
      let that = this
      let obj = {
        type: "通知公告"
      }
      this.$ajax({
        method: "post",
        url: this.globals.requesturl + 'web/index/notice',
        data: obj,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: [function (data) {
          return qs.stringify(data)
        }]
      }).then(res => {
        // console.log(res.data)
        if (res.data.errorCode == "-1") {
          res.data.body.notices.map(function(list){
            that.tabContentList.push(list)
          })
          
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
    // 选项卡
    tabBtnClick(e){
      let that = this
      this.page=e.target.dataset.page;
      let obj = {
        type: e.target.innerText
      }
      this.$ajax({
        method: "post",
        url: this.globals.requesturl + 'web/index/notice',
        data: obj,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: [function (data) {
          return qs.stringify(data)
        }]
      }).then(res => {
        // console.log(res.data)
        if (res.data.errorCode == "-1") {
          that.tabContentList = []
          that.tabContentList1 = []
          that.tabContentList2 = []
          res.data.body.notices.map(function(list){
            that.tabContentList.push(list)    
            that.tabContentList1.push(list)    
            that.tabContentList2.push(list)   
          })
           
        } else {
          this.$message.error(res.data.msg);
        }
      })
    }

  }
}