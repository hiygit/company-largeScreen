<template>
  <div class="gendetecharts">
    <div id="gender" style="width: 100%; height: 100%;" ref="gender"></div>
    <!-- style="width: 598px; height: 350px;" -->
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";
import qs from "qs";
export default {
  // props:['isDouble','nameList','arrList'],
  data() {
    return {
      // gender: null,
      industryName: [],
      industryavg: [],
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      let that = this;
      this.gender = this.$echarts.init(this.$refs.gender);
      this.gender.setOption({
        // legend: {
        //   left: 0,
        //   itemGap : 11,
        //   itemHeight: 13,
        //   textStyle:{
        //     color: '#fff',
        //     lineHeight: 11
        //   },
        //   icon: 'circle',
        // },
        tooltip : {
          trigger: 'axis',
          formatter : '{b}<br> 等级：{c}',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '8%',
          left: '0%',
          right: '4%',
          bottom: '3%',
          // bottom: '13%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ["餐饮","汽车","零售","服务","铁矿"],
            axisLine: {
              lineStyle: {
                color: "#0093A4"
              }
            },
            axisTick: {
              show: false,
              alignWithLabel: true,
            },
            axisLabel:{
              textStyle:{
                color:"#fff"
              }
            }
          }
        ],
        yAxis: [{
          type: 'category',
          axisTick: {
            show: false
          },
          axisLine: {  //箭头样式
            show: false,
            lineStyle: {
              color: "#0093A4"
            }
          },
          data: ["D","C","B","A","AA","AAA"]
        }],
        series: [
          {
            name: '',
            type: 'bar',
            barWidth: '30', //柱图宽度
            itemStyle: {
              normal: {
                // barBorderRadius: 20,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#205DDB'
                  // color: 'rgba(92, 208, 214, 0.8)'
                }, {
                  offset: 1,
                  color: '#1BDFFC'
                  // color: 'rgba(11, 120, 131, 0.8)'
                }]),
                shadowColor: 'rgba(0, 0, 0, 0.4)',
                shadowBlur: 20
              }
            },
            data: ["C","B","A","AA","AAA"]
          }
        ],
        // dataZoom: [//给x轴设置滚动条
        //   {
        //     start:0,//默认为0
        //     end: 100-1500/31,//默认为100
        //     type: 'slider',
        //     show: true,
        //     xAxisIndex: [0],
        //     handleSize: 0,//滑动条的 左右2个滑动条的大小
        //     height: 10,//组件高度
        //     left: '6%', //左边的距离
        //     right: '4%',//右边的距离
        //     bottom: 0,//右边的距离
        //     borderColor: "rgba(5,36,55,0.0)",
        //     fillerColor: '#016F7B',
        //     borderRadius:85,
        //     backgroundColor: 'rgba(5,36,55,0.0)',//两边未选中的滑动条区域的颜色
        //     showDataShadow: false,//是否显示数据阴影 默认auto
        //     showDetail: false,//即拖拽时候是否显示详细数值信息 默认true
        //     realtime:true, //是否实时更新
        //     filterMode: 'filter',
        //   },
        //   //下面这个属性是里面拖到
        //   {
        //     type: 'inside',
        //     show: true,
        //     xAxisIndex: [0],
        //     start: 0,//默认为1
        //     end: 100-1500/31,//默认为100
        //     zoomLock:true,
        //   },
        // ],
      });
      // 设置自适应屏幕大小
      //window.onresize = myChart.resize;
      window.addEventListener("resize", function () {
        that.gender.resize();
      });

      // 查询各行业信用等级
      // let that = this
      this.$ajax({
        methods: "post",
        url: this.globals.requesturl + "web/index/industryCreditRating",
        data: "",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        transformRequest: [
          function (data) {
            return qs.stringify(data);
          },
        ],
      }).then((res) => {
        console.log(res.data);
        if (res.data.errorCode == "-1") {
          res.data.body.list.map(function (item) {
            that.industryName.push(item.name);
            console.log(that.industryName);
            if (item.avg == 1) {
              item.avg = "D";
            } else if (item.avg == 2) {
              item.avg = "C";
            } else if (item.avg == 3) {
              item.avg = "B";
              console.log(item.avg);
            } else if (item.avg == 4) {
              item.avg = "A";
              console.log(item.avg);
            } else if (item.avg == 5) {
              item.avg = "AA";
              console.log(item.avg);
            } else if (item.avg == 6) {
              item.avg = "AAA";
              console.log(item.avg);
            }
            that.industryavg.push(item.avg);
            console.log(that.industryavg);
          });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
};
</script>

<style lang="scss">
.gendetecharts {
  width: 100%;
  height: 195px;
  // height: 250px;
  padding: 20px 10px;
  box-sizing: border-box;
  // background: #f0f0f0;
}
</style>