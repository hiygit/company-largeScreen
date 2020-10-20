// 首页左侧内容
import HomeLeft from '@/components/Home/HomeLeft/index.vue'
// 首页中间内容
import HomeCenter from '@/components/Home/HomeCenter/index.vue'
// 首页右侧内容
import HomeRight from '@/components/Home/HomeRight/index.vue'

import qs from 'qs'
export default {
    name: 'home',
    components: {
        HomeLeft,
        HomeCenter,
        HomeRight
    },
    data() {
        return {
            markerList: []
        }
    },
    created() {
        document.title = "首页"
    },
    mounted() {
        let that = this
        let map = new AMap.Map('container', {
            resizeEnable: true, //是否监控地图容器尺寸变化
            zoom: 11, //初始化地图层级
            mapStyle: "amap://styles/whitesmoke",
            center: [112.517647, 37.830294] //初始化地图中心点 112.517647,37.830294
        });
        AMapUI.setDomLibrary($)

        // let markerList;
        AMapUI.loadUI(['misc/MarkerList', 'overlay/SimpleMarker', 'overlay/SimpleInfoWindow'],
            function (MarkerList, SimpleMarker, SimpleInfoWindow) {
                that.markerList = new MarkerList({
                    //关联的map对象
                    map: map,
                    getDataId: function (dataItem, index) {
                        //index表示该数据项在数组中的索引位置，从0开始，如果确实没有id，可以返回index代替
                        return index;
                    },
                    getPosition: function (dataItem) {
                        // console.log(dataItem)
                        return [dataItem.lon, dataItem.lat];//原来的
                        // return [dataItem.lat,dataItem.lon];//修改后
                    },
                    getMarker: function (dataItem, context, recycledMarker) {
                        //	var urlimg=mapimgurl(dataItem);
                        //存在可回收利用的marker
                        if (recycledMarker) {
                            //直接更新内容返回
                            //recycledMarker.setIconLabel(context.id);
                            //recycledMarker.setIconLabel(dataItem.showForm);
                            //recycledMarker.setIconStyle(urlimg);
                            //recycledMarker.setIcon();
                            return recycledMarker;
                        }

                        //返回一个新的Marker
                        return new SimpleMarker({
                            //containerClassNames: 'my-marker',
                            //iconStyle: urlimg,
                            //iconLabel: context.id
                            //iconLabel:dataItem.showForm

                        });
                    },
                    //返回数据项对应的infoWindow
                    getInfoWindow: function (dataItem, context, recycledInfoWindow) {
                        console.log(recycledInfoWindow);
                        // if (recycledInfoWindow) {
                        //     //存在可回收利用的infoWindow, 直接更新内容返回
                        //     var str = dataItem.pictureUp;
                        //     var strs = new Array(); //定义一数组
                        //     strs = str.split("|"); //字符分割
                        //     if (picurl.length > 0) {
                        //         var picurl = strs[0];
                        //         recycledInfoWindow.setInfoBody("企业名称：" + dataItem.name + "<br/>企业信用：" + dataItem.content + "<a href='that.globals.requesturl + 'web/index/findEnterpriseList?id=" + dataItem.id + "'></a>" + "<br/>");
                        //     }
                        //     else {
                        //         recycledInfoWindow.setInfoBody("企业名称：" + dataItem.name + "<br/>企业信用：" + dataItem.content + "<a href='that.globals.requesturl + 'web/index/findEnterpriseList?id=" + dataItem.id + "'></a>" + "<br/>");
                        //     }

                        //     // recycledInfoWindow.setInfoTitle(dataItem.zone + dataItem.num);

                        //     return recycledInfoWindow;
                        // }

                        //返回一个新的InfoWindow
                        console.log(dataItem)
                        if(dataItem.grade == "0"){
                            dataItem.grade = "D级"
                        }else if(dataItem.grade == "1"){
                            dataItem.grade = "C级"
                        }else if(dataItem.grade == "2"){
                            dataItem.grade = "B级"
                        }else if(dataItem.grade == "3"){
                            dataItem.grade = "A级"
                        }else if(dataItem.grade == "4"){
                            dataItem.grade = "AA级"
                        }else if(dataItem.grade == "5"){
                            dataItem.grade = "AAA级"
                        }
                        return new SimpleInfoWindow({
                            offset: new AMap.Pixel(0, -37),
                            // icon: './../../assets/marker.png', // 添加 Icon 图标 URL
                            // infoTitle: dataItem.zone + dataItem.num,//原来的
                            infoBody: "<br/>企业名称：" + dataItem.name + "<br/>企业信用：" + dataItem.grade + "<a href='that.globals.requesturl + 'web/index/findEnterpriseList?id=" + dataItem.id + "'></a>" + "<br/>"
                        });
                    }
                });
                that.$ajax({
                    method: "post",
                    url: that.globals.requesturl + 'web/index/findEnterpriseList',
                    data: "",
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: [function (data) {
                        return qs.stringify(data)
                    }]
                }).then(res => {
                    console.log(res.data)
                    if (res.data.errorCode == "-1") {
                        that.markerList.render(res.data.body.enterprises);
                    } else {
                        this.$message.error(res.data.msg);
                    }
                })
            });
    },
    methods: {
        // 退出
        goLink() {
            this.$router.push({ path: '/login' })
        }
    }

}