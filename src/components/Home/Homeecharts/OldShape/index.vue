<template>
  <div class="pieEchart">
    <div id="shape" style="width: 100%; height: 100%;" ref="shape"></div>
  </div>
</template>

<script>
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
      this.shape = this.$echarts.init(this.$refs.shape); 
      this.shape.setOption({
        type:'pie',
        //分类是否显示
        // legend: {
        //   left: 0,
        //   itemGap : 11,
        //   itemHeight: 13,
        //   textStyle:{
        //     color: '#fff',
        //     lineHeight: 13
        //   },
        //   icon: 'circle',
        // },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{d}%"
        },
        // label:{
        //     normal:{
        //         show: true,
        //         position: 'inside',
        //         formatter: '{b},{d}%'
        //     }
        // },
        grid: {
          left: 50,
          top: 50,
          right: 20,
          bottom: 35,
          borderColor: '#E7EBEF',
        },
        // 颜色
        color: ['#037883', '#5CD0D6', '#67B1B0','#225B67','#4696A7','#44B0B8'],
        series: [
          {  
            name:'餐饮行业',  
            type:'pie',  
            radius : ['90%','8'],//饼图的半径大小  
            // radius : ['70%','8'],//饼图的半径大小  
            center: ['50%', '50%'],//饼图的位置 
            label:{            //饼图图形上的文本标签
              normal:{
                show:true,
                position:'inner', //标签的位置
                textStyle : {
                  fontWeight : 300 ,
                  fontSize : 14    //文字的字体大小
                },
                formatter:'{d}%'
              }
            },
            data:this.dataPre
          }  
        ]
      });
      // 设置自适应屏幕大小
      //window.onresize = myChart.resize;
      window.addEventListener("resize",function(){      
        that.shape.resize();
        console.log(this.shape)
      });
    }
  } 
}

</script>

<style lang="scss">
.pieEchart{
  width: 100%;
  height: 130px;
  // height: 190px;
  // padding-top: 25px;
  padding-top: 18px;
  box-sizing: border-box;
  // background: #f0f0f0;
}
</style>