import Shape from '@/components/Home/Homeecharts/Shape/index.vue'
import Gender from '@/components/Home/Homeecharts/Gender/index.vue'

import qs from 'qs'
export default {
  components: {
    Shape,
    Gender
  },
  data() {
    return {
      companyList: [ //企业信用排行
        // { number: "01", companyName: "山西省太原市创新器皿有限公司" },
        // { number: "01", companyName: "东华实况有限公司" },
        // { number: "01", companyName: "山西省太原市创新器皿有限公司" },
        // { number: "01", companyName: "山西省太原市创新器皿有限公司" },
        // { number: "01", companyName: "东华实况有限公司" }
      ],
      doubleNameList: ['党员', '非党员'],
      firstBlock: ['太原市民政局', '太原市残联', '太原市慈善职业技术培训中心'],
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
    }
  },
  mounted(){
    this.corporateCreditRating() //查询企业信用排行
    this.credit() //信用占比图
    this.industryCreditRating() //查询各行业信用等级
  },
  methods: {
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

    // 信用占比图
    credit(){
      let that = this
      this.$ajax({
        method: "post",
        url: this.globals.requesturl + 'web/index/credit',
        data: "",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: [function (data) {
          return qs.stringify(data)
        }]
      }).then(res => {
        // console.log(res.data)
        if (res.data.errorCode == "-1") {
          
          
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },

    // 查询各行业信用等级
    industryCreditRating(){
      let that = this
      this.$ajax({
        methods:"post",
        url: this.globals.requesturl + 'web/index/industryCreditRating',
        data: "",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: [function (data) {
          return qs.stringify(data)
        }]
      }).then(res => {
        // console.log(res.data)
        if (res.data.errorCode == "-1") {
          res.data.body.list.map(function(item){
            that.industryName.push(item.name)
            // console.log(that.industryName)
            if(item.avg == 1){
              item.avg = "D"
            }else if(item.avg == 2){
              item.avg = "C"
            }else if(item.avg == 3){
              item.avg = "B"
              // console.log(item.avg)
            }else if(item.avg == 4){
              item.avg = "A"
              // console.log(item.avg)
            }else if(item.avg == 5){
              item.avg = "AA"
              // console.log(item.avg)
            }else if(item.avg == 6){
              item.avg = "AAA"
              // console.log(item.avg)
            }
            that.industryavg.push(item.avg)
            // console.log(that.industryavg)
          })
          
        } else {
          this.$message.error(res.data.msg);
        }
      })
    }
  }
}