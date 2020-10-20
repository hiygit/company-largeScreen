<template>
  <div class="radarecharts">
    <div id="xyradar" style="width: 100%; height: 100%;box-sizing:border-box;" ref="xyradar"></div>
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts"
export default {
  props:['titlePre','dataPre','isHollow'],
  mounted(){
    this.drawLine();
  },
  watch:{
    
  },
  methods:{
   drawLine(){
      var that = this;
      this.xyradar = this.$echarts.init(this.$refs.xyradar);
      this.xyradar.setOption({
        title: {
          top: '15',
          left: 'left',
          textStyle: {
            color: '#8F9C9F',
            fontSize: 12,
            lineHeight:15
          }
        },
        grid: {
          top: '0%',
          left: '3%',
          right: '4%',
          bottom: '13%',
          containLabel: true
        },
        tooltip: {},
        // 隐藏图例 
        legend: {
          data: ['企业得分','行业平均分'],
          left: "0%",
          top: "bottom",
          orient: 'vertical',
          itemWidth: 18,// 图例标记的图形宽度。[ default: 25 ]
          itemHeight: 3,// 图例标记的图形高度。[ default: 14 ]
          itemGap: 15,// 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
          textStyle: { // 图例的公用文本样式。
            fontSize: 12,
            color: '#596467'
          },
        },
        radar: {
          splitNumber: 4, // 雷达图圈数设置
          center: ['62%', '55%'],// 圆中心坐标，数组的第一项是横坐标，第二项是纵坐标。[ default: ['50%', '50%'] ]
          radius: 50,// 圆的半径，数组的第一项是内半径，第二项是外半径。
            name: {
                textStyle: {
                  color: '#4E646B',
                  backgroundColor:'rgba(5,36,55,0.0)',
                  borderRadius: 3,
                  padding: [0, 0]
                }
            },
            nameGap: 10,// 指示器名称和指示器轴的距离。[ default: 15 ]
            // 设置雷达图中间射线的颜色
            axisLine:{
              lineStyle:{
                color:"#637579"
              }
            },
            indicator: [
                {name: '基本信息', max: 8000},
                {name: '信用评级', max: 8000},
                {name: '法人信息', max: 8000},
                {name: '经营状况信息', max: 8000},
                {name: '资质信息', max: 8000}
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
            name: '能力',
            type: 'radar',
            symbol: "none",// 去掉图表中各个图区域的边框线拐点
            // itemStyle:{
            //   normal:{
            //     color:"rgba(0,0,0,0)", // 图表中各个图区域的边框线拐点颜色
            //     lineStyle:{
            //       color:"rgba(90,217,175,1)"// 图表中各个图区域的边框线颜色
            //     }
            //   }
            // },
            areaStyle: {normal: {}},
            data: [
              {
                name: "企业得分", 
                value: [6000, 7000, 2000, 6500, 2500],
                // 设置区域边框和区域的颜色
                itemStyle: {
                  normal: {
                    color: '#5B8FF9', //legend里的图标颜色
                    lineStyle: {
                      color: 'red',
                    },
                  },
                },
                areaStyle: { // 单项区域填充样式
                  normal: {
                    color: 'rgba(0,0,0,0)' // 填充的颜色。[ default: "#000" ]
                  }
                },
                
              },
              {
                name: "行业平均分", 
                value: [4000, 2000, 2000, 6000, 3000],
                // 设置区域边框和区域的颜色
                itemStyle: {
                  normal: {
                    color: '#5AD8A6', //legend里的图标颜色
                    lineStyle: {
                      color: 'red',
                    },
                  },
                },
                areaStyle: { // 单项区域填充样式
                    normal: {
                      color: 'rgba(0,0,0,0)' // 填充的颜色。[ default: "#000" ]
                    }
                }
              },
            ]
        }]
      });
      // 设置自适应屏幕大小
      //window.onresize = myChart.resize;
      window.addEventListener("resize",function(){
        that.xyradar.resize();
      });
      
    },
  
  
  
  
  } 
}
</script>

<style lang="scss">
.radarecharts{
  width: 100%;
  height: 190px;
  text-align: center;
  margin: 0 auto;
  padding: 5px;
  box-sizing: border-box;
  // background: #f0f0f0;
}
</style>