<template>
  <div class="lineecharts">
    <div id="line" style="width: 100%; height: 100%;" ref="line"></div>
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";

export default {
  props:['isDouble','dateList','gradeList'],
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      var that = this;
      this.line = this.$echarts.init(this.$refs.line);
      this.line.setOption({
        tooltip: {
          trigger: "axis",
          formatter : '{b}<br> 等级：{c}',
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        // legend: {  //图例
        //     data: ['SA服务',]
        // },
        // toolbox: {   //下载图表按钮隐藏
        //   feature: {
        //     saveAsImage: {},
        //   },
        // },
        grid: {
          top: "5%",
          left: "3%",
          right: "5%",
          bottom: "0%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            axisLabel: {
              color: "#6E8086" //刻度线标签颜色
            },
            "axisTick":{       //x轴刻度线
              "show":false
            },
            boundaryGap: false,
            data: ["2020-01","2020-02","2020-03","2020-04","2020-05","2020-06","2020-07","2020-08","2020-09","2020-10","2020-11","2020-12",],
            // data: that.dateList
         },
        ],
        yAxis: [
          {
            type: "category",
            axisLabel: {
              color: "#6C7F82" //刻度线标签字体颜色
            },
            axisLine: { //箭头样式
              show: false,
              lineStyle: {
                color: "#0093A4"
              }
            },
            "axisTick":{       //y轴刻度线
              "show":false
            },
            data:["D","C","B","A","AA","AAA"]
          },
        ],
        series: [
          {
            name: "",
            type: "line",
            stack: "总量",
            areaStyle: { 
              normal: {
                color: "rgba(0,66,76,0.8)"//改变区域颜色
              } 
            },
            itemStyle:{
              normal: {
                color: "#07A0B0",//改变折线点的颜色
                lineStyle:{
                  color: "#07A0B0",//改变折线颜色
                }
              }
            },
            data: ["AAA", "C","A","B","C","AA","B","A","B","AAA","D","B"],
            // data: that.gradeList,
            showSymbol: false,//隐藏折线点
          },
        ],
      });
      // 设置自适应屏幕大小
      //window.onresize = myChart.resize;
      window.addEventListener("resize", function () {
        that.line.resize();
      });
    },
  },
};
</script>

<style lang="scss">
.lineecharts {
  width: 100%;
  height: 163px;
  // height: 193px;
  padding: 5px 10px;
  padding-top: 40px;
  box-sizing: border-box;
  // background: #f0f0f0;
}
</style>