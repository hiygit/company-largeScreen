<template>
  <div class="NewHome" style="width:1920px;height:1080px;padding: 15px 26px 0 25px;overflow-x: hidden;">
    <!-- header -->
    <div class="NewHome-header" style="width: 1869px;height: 99px;">
      <div class="dateTimeDays" style="font-size: 18px;right: 83px;letter-spacing: 3px;"><span style="font-size: 39px;font-family: digitaldisplaytfb;">{{nowTime}} </span>{{nowDate + ' ' + nowDays}}</div>
    </div>
    <!-- content -->
    <div class="newHome-content" style="width:1869px;height:966px;padding:30px 0 44px;">
      <!-- 左侧 -->
      <div class="newHome-content-left" style="width:540px;height:100%;">
        <!-- 企业信用排行 -->
        <div class="newHome-content-left-top" style="width:100%;height:328px;margin-bottom:15px;">
          <div class="newHome-content-left-top-title" style="width:221px;height:45px;padding-left: 14px;">
            <img src="../../assets/xinyongpaihangTitle.png" alt="">
          </div>
          <div class="newHome-content-left-top-content" style="width:100%;height:269px;margin:15px 0;padding:30px;box-sizing: border-box;">
            <div v-for="(item,index) in companyList.slice(0,1)" :key="'q'+index" @click="goCopany(item)" class="newHome-content-left-top-content-list" style="margin-bottom:15px;">
              <div style="font-size:14px;width: 300px;">
                <img src="../../assets/one.png" style="width:40px;height:30px;margin-right:15px;" alt="">
                <p>{{item.name}}</p> 
              </div>
              <el-progress class="progressOne" :format="format" :text-inside="true" :stroke-width="15" :percentage="item.grade" style="width:150px;"></el-progress>
            </div>
            <div v-for="(item,index) in companyList.slice(1,2)" :key="'w'+index" @click="goCopany(item)" class="newHome-content-left-top-content-list" style="margin-bottom:15px;">
              <div style="font-size:14px;width: 300px;">
                <img src="../../assets/two.png" style="width:40px;height:30px;margin-right:15px;" alt="">
                <p>{{item.name}}</p> 
              </div>
              <el-progress class="progressTwo" :format="format" :text-inside="true" :stroke-width="15" :percentage="item.grade" style="width:150px;"></el-progress>
            </div>
            <div v-for="(item,index) in companyList.slice(2,3)" :key="'e'+index" @click="goCopany(item)" class="newHome-content-left-top-content-list" style="margin-bottom:15px;">
              <div style="font-size:14px;width: 300px;">
                <img src="../../assets/three.png" style="width:40px;height:30px;margin-right:15px;" alt="">
                <p>{{item.name}}</p> 
              </div>
              <el-progress class="progressThree" :format="format" :text-inside="true" :stroke-width="15" :percentage="item.grade" style="width:150px;"></el-progress>
            </div>
            <div v-for="(item,index) in companyList.slice(3,4)" :key="'r'+index" @click="goCopany(item)" class="newHome-content-left-top-content-list" style="margin-bottom:15px;">
              <div style="font-size:14px;width: 300px;">
                <img src="../../assets/four.png" style="width:40px;height:30px;margin-right:15px;" alt="">
                <p>{{item.name}}</p> 
              </div>
              <el-progress class="progressFour" :format="format" :text-inside="true" :stroke-width="15" :percentage="item.grade" style="width:150px;"></el-progress>
            </div>
            <div v-for="(item,index) in companyList.slice(4,5)" :key="'t'+index" @click="goCopany(item)" class="newHome-content-left-top-content-list" style="margin-bottom:15px;">
              <div style="font-size:14px;width: 300px;">
                <img src="../../assets/five.png" style="width:40px;height:30px;margin-right:15px;" alt="">
                <p>{{item.name}}</p> 
              </div>
              <el-progress class="progressFive" :format="format" :text-inside="true" :stroke-width="15" :percentage="item.grade" style="width:150px;"></el-progress>
            </div>
          </div>
        </div>

        <!-- 日常功能模块 -->
        <div class="newHome-content-left-top" style="width:100%;height:538px;">
          <div class="newHome-content-left-top-title" style="width:141px;height:45px;padding-left: 14px;">
            <img src="../../assets/daymodel.png" alt="">
          </div>
          <div class="newHome-content-left-top-daycontent" style="width:100%;height:489px;margin:15px 0;padding:15px;box-sizing: border-box;">
            <div class="newHome-content-left-top-searchbj" style="width:513px;height:100px;margin-bottom:15px;padding:15px;box-sizing: border-box;">
              <div @click="platformFindBtn" style="cursor: pointer;width:90px;margin-right:15px;">
                <img src="../../assets/find.png" style="width:40px;height:40px;" alt="">
                <p style="font-size: 16px;">平台查询</p>
              </div>
              <div class="search" style="width:398px;height:34px;margin-right: 15px;">
                <input v-model="inquireInput" type="text" placeholder="请输入搜索关键字" style="width:100%;height:100%;font-size: 18px;" >
                <img @click="searchbtn" style="width:22px;height:22px;" src="../../assets/newsearch.png" alt="">
              </div>
            </div>
            <!-- 选项卡 -->
            <div class="newHome-content-left-top-daycontent-tabBox" style="width:515px;height:334px;">
              <ol>
                <li @click="tabBtnClick($event)" data-page="0" :class="{'liActive':page==0}"   style="width:161px;height:40px;line-height: 40px;">通知公告</li>
                <li @click="tabBtnClick($event)" data-page="1" :class="{'liActive':page==1}" style="width:161px;height:40px;line-height: 40px;">行业动态</li>
                <li @click="tabBtnClick($event)" data-page="2" :class="{'liActive':page==2}" style="width:161px;height:40px;line-height: 40px;">法律法规</li>
              </ol>
              <ul>
                <li v-show="page==0" id="tabcontent1" style="width:515px;height:334px;">
                  <div style="width:100%;height:220px;">
                    <p v-for="(item,index) in tabContentList" :key="index" style="font-size:14px;">{{(item.createDate).substring(0,10)}} &nbsp; &nbsp; &nbsp;{{item.content}}</p>
                  </div>
                </li>
                <li v-show="page==1" id="tabcontent2" style="width:515px;height:334px;">
                  <div style="width:100%;height:220px;">
                    <p v-for="(item,index) in tabContentList1" :key="index" style="font-size:14px;">{{(item.createDate).substring(0,10)}} &nbsp; &nbsp; &nbsp;{{item.content}}</p>                   
                  </div>
                </li>
                <li v-show="page==2" id="tabcontent3" style="width:515px;height:334px;">
                  <div style="width:100%;height:220px;">
                    <p v-for="(item,index) in tabContentList2" :key="index" style="font-size:14px;">{{(item.createDate).substring(0,10)}} &nbsp; &nbsp; &nbsp;{{item.content}}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧 -->
      <div class="newHome-content-left" style="width:1261px;height:100%;">
        <div class="newHome-content-right-mapbox" style="width:100%;height:509px;margin-bottom:32px;padding:30px;box-sizing:border-box;">
          <div id="container" style="width:100%;height: 100%"></div>
        </div>
        <!-- 地图以下内容 -->
        <div class="newHome-content-right-mapBottom" style="width:100%;height:325px;"> 
          <div style="width:452px;height:100%;">
            <div class="newHome-content-left-top-title" style="width:221px;height:45px;">
              <img src="../../assets/genderTitle.png" alt="">
            </div>
            <div class="newHome-content-right-mapBottom-barGraphBj" style="width:452px;height:276px;margin-top:15px;margin-left:-6px;">
              <Gender :nameList="industryName" :arrList="industryavg"/>
            </div>
          </div>
          <div style="width:452px;height:100%;">
            <div class="newHome-content-left-top-title" style="width:213px;height:45px;">
              <img src="../../assets/xingyongdengjiTitle.png" alt="">
            </div>
            <div class="newHome-content-right-mapBottom-zongxinyongBj" style="width:401px;height:276px;margin-top:15px;">
              <Radar/>
            </div>
          </div>
          <div style="width:452px;height:100%;">
            <div class="newHome-content-left-top-title" style="width:120px;height:45px;">
              <img src="../../assets/zhanbiTitle.png" alt="">
            </div>
            <div class="newHome-content-right-mapBottom-zhanbibj" style="width:419px;height:276px;margin-top:15px;">
              <Shape :titlePre="titlePreNoHollow" :dataPre="dataPreNoHollow" :isHollow="true"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src='./script.js'></script>

