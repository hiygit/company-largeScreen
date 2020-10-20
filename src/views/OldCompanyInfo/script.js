import xyRadar from '@/components/Companyecharts/xyRadar/index.vue' //信用对比图谱
import Radar from '@/components/Home/Homeecharts/Radar/index.vue' //综合信用
import Linechart from '@/components/Companyecharts/Line/index.vue' //综合信用
import Force from '@/components/Companyecharts/Force/index.vue' //综合信用

import qs from 'qs'
export default{
  components: {
    xyRadar,
    Radar,
    Linechart,
    Force
  },
  created(){
    document.title = "企业信息"
  },
  data(){
    return{
      backBtn: true, //顶部导航返回按钮
      id: "",//企业id
      content:"",//企业介绍内容
      name:"",//企业介绍-企业名称
      nodata1: false,//暂时没有数据
      nodata2: false,//暂时没有数据
      nodata3: false,//暂时没有数据
      nodata4: false,//暂时没有数据
      nodata5: false,//暂时没有数据 - 行政许可

      // 企业基本信息
      companyBasicInfoList: {
        socialCode: "",
        businessRegistration:"",
        name:"",
        address:"",
        registrationStatus:"",
        establishmentDate:"",
        beginBusinessTerm:"",
        endBusinessTerm:"",
        legalRepresentative:"",
        registeredAssets: "",
        approvalDate:"",
        phone:"",
        businessScope:"",
        type:"",
      },
      // 司法及行政处罚信息
      penalizeInfoList: [],
      // 股东信息
      shareholderInfoList: [],
      // 监控与预警
      monitoringAndWarningList: [],
      // 行政许可
      xingzhengxuke:[],
      // 企业变更信息
      changeInfoList: [],

      //近六月信用变化
      dateArray: [],
      gradeArray:[]
      
    }
  },
  mounted(){
    this.id = this.$route.query.id
    this.content = this.$route.query.content
    this.name = this.$route.query.name
    this.shareholderList()
    this.administrativePenalty()
    this.enterpriseChangeRecord()
    this.findMonitoringEarlyWarning()
    this.findAdministrativePermissionList()
    this.enterpriseDetail()
    this.findCreditScore()
    this.getEnterprise()
  },
  methods:{
    // 获取企业信息
    getEnterprise(){
      let that = this
      let obj = {
        id: this.id
      }
      this.$ajax({
        method: "post",
        url: this.globals.requesturl + 'web/enterprise/getEnterprise',
        data: obj,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: [function (data) {
          return qs.stringify(data)
        }]
      }).then(res => {
        console.log(res.data)
        if (res.data.errorCode == "-1") {
          this.name = res.data.body.enterprise.name
          this.content = res.data.body.enterprise.content
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },

    // 近六月信用变化
    findCreditScore(){
      let that = this
      let obj = {
        id: this.id
      }
      this.$ajax({
        method: "post",
        url: this.globals.requesturl + 'web/enterprise/findCreditScore',
        data: obj,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: [function (data) {
          return qs.stringify(data)
        }]
      }).then(res => {
        console.log(res.data)
        if (res.data.errorCode == "-1") {
          res.data.body.creditScores.map(function(list){
            that.dateArray.push(list.date)
            that.gradeArray.push(list.grade)
          })
          console.log(that.dateArray)
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },


    // 企业基本信息
    enterpriseDetail(){
      let that = this
      let obj = {
        id: this.id
      }
      this.$ajax({
        method: "post",
        url: this.globals.requesturl + 'web/enterprise/detail',
        data: obj,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: [function (data) {
          return qs.stringify(data)
        }]
      }).then(res => {
        // console.log(res.data)
        if (res.data.errorCode == "-1") {
          that.companyBasicInfoList.socialCode = res.data.body.enterprise.socialCode
          that.companyBasicInfoList.businessRegistration = res.data.body.enterprise.businessRegistration
          that.companyBasicInfoList.name = res.data.body.enterprise.name
          that.companyBasicInfoList.address = res.data.body.enterprise.address
          that.companyBasicInfoList.registrationStatus = res.data.body.enterprise.registrationStatus
          that.companyBasicInfoList.establishmentDate = res.data.body.enterprise.establishmentDate
          that.companyBasicInfoList.beginBusinessTerm = res.data.body.enterprise.beginBusinessTerm
          that.companyBasicInfoList.endBusinessTerm = res.data.body.enterprise.endBusinessTerm
          that.companyBasicInfoList.legalRepresentative = res.data.body.enterprise.legalRepresentative
          that.companyBasicInfoList.registeredAssets = res.data.body.enterprise.registeredAssets
          that.companyBasicInfoList.approvalDate = res.data.body.enterprise.approvalDate
          that.companyBasicInfoList.phone = res.data.body.enterprise.phone
          that.companyBasicInfoList.businessScope = res.data.body.enterprise.businessScope
          that.companyBasicInfoList.type = res.data.body.enterprise.type
          
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },

    // 司法及行政处罚信息
    administrativePenalty(){
      let that = this
      let obj = {
        id: this.id
      }
      this.$ajax({
        method: "post",
        url: this.globals.requesturl + 'web/administrativePenalty/list',
        data: obj,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: [function (data) {
          return qs.stringify(data)
        }]
      }).then(res => {
        // console.log(res.data)
        if (res.data.errorCode == "-1") {
          if(res.data.body.administrativePenalties.length != 0){
            res.data.body.administrativePenalties.map(function(list){
              that.penalizeInfoList.push(list)
            })
          }else{
            that.nodata1 = true
          }
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },

    // 股东信息
    shareholderList(){
      let that = this
      let obj = {
        id: this.id
      }
      this.$ajax({
        method: "post",
        url: this.globals.requesturl + 'web/shareholder/list',
        data: obj,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: [function (data) {
          return qs.stringify(data)
        }]
      }).then(res => {
        // console.log(res.data)
        if (res.data.errorCode == "-1") {
          if(res.data.body.shareholders.length != 0){
            res.data.body.shareholders.map(function(list){
              that.shareholderInfoList.push(list)
            })
          }else{
            that.nodata2 = true
          }
          
          
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },

    // 监控与预警
    findMonitoringEarlyWarning(){
      let that = this
      let obj = {
        id: this.id
      }
      this.$ajax({
        method: "post",
        url: this.globals.requesturl + 'web/enterprise/findMonitoringEarlyWarning',
        data: obj,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: [function (data) {
          return qs.stringify(data)
        }]
      }).then(res => {
        // console.log(res.data)
        if (res.data.errorCode == "-1") {
          if(res.data.body.monitoringEarlyWarnings.length != 0){
            res.data.body.monitoringEarlyWarnings.map(function(list){
              that.monitoringAndWarningList.push(list)
            })
          }else{
            that.nodata3 = true
          }
          
          
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },

    // 行政许可
    findAdministrativePermissionList(){
      let that = this
      let obj = {
        id: this.id
      }
      this.$ajax({
        method: "post",
        url: this.globals.requesturl + 'web/index/findAdministrativePermissionList',
        data: obj,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: [function (data) {
          return qs.stringify(data)
        }]
      }).then(res => {
        console.log(res.data)
        if (res.data.errorCode == "-1") {
          if(res.data.body.administrativePermissions.length != 0){
            res.data.body.administrativePermissions.map(function(list){
              that.xingzhengxuke.push(list)
            })
          }else{
            that.nodata5 = true
          }
          
          
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },

    // 企业变更信息
    enterpriseChangeRecord(){
      let that = this
      let obj = {
        id: this.id
      }
      this.$ajax({
        method: "post",
        url: this.globals.requesturl + 'web/enterpriseChangeRecord/list',
        data: obj,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: [function (data) {
          return qs.stringify(data)
        }]
      }).then(res => {
        // console.log(res.data)
        if (res.data.errorCode == "-1") {
          if(res.data.body.enterpriseChangeRecords.length != 0){
            res.data.body.enterpriseChangeRecords.map(function(list){
              that.changeInfoList.push(list)
            })
          }else{
            that.nodata4 = true
          }
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },

    // 返回上一页
    goback(){
      this.$router.go(-1)
    },

    // 退出
    goLink(){
      this.$router.push({ path: '/login' })
    }
  }
}