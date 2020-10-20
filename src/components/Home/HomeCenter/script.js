import Map from '@/components/Home/Homeecharts/Map/index.vue'
export default{
  components: {
    Map
  },
  data (){
    return{
      contentList:[
        {contentText:"化客头街办共计873家企业，189家AAA级、457家AA级、200家B级、27家C级，企业平均信用得分AA级"},
        {contentText:"化客头街办共计873家企业，189家AAA级、457家AA级、200家B级、27家C级，企业平均信用得分AA级"},
        {contentText:"化客头街办共计873家企业，189家AAA级、457家AA级、200家B级、27家C级，企业平均信用得分AA级"},
        {contentText:"化客头街办共计873家企业，189家AAA级、457家AA级、200家B级、27家C级，企业平均信用得分AA级"},
      ]
      
    }
  },
  mounted(){
    // 百度地图API功能
    // let map = new BMap.Map("map");    // 创建Map实例
    // map.centerAndZoom(new BMap.Point(112.400172, 37.870575), 11);  // 初始化地图,设置中心点坐标和地图级别
    // //添加地图类型控件
    // map.addControl(new BMap.MapTypeControl({
    //   mapTypes:[
    //     BMAP_NORMAL_MAP,
    //     BMAP_HYBRID_MAP
    //   ]}));	  
    // map.setCurrentCity("万柏林区");          // 设置地图显示的城市 此项是必须设置的
    // map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
  }
}