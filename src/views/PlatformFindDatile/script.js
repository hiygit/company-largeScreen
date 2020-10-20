import qs from 'qs'
export default{
  created(){
    document.title = "平台查询"
  },
  data(){
    return{
      backBtn: true, //顶部导航返回按钮
      tabipt1:true,
      tabipt2:false,
      num:0,
      tabBtnList:["精确查询","模糊查询"],
      activeName: '1',
      
      foldList:[
      //   {
      //     title:"常用经营分类查询",
      //     classList:[
      //       {
      //         classTitle:"互联网科技：",
      //         classSpan:[
      //           {classSpan:"技术开发",isColor:false},{classSpan:"技术咨询",isColor:false},{classSpan:"技术转让",isColor:false},{classSpan:"电子产品的安装和销售",isColor:false},
      //           {classSpan:"计算机网络工程",isColor:false},{classSpan:"计算机软件开发及维护",isColor:false},{classSpan:"计算机辅助设备的安装及维修",isColor:false},
      //           {classSpan:"企业管理咨询(除经纪)",isColor:false},{classSpan:"技术服务",isColor:false},{classSpan:"计算机及相关产品(除计算机信息系统安全专用产品)",isColor:false},
      //         ]
      //       },{
      //         classTitle:"医疗器械：",
      //         classSpan:[
      //           {classSpan:"健康管理",isColor:false},{classSpan:"技术咨询",isColor:false},{classSpan:"技术转让",isColor:false},{classSpan:"电子产品的安装和销售",isColor:false},
      //           {classSpan:"计算机网络工程",isColor:false},{classSpan:"计算机软件开发及维护",isColor:false},{classSpan:"计算机辅助设备的安装及维修",isColor:false},
      //           {classSpan:"企业管理咨询(除经纪)",isColor:false},{classSpan:"技术服务",isColor:false},{classSpan:"计算机及相关产品(除计算机信息系统安全专用产品)",isColor:false},
      //         ]
      //       },
      //     ]
      //   },
      //   {
      //     title:"信用等级查询",
      //     classList:[
      //       {
      //         classTitle:"互联网科技：",
      //         classSpan:[
      //           {classSpan:"AAA级",isColor:false},{classSpan:"AA级",isColor:false},{classSpan:"A级",isColor:false},{classSpan:"B级",isColor:false},{classSpan:"C级",isColor:false},{classSpan:"D级"}
      //         ]
      //       }
      //     ]
      //   },
      ],
      gradeList:[],//等级 数组

      colorIndex: -1,
      inquireInput: ""
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    // 获取常用经营分类
    init(){
      let that = this
      this.$ajax({
        method: "post",
        url: this.globals.requesturl + 'web/enterprise/findBusinessCreditRating',
        data: "",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: [function (data) {
          return qs.stringify(data)
        }]
      }).then(res => {
        // console.log(res.data)
        if (res.data.errorCode == "-1") {
          res.data.body.list.map(function(list){
            that.foldList.push(list)
          })
          for(let i=0;i<res.data.body.list.length;i++){
            let listcreditRatings = res.data.body.list[i].creditRatings
            // console.log(res.data.body.list[i])
            for(let s=0;s<listcreditRatings.length;s++){
              if(listcreditRatings[s].grade == 1){
                listcreditRatings[s].grade = "D"
              }else if(listcreditRatings[s].grade == 2){
                listcreditRatings[s].grade = "C"
              }else if(listcreditRatings[s].grade == 3){
                listcreditRatings[s].grade = "B"
              }else if(listcreditRatings[s].grade == 4){
                listcreditRatings[s].grade = "A"
              }else if(listcreditRatings[s].grade == 5){
                listcreditRatings[s].grade = "AA"
              }else if(listcreditRatings[s].grade == 6){
                listcreditRatings[s].grade = "AAA"
              }
              that.gradeList.push(listcreditRatings[s])
            }

          }
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },


    //模糊查询
    getNum(index){
      this.num = index
      // console.log(this.num)
    },

    // 子类 选中以后变背景色
    changeColor(item,index){
      // console.log(item.id)
      // this.isactive1 = index
      this.$router.push({path:'/SearchResult',query:{businessClassificationId:item.id,type:this.num}})
    },
    // 信用等级 选中以后变背景色
    gradechangeColor(item,index){
      // this.isactive2 = index
      this.$router.push({path:'/SearchResult',query:{creditRatingId:item.id,type:this.num}})

    },

    // 确认查询
    sureBtn(){
      if(this.inquireInput == ""){
        this.$message.warning("请输入关键字")
      }else{
        this.$router.push({path:'/SearchResult',query:{keyWord:this.inquireInput,type:this.num}})
      }
    },
    // 返回上一页
    goback(){
      this.$router.go(-1)
    },

    // 退出
    // goLink(){
    //   this.$router.push({ path: '/login' })
    // }
  }
}