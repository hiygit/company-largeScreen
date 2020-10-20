<template>
  <div  class="radarecharts">
    <div id="radar" style="width: 100%; height: 154px;padding-top: 5px;" ref="radar"></div>
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts"
export default {
  props:['isDouble','nameList','arrList'],
  mounted(){
    this.drawLine();
  },
  methods:{
    drawLine(){
      var that = this;
      this.radar = this.$echarts.init(this.$refs.radar);
      this.radar.setOption({
        grid: {
          top: '0%',
          left: '3%',
          right: '4%',
          // bottom: '3%',
          bottom: '13%',
          containLabel: true
        },
        tooltip: {},
        // 隐藏图例 
        // legend: {
        //     data: ['能力值'],
        //     left: 0
        // },
        radar: {
          splitNumber: 4, // 雷达图圈数设置
            name: {
                textStyle: {
                  color: '#B5BEC0',
                  backgroundColor:'rgba(5,36,55,0.0)',
                  borderRadius: 3,
                  padding: [-10, -5]
                  // padding: [-5, 25]
                }
            },
            // 设置雷达图中间射线的颜色
            axisLine:{
              lineStyle:{
                color:"#637579"
              }
            },
            indicator: [
                {name: '基本信息', max: 100},
                {name: '信用评级', max: 130},
                {name: '法人信息', max: 105},
                {name: '经营状况信息', max: 108},
                {name: '资质信息', max: 180}
            ],
            splitArea : {
                show : true,   
                areaStyle : {
                  color: ["rgba(0,72,79,0)"]  // 图表背景网格的颜色
                }
            },
            splitLine : {
                show : true,
                lineStyle : {
                  width : 1,
                  color : ['#637579'] // 图表背景网格线的颜色
                }
            }
        },
        series: [{
            name: '',
            type: 'radar',
            symbol: "none",// 去掉图表中各个图区域的边框线拐点
            itemStyle:{
              normal:{
                color:"rgba(0,0,0,0)", // 图表中各个图区域的边框线拐点颜色
                lineStyle:{
                  color:"rgba(90,217,175,1)"// 图表中各个图区域的边框线颜色
                }
              }
            },
            areaStyle: {normal: {}},
            data: [
              {
                name: "", 
                value: [80, 90, 94, 85, 88],
                // value: [80, 90, 94, 85, 88],
                // 设置区域边框和区域的颜色
                itemStyle: {
                  normal: {
                    color: 'rgba(90,216,175,0.3)',
                    lineStyle: {
                      color: 'red',
                    },
                  },
                },
              }
            ]
        }]
      });
      // 设置自适应屏幕大小
      //window.onresize = myChart.resize;
      window.addEventListener("resize",function(){
        that.radar.resize();
      });
    },
        
  }
}
</script>

<style lang="scss">
.radarecharts{
  width: 100%;
  height: 119px;
  // height: 185px;
  padding-top: 10px;
  box-sizing: border-box;
  // background: #f0f0f0;
}
</style>