<style lang="scss" scoped src='./style.scss'></style>
<style lang="scss">
.NewHome{
  // 企业信用排行榜 进度条样式
  .el-progress-bar__outer{
    border-radius: 0;
    background-color: rgba(255,255,255,0.03);
    // AC201F
  }
  .el-progress-bar__inner{
    position: absolute;
    top: 0;
    right: 0;
    left: unset;
    line-height: 0.5vw;
    
    border-radius: 0;
  }
  .el-progress-bar__innerText{
    font-size: 0.8vw;
  }
  .progressOne .el-progress-bar__inner{
    background-color:#C52727;
  }
  .progressTwo .el-progress-bar__inner{
    background-color:#E14B25;
  }
  .progressThree .el-progress-bar__inner{
    background-color:#E96B23;
  }
  .progressFour .el-progress-bar__inner{
    background-color:#E98B1F;
  }
  .progressFive .el-progress-bar__inner{
    background-color:#E9AD1B;
  }

  input::-webkit-input-placeholder {
   color: #00FAFF;
   opacity: 0.12;
  }

  // 地图点击标注样式
  .amap-ui-smp-ifwn-info-title{
    display: none;
  }

  /* 设置滚动条的样式 */
  ::-webkit-scrollbar{
    width: 3px;
    height: 5px;
    background: rgba(0,72,79,0.45);
  }
  /* 滚动槽 */
  ::-webkit-scrollbar-track{
    border-radius: 10px;
  }
  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background: #0E848D;
  }
}
</style>