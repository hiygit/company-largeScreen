<template>
  <div class="companyInfo" style="width:1920px;height: 1080px;padding: 0 23px 0px;box-sizing: border-box;overflow-x: hidden;">
    <!-- 顶部导航 -->
    <div class="mainheader" style="width:100%;height:60px;margin-bottom: 60px;">
      <div class="back" v-show="backBtn"><img @click="goback" src="../../assets/back.png" alt=""></div>
      <div class="mainheader_setup" @click="goLink">
        <img src="./../../assets/exit.png" alt />
        退出
      </div>
      <div class="mainheader_title" style="width: 470px;height: 60px;line-height: 60px;font-size: 30px;">万柏林企业信用平台</div>
    </div>

    <!-- 模块 上 -->
    <div class="companyInfo_top" style="width: 100%;height: 905px;">
      <div class="companyInfo_top_left" style="width:710px;height:100%;border:none;">
        <div class="companyleft_top" style="height:216px;margin-bottom:15px;">
          <!-- 企业介绍 -->
          <div class="homeleft_creditrating" style="width:363px;">
            <div class="homeleft_titleBox">
              <div class="homeleft_subtitleFrame" style="width: 130px;height:36px;font-size:20px;line-height:36px;padding:0 30px 0 20px;box-sizing:border-box;">企业介绍</div>
            </div>
            <div class="companyTitleAndCentent">
              <h3 style="height:32px;line-height:32px;font-size:16px;padding:0 20px;">{{name}}</h3>
              <p style="text-indent:2em;font-size: 14px;height: 85px;padding:0 20px;">
                {{content}}
              </p>
            </div>
          </div>
          <!-- 信用对比图 -->
          <div class="homeleft_creditrating homeleft_proportion" style="width:324px;height:100%;background: rgba(0,72,79,0.45);border: 1px solid #074258;">
            <div class="homeleft_titleBox">
              <div class="homeleft_subtitleFrame xinyongduibibj" style="width: 150px;height:36px;font-size:20px;line-height:36px;padding:0 30px 0 20px;box-sizing:border-box;">信用对比图</div>
              <!-- <div class="homeleft_subtitleFrame " style="width: 171.56px;">信用对比图谱</div> -->
            </div>
            <xyRadar/>
          </div>
        </div>
        
        <!-- 企业基本信息 -->
        <div class="companyleft_bottom" style="width:710px;height:307px;margin-bottom:15px;">
          <div class="homeleft_bottom_title" style="height:40px;line-height:40px;font-size:16px;padding:0 22px;">企业基本信息</div>
          <div class="companyleft_bottom_contentBox" style="height: 252px;padding:0 0;font-size:14px;">
            <ul style="height: 252px;">
              <li>
                <div class="lidiv">
                  <div>统一社会信用代码</div>
                  <div class="colorcenter">{{companyBasicInfoList.socialCode}}</div>
                </div>
                <div class="lidiv">
                  <div>工商登记机关</div>
                  <div class="colorcenter">{{companyBasicInfoList.businessRegistration}}</div>
                </div>
              </li>
              <li>
                <div class="lidiv">
                  <div>企业名称</div>
                  <div class="colorcenter">{{companyBasicInfoList.name}}</div>
                </div>
                <div class="lidiv">
                  <div>地址</div>
                  <div class="colorcenter">{{companyBasicInfoList.address}}</div>
                </div>
              </li>
              <li>
                <div class="lidiv">
                  <div>登记状态</div>
                  <div class="colorcenter">{{companyBasicInfoList.registrationStatus}}</div>
                </div>
                <div class="lidiv">
                  <div>成立日期</div>
                  <div class="colorcenter">{{companyBasicInfoList.establishmentDate}}</div>
                </div>
              </li>
              <li>
                <div class="lidiv">
                  <div>法人代表名称</div>
                  <div class="colorcenter">{{companyBasicInfoList.legalRepresentative}}</div>
                </div>
                <div class="lidiv">
                  <div>核准日期</div>
                  <div class="colorcenter">{{companyBasicInfoList.approvalDate}}</div>
                </div>
              </li>
              <li>
                <div class="lidiv">
                  <div>类型</div>
                  <div class="colorcenter">{{companyBasicInfoList.type}}</div>
                </div>
                <div class="lidiv">
                  <div>经营期限自</div>
                  <div class="colorcenter">{{companyBasicInfoList.beginBusinessTerm}}</div>
                </div>
              </li>
              <li>
                <div class="lidiv">
                  <div>注册资本</div>
                  <div class="colorcenter" style="color: #C82A2C">{{companyBasicInfoList.registeredAssets}}（万）元</div>
                </div>
                <div class="lidiv">
                  <div>经营期限至</div>
                  <div class="colorcenter">{{companyBasicInfoList.endBusinessTerm}}</div>
                </div>
              </li>
              <li>
                <div class="lidiv">
                  <div>联系方式</div>
                  <div class="colorcenter">{{companyBasicInfoList.phone}}</div>
                </div>
                <div class="lidiv">
                  <div>经营范围</div>
                  <div class="colorcenter">{{companyBasicInfoList.businessScope}}</div>
                </div>
              </li>

              <!-- <li v-for="(item,index) in companyBasicInfoList" :key="index">
                <div>{{item.divFirst}}</div>
                <div class="colorcenter">{{item.divTwo}}</div>
                <div>{{item.divThree}}</div>
                <div class="colorcenter">{{item.divFour}}</div>
              </li> -->
            </ul>
          </div>
        </div>
        
        <!-- 企业变更信息 -->
        <div class="homeleft_bottom" style="height:324px;margin-bottom:17px;">
          <div class="homeleft_bottom_title" style="height:40px;line-height:40px;font-size:16px;padding:0 22px;">企业变更信息</div>
          <div class="companyleft_bottom_contentBox">
            <ul style="height: 200px;">
              <li>
                <div style="width: 25%">变更事项</div>
                <div class="colorcenter" style="width: 25%">变更前内容</div>
                <div style="width: 25%">变更后内容</div>
                <div style="width: 25%">变更时间</div>
              </li>
              <li v-for="(item,index) in changeInfoList" :key="index">
                <div style="width: 25%">{{item.changesAs}}</div>
                <div class="colorcenter" style="width: 25%">{{item.preChangeContent}}</div>
                <div style="width: 25%">{{item.modifiedContent}}</div>
                <div style="width: 25%">{{item.updateDate.substring(0,10)}}</div>
              </li>
              <li v-show="nodata4"><p class="nodata" style="text-align: center;width:100%;margin-top:20px;color: #B4BEC3;">暂时没有数据~</p></li>
            </ul>
          </div>
        </div>
        
      </div>
      
      <div class="companyInfo_top_left" style="width: 552px;border:none;background: none;">    <!-- width: 29%; -->
        <!-- 综合信用 行为标签 -->
        <div style="width:552px;height:215px;display:flex;justify-content: space-between;margin-bottom:15px;">
          <div class="companyleft_top" style="width:264px;height:215px;background: rgba(0,72,79,0.45);border: 1px solid #074258;">
            <!-- 综合信用 -->
            <div class="homeleft_creditrating" style="width: 100%;background:none;border:none;">
              <div class="homeleft_titleBox">
                <div class="homeleft_subtitleFrame" style="width: 130px;height:36px;font-size:20px;line-height:36px;padding:0 30px 0 20px;box-sizing:border-box;">综合信用</div>
                <div class="top5">AAA级</div>
              </div>
              <Radar/>
            </div>
          </div>

          <!-- 行为标签 -->
          <div class="companyleft_top" style="width:267px;height:215px;background: rgba(0,72,79,0.45);border: 1px solid #074258;">
            <div class="behavior" style="width:267px;height:215px;">
              <div class="homeleft_titleBox">
                <div class="homeleft_subtitleFrame" style="width: 130px;height:36px;font-size:20px;line-height:36px;padding:0 30px 0 20px;box-sizing:border-box;">行为标签</div>
              </div>
              <Force/>
          </div>
          </div>
        </div>

        <!-- 近6月信用变化 -->
        <div class="homeleft_top" style="width:552px;height:306px;margin-bottom:15px;">
          <div class="homeleft_creditrating">
            <div class="homeleft_titleBox">
              <div class="homeleft_subtitleFrame" style="width: 190px;height:36px;font-size:20px;line-height:36px;padding:0 30px 0 20px;box-sizing:border-box;">近6月信用变化</div>
            </div>
            <Linechart :dateList="dateArray" :gradeList="gradeArray" />
          </div>
        </div>
        
        
        <!-- 监控与预警 -->
        <div class="homeleft_bottom" style="background: rgba(0,72,79,0.45);height:324px;">
          <div class="homeleft_bottom_title" style="height:40px;line-height:40px;font-size:16px;padding:0 22px;">监控与预警</div>
          <div class="companyleft_bottom_contentBox">
            <ul style="height: 200px;">
              <li>
                <div style="width: 33.3%">xxxx项目</div>
                <div class="colorcenter" style="width: 33.3%">预警上限</div>
                <div style="width: 33.3%">预警下限</div>
              </li>
              <li v-for="(item,index) in monitoringAndWarningList" :key="index">
                <div style="width: 33.3%">{{item.projectName}}</div>
                <div class="colorcenter" style="width: 33.3%">{{item.warningLimit}}</div>
                <div style="width: 33.3%">{{item.warningThreshold}}</div>
              </li>
              <li v-show="nodata3"><p class="nodata" style="text-align: center;width:100%;margin-top:20px;color: #B4BEC3;">暂时没有数据~</p></li>
            </ul>
          </div>
        </div>

      </div>

      <div class="companyInfo_top_left" style="width:552px; border:none;background:none;">  
        <!-- 股东信息 -->
        <div class="homeleft_bottom" style="background: rgba(0,72,79,0.45);height:214px;margin-bottom:13px;">
          <div class="homeleft_bottom_title" style="height:40px;line-height:40px;font-size:16px;padding:0 22px;">股东信息</div>
          <div class="companyleft_bottom_contentBox" style="height:136px;">
            <ul>
              <li>
                <div style="width: 33.3%">股东名称</div>
                <div style="width: 33.3%" class="colorcenter">认缴出资额（万元）</div>
                <div style="width: 33.3%">实际出资额</div>
              </li>
              <li v-for="(item,index) in shareholderInfoList" :key="index">
                <div style="width: 33.3%">{{item.shareholderName}}</div>
                <div style="width: 33.3%" class="colorcenter">{{item.subscribedCapit}}</div>
                <div style="width: 33.3%">{{item.actualContribution}}</div>
              </li>
              <li v-show="nodata2"><p class="nodata" style="text-align: center;width:100%;margin-top:20px;color: #B4BEC3;">暂时没有数据~</p></li>
            </ul>
          </div>
        </div>

        <div style="width:552px;display:flex;justify-content: space-between;margin-bottom:15px;">
          <!-- 司法及行政处罚信息 -->
          <div class="homeleft_bottom" style="width:552px;height:306px;background: rgba(0,72,79,0.45);border: 1px solid #074258;">
            <div class="homeleft_bottom_title" style="width: 171.56px;height:28px;font-size:16px;line-height:28px;padding:0 20px;">司法及行政处罚信息</div>
            <div class="companyleft_bottom_contentBox" style="height:134px;">
              <ul style="height: 134px;">
                <li>
                  <div>处罚缘由</div>
                  <div class="colorcenter">下发处罚单位</div>
                  <div>处罚日期</div>
                </li>
                <li v-for="(item,index) in penalizeInfoList" :key="index">
                  <div>{{item.illegalActType}}</div>
                  <div class="colorcenter">{{item.punishmentOrgan}}</div>
                  <div>{{(item.decisionDate.substring(0,10))}}</div>
                </li>
                <li v-show="nodata1"><p class="nodata" style="text-align: center;width:100%;margin-top:20px;color: #B4BEC3;">暂时没有数据~</p></li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 行政许可 -->
        <div class="homeleft_bottom" style="background: rgba(0,72,79,0.45);height:324px;">
          <div class="homeleft_bottom_title" style="height:40px;line-height:40px;font-size:16px;padding:0 22px;">行政许可</div>
          <div class="companyleft_bottom_contentBox">
            <ul style="height: 200px;">
              <li>
                <div style="width: 27%">决定书文号</div>
                <div class="colorcenter" style="width: 27%">决定机关</div>
                <div style="width: 27%">许可决定日期</div>
                <div style="width: 18%">操作</div>
              </li>
              <li v-for="(item,index) in xingzhengxuke" :key="index">
                <div style="width: 27%">{{item.licenseFileNumber}}</div>
                <div class="colorcenter" style="width: 27%">{{item.licensingAuthority}}</div>
                <div style="width: 27%">{{item.beginValidity.substring(0,10)}}</div>
                <div style="width: 18%">操作</div>
              </li>
              <li v-show="nodata5"><p class="nodata" style="text-align: center;width:100%;margin-top:20px;color: #B4BEC3;">暂时没有数据~</p></li>
            </ul>
          </div>
        </div>

        

      </div>
    </div>

  </div>
</template>

<script src='./script.js'></script>

<style lang="scss" src='./style.scss'></style>