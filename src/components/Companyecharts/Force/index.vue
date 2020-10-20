<template>
  <div class="forceecharts">
    <div id="force" style="width:100%;height:100%;padding-top:5px;" ref="force"></div>
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts"
export default {
  data() {
    return {};
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      let _this = this;
      _this.force = _this.$echarts.init(this.$refs.force);
      _this.force.setOption({
        // title: { text: "人民的名义关系图谱" },
        tooltip: {
          formatter: '{b}：{c}',//设置label读取的值为value
        },
        series: [{
          type: 'graph',
          layout: 'force',
          
          label: {
            normal: {
              show: true,
              position: 'top',//设置label显示的位置
              // formatter: '{c}',//设置label读取的值为value
              textStyle: {
                color: "#C8CFD2",
                fontSize: '12'
              },
              
            }
          },
          // 图元颜色
          itemStyle:{
            color: "#077A74"
          },
          symbolSize: (value, params) => {
            // console.log(value);
            // console.log(params);
            return value;
          },
            draggable: true,
            data:[
              { category: 0, name: "",value: 10 },
              { name: "活跃度上升",value:30  },
              { name: "轻微预期风险",value:25  },
              { name: "低风险",value:20  },
              { name: "高度自由" ,value:15 },
              { name: "行为标签" ,value:15 },
            ],
            force: {
              edgeLength: 40,
              // edgeLength: 100,
              // repulsion: 120,
              repulsion: 170,
              gravity: 0.1
            },
            links:[
              { source: "", target: "活跃度上升" },
              { source: "", target: "轻微预期风险" },
              { source: "", target: "低风险" },
              { source: "", target: "高度自由" },
              { source: "", target: "行为标签" },
           ],
        }]
      });

      
    }
  }
};
</script>

<style lang="scss">
.forceecharts {
  width: 180px;
  height: 108px;
  padding: 0 10px;
  box-sizing: border-box;
  // background: rgba(1, 34, 44, 0.7);
}
</style>