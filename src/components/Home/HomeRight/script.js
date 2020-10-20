import Radar from '@/components/Home/Homeecharts/Radar/index.vue'
import qs from 'qs'
export default{
  components: {
    Radar
  },
  data (){
    return{
      tabContentList:[],
      tabContentList1:[],
      tabContentList2:[],
      inquireInput:"",
    }
  },
  mounted(){
    this.init()
  },
  methods:{
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

    // 选项卡切换
    handleClick(tab, event) {
      // console.log(tab.label)
      let that = this
      let obj = {
        type: tab.label
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
    },

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
    }
  }
}