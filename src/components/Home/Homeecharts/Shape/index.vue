<template>
  <div class="pieEchart">
    <div id="shape" style="width: 100%; height: 100%;" ref="shape"></div>
  </div>
</template>

<script>
export default {
  props: ["titlePre", "dataPre", "isHollow"],
  mounted() {
    this.drawLine();
  },
  watch: {},
  methods: {
    drawLine() {
      var that = this;
      this.shape = this.$echarts.init(this.$refs.shape);
      this.shape.setOption({
        color:['#44C1E0','#D3B939','#33C7A3','#49B5CE','#3391D4','#0F67D7','#3A42D0','#4754D2','#6A5EE3','#9d55c7'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
        },
        legend: {
          left: '75%',
          top: 'center',
          orient:'vertical',
          //图例文字样式
          textStyle: {
            color: "#fff",
            fontSize: 14,
          },
          data: ['其他', '金融', '互联网', '科技', '服务',"123"]
        },
        toolbox: {
          show: false,
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            magicType: {
              show: true,
              type: ['pie', 'funnel']
            },
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        series: [
          {
            name: '信用占比',
            type: 'pie',
            radius: [30, 80],
            center: ['40%', '50%'],
            roseType: 'area',
            data: [
              {value: 105, name: '金融'},
              {value: 98, name: '互联网'},
              {value: 40, name: '科技'},
              {value: 20, name: '服务'},
              {value: 80, name: '123'},
            ]
          }
        ]

        // type:'pie',
        // //分类是否显示
        // // legend: {
        // //   left: 0,
        // //   itemGap : 11,
        // //   itemHeight: 13,
        // //   textStyle:{
        // //     color: '#fff',
        // //     lineHeight: 13
        // //   },
        // //   icon: 'circle',
        // // },
        // tooltip : {
        //   trigger: 'item',
        //   formatter: "{a} <br/>{d}%"
        // },
        // // label:{
        // //     normal:{
        // //         show: true,
        // //         position: 'inside',
        // //         formatter: '{b},{d}%'
        // //     }
        // // },
        // grid: {
        //   left: 50,
        //   top: 50,
        //   right: 20,
        //   bottom: 35,
        //   borderColor: '#E7EBEF',
        // },
        // // 颜色
        // color: ['#037883', '#5CD0D6', '#67B1B0','#225B67','#4696A7','#44B0B8'],
        // series: [
        //   {
        //     name:'餐饮行业',
        //     type:'pie',
        //     radius : ['90%','8'],//饼图的半径大小
        //     // radius : ['70%','8'],//饼图的半径大小
        //     center: ['50%', '50%'],//饼图的位置
        //     label:{            //饼图图形上的文本标签
        //       normal:{
        //         show:true,
        //         position:'inner', //标签的位置
        //         textStyle : {
        //           fontWeight : 300 ,
        //           fontSize : 14    //文字的字体大小
        //         },
        //         formatter:'{d}%'
        //       }
        //     },
        //     data:this.dataPre
        //   }
        // ]
      });
      // 设置自适应屏幕大小
      //window.onresize = myChart.resize;
      window.addEventListener("resize", function () {
        that.shape.resize();
        console.log(this.shape);
      });
    },
  },
};
</script>

<style lang="scss">
.pieEchart {
  width: 100%;
  height: 170px;
  // height: 190px;
  padding-top: 18px;
  box-sizing: border-box;
  // background: #f0f0f0;
}
</style>