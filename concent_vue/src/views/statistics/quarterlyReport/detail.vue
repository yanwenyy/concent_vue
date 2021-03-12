<template>
  <div style="position: relative">
    <div class="tabs-header-copy"></div>
    <el-button @click="back" class="detailbutton detail-back-tab" >返回</el-button>
    <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'" type="primary" @click="saveInfo('detailform','save')" class="detailbutton detail-back-tab save-btn">保存</el-button>
    <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'&&(p.actpoint == 'add'||detailform.topInfoOrg.flowStatus==1||detailform.topInfoOrg.flowStatus==4)" @click="saveInfo('detailform','sub')" class="detailbutton detail-back-tab sub-btn">提交</el-button>
    <el-button v-show="p.actpoint == 'task'&&p.task.edit==false" class="detailbutton detail-back-tab bh" @click="operation('back')"  type="warning">驳回</el-button>
    <el-button v-show="p.actpoint == 'task'&&p.task.edit==false" class="detailbutton detail-back-tab tg" @click="operation('complete')"  type="success">通过</el-button>
    <!--<el-button v-show="p.actpoint == 'task'&&p.task.edit==true" @click="operation('recall')" class="detailbutton" type="danger">撤销</el-button>-->
    <el-tabs type="border-card" >
      <el-tab-pane label="季报生产经营JB1表">
        <div class="detailBox">
          <el-form
            :inline="false"
            :model="detailform"
            :rules="rules"
            class="gcform"
            ref="detailform"
          >
            <p  class="detail-title" style="overflow: hidden;margin-right:30px">
              <span>一 、建筑业合同情况</span>
            </p>
            <el-form-item
              label="签订的合同额(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_01_001"/>
            </el-form-item>
            <el-form-item
              label="上年结转合同额(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_01_002"/>
            </el-form-item>
            <el-form-item
              label="本年新签合同额(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_01_003"/>
            </el-form-item>
            <p  class="detail-title" style="overflow: hidden;margin-right:30px">
              <span>二、承包工程完成情况 </span>
            </p>
            <el-form-item
              label="直接从建设单位承揽工程完成的产值小计(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_02_001"/>
            </el-form-item>
            <el-form-item
              label="自行完成施工产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_02_002"/>
            </el-form-item>
            <el-form-item
              label="分包出去工程的产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_02_003"/>
            </el-form-item>
            <el-form-item
              label="从建设单位以外承揽工程完成的产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_02_004"/>
            </el-form-item>
            <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                <span>三、施工产值(万元): <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.businessDetailMap.JB1_03_000"/> </span>
            </p>
            <el-form-item
              label="其中:装饰装修产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_001"/>
            </el-form-item>
            <el-form-item
              label="其中:在外省完成的产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_002"/>
            </el-form-item>
            <el-form-item
              label="建筑工程产值(万元)"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_003"/>
            </el-form-item>
            <el-form-item
              label="安装工程产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_004"/>
            </el-form-item>
            <el-form-item
              label="设备工器具产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_005"/>
            </el-form-item>
            <el-form-item
              label="其他产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_006"/>
            </el-form-item>
            <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                <span>1、 按类别分</span>
            </p>
            <el-form-item
              label="铁路(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_01_001"/>
            </el-form-item>
            <el-form-item
              label="公路(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_01_002"/>
            </el-form-item>
            <el-form-item
              label="房建(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_01_003"/>
            </el-form-item>
            <el-form-item
              label="市政(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_01_004"/>
            </el-form-item>
            <el-form-item
              label="城轨(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_01_005"/>
            </el-form-item>
           <!-- <el-form-item
              label="铁路四电(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap."/>
            </el-form-item>-->
            <el-form-item
              label="水利(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_01_006"/>
            </el-form-item>
            <el-form-item
              label="电力(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_01_007"/>
            </el-form-item>
            <el-form-item
              label="机场(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_01_008"/>
            </el-form-item>
            <el-form-item
              label="矿山(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_01_009"/>
            </el-form-item>
            <el-form-item
              label="港口与航道(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_01_010"/>
            </el-form-item>
            <el-form-item
              label="其他(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_01_011"/>
            </el-form-item>
            <p  class="detail-title" style="overflow: hidden;margin-right:30px">
              <span>2、按地域分</span>
            </p>
            <el-form-item
              label="北京市(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_02_001"/>
            </el-form-item>
            <el-form-item
              label="天津市(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_02_002"/>
            </el-form-item>
            <el-form-item
              label="河北省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_02_003"/>
            </el-form-item>
            <el-form-item
              label="山西省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_02_004"/>
            </el-form-item>
            <el-form-item
              label="内蒙古自治区(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_02_005"/>
            </el-form-item>
            <el-form-item
              label="辽宁省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_02_006"/>
            </el-form-item>
            <el-form-item
              label="吉林省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_02_007"/>
            </el-form-item>
            <el-form-item
              label="黑龙江省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_02_008"/>
            </el-form-item>
            <el-form-item
              label="上海市(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_02_009"/>
            </el-form-item>
            <el-form-item
              label="江苏省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_02_010"/>
            </el-form-item>
            <el-form-item
              label="浙江省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_02_011"/>
            </el-form-item>
            <el-form-item
              label="安徽省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_02_012"/>
            </el-form-item>
            <el-form-item
              label="福建省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_02_013"/>
            </el-form-item>
            <el-form-item
              label="江西省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_02_014"/>
            </el-form-item>
            <el-form-item
              label="山东省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_02_015"/>
            </el-form-item>
            <el-form-item
              label="河南省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_02_016"/>
            </el-form-item>
            <el-form-item
              label="湖北省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_02_017"/>
            </el-form-item>
            <el-form-item
              label="湖南省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_02_018"/>
            </el-form-item>
            <el-form-item
              label="广东省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_02_019"/>
            </el-form-item>
            <el-form-item
              label="广西壮族自治区(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_02_020"/>
            </el-form-item>
            <el-form-item
              label="海南省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_02_021"/>
            </el-form-item>
            <el-form-item
              label="重庆市(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_02_022"/>
            </el-form-item>
            <el-form-item
              label="四川省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_02_023"/>
            </el-form-item>
            <el-form-item
              label="贵州省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_02_024"/>
            </el-form-item>
            <el-form-item
              label="云南省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_02_025"/>
            </el-form-item>
            <el-form-item
              label="西藏自治区(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_02_026"/>
            </el-form-item>
            <el-form-item
              label="陕西省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_02_027"/>
            </el-form-item>
            <el-form-item
              label="甘肃省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_02_028"/>
            </el-form-item>
            <el-form-item
              label="青海省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_02_029"/>
            </el-form-item>
            <el-form-item
              label="宁夏(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_02_030"/>
            </el-form-item>
            <el-form-item
              label="新疆(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_02_031"/>
            </el-form-item>
            <el-form-item
              label="澳门(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_02_032"/>
            </el-form-item>
            <el-form-item
              label="台湾省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_02_033"/>
            </el-form-item>
            <el-form-item
              label="香港(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_02_034"/>
            </el-form-item>
            <el-form-item
              label="海外(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_03_02_035"/>
            </el-form-item>
            <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                <span>四、竣工产值(万元): <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.businessDetailMap.JB1_04_000"/> </span>
            </p>
            <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                <span>五、房屋施工面积(平方米):<el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.businessDetailMap.JB1_05_000"/> </span>
            </p>
            <el-form-item
              label="其中:本年新开工面积(平方米):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_05_001"/>
            </el-form-item>
            <el-form-item
              label="其中:实行投标承包面积(平方米):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_05_002"/>
            </el-form-item>
            <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                <span>六、主要建筑材料消耗量 </span>
            </p>
            <div class="row-three">
              <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                <span>(一)实物量 </span>
              </p>
              <el-form-item
                label="钢材*(吨):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.businessDetailMap.JB1_06_01_001"/>
              </el-form-item>
              <el-form-item
                label="木材*(立方米):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.businessDetailMap.JB1_06_01_002"/>
              </el-form-item>
              <el-form-item
                label="平板玻璃*(平方米):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.businessDetailMap.JB1_06_01_003"/>
              </el-form-item>
              <el-form-item
                label="平板玻璃*(平方米):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.businessDetailMap.JB1_06_01_004"/>
              </el-form-item>
              <el-form-item
                label="平板玻璃*(重量箱):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.businessDetailMap.JB1_06_01_005"/>
              </el-form-item>
              <el-form-item
                label="铝材*(吨):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.businessDetailMap.JB1_06_01_006"/>
              </el-form-item>
            </div>
            <div class="row-three">
            <p  class="detail-title" style="overflow: hidden;margin-right:30px">
              <span>(二)价值量 </span>
            </p>
            <el-form-item
              label="钢材*(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_06_02_001"/>
            </el-form-item>
            <el-form-item
              label="木材*(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_06_02_002"/>
            </el-form-item>
            <el-form-item
              label="水泥*(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_06_02_003"/>
            </el-form-item>
            <el-form-item
              label="平板玻璃*(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_06_02_004"/>
            </el-form-item>
            <el-form-item
              label="铝材*(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessDetailMap.JB1_06_02_005"/>
            </el-form-item>
          </div>
            <br>
            <div class="row-three">
              <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                <span>七、从事建筑业活动的从业人员 </span>
              </p>
              <el-form-item
                label="平均人数(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.businessDetailMap.JB1_07_001"/>
              </el-form-item>
              <el-form-item
                label="期末人数(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.businessDetailMap.JB1_07_002"/>
              </el-form-item>
              <el-form-item
                label="其中:工程技术人员(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.businessDetailMap.JB1_07_003"/>
              </el-form-item>
              <el-form-item
                label="其中:一级建造师(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.businessDetailMap.JB1_07_004"/>
              </el-form-item>
              <el-form-item
                label="其中:现场施工人员*(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.businessDetailMap.JB1_07_005"/>
              </el-form-item>
              <el-form-item
                label="其中:持证上岗人员*(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.businessDetailMap.JB1_07_006"/>
              </el-form-item>
            </div>
            <div class="row-three">
              <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                <span>八、年末自有机械设备情况</span>
              </p>
              <el-form-item
                label="总台数*(台):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.businessDetailMap.JB1_08_001"/>
              </el-form-item>
              <el-form-item
                label="其中:施工机械设备总台数(台):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.businessDetailMap.JB1_08_002"/>
              </el-form-item>
              <el-form-item
                label="总功率*(千瓦):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.businessDetailMap.JB1_08_003"/>
              </el-form-item>
              <el-form-item
                label="其中:施工机械设备总功率(千瓦):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.businessDetailMap.JB1_08_004"/>
              </el-form-item>
              <el-form-item
                label="净值*(万元):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.businessDetailMap.JB1_08_005"/>
              </el-form-item>
              <el-form-item
                label="其中:施工机械设备净值(万元):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.businessDetailMap.JB1_08_006"/>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="季报生产经营JB1表(境内)">
        <div class="detailBox">
          <el-form
            :inline="false"
            :model="detailform"
            :rules="rules"
            class="gcform"
            ref="detailform"
          >
            <p  class="detail-title" style="overflow: hidden;margin-right:30px">
              <span>一 、建筑业合同情况</span>
            </p>
            <el-form-item
              label="签订的合同额(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessJnDetailMap.JB1_01_001"/>
            </el-form-item>
            <el-form-item
              label="上年结转合同额(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessJnDetailMap.JB1_01_002"/>
            </el-form-item>
            <el-form-item
              label="本年新签合同额(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessJnDetailMap.JB1_01_003"/>
            </el-form-item>
            <p  class="detail-title" style="overflow: hidden;margin-right:30px">
              <span>二、承包工程完成情况 </span>
            </p>
            <el-form-item
              label="直接从建设单位承揽工程完成的产值小计(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessJnDetailMap.JB1_02_001"/>
            </el-form-item>
            <el-form-item
              label="自行完成施工产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessJnDetailMap.JB1_02_002"/>
            </el-form-item>
            <el-form-item
              label="分包出去工程的产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessJnDetailMap.JB1_02_003"/>
            </el-form-item>
            <el-form-item
              label="从建设单位以外承揽工程完成的产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessJnDetailMap.JB1_02_004"/>
            </el-form-item>
            <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                <span>三、施工产值(万元): <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.businessJnDetailMap.JB1_03_000"/> </span>
            </p>
            <el-form-item
              label="其中:装饰装修产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessJnDetailMap.JB1_03_001"/>
            </el-form-item>
            <el-form-item
              label="其中:在外省完成的产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessJnDetailMap.JB1_03_002"/>
            </el-form-item>
            <el-form-item
              label="建筑工程产值(万元)"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessJnDetailMap.JB1_03_003"/>
            </el-form-item>
            <el-form-item
              label="安装工程产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessJnDetailMap.JB1_03_004"/>
            </el-form-item>
            <el-form-item
              label="设备工器具产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessJnDetailMap.JB1_03_005"/>
            </el-form-item>
            <el-form-item
              label="其他产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.businessJnDetailMap.JB1_03_006"/>
            </el-form-item>

          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="季报房建完成JB2表">
        <div class="detailBox">
          <el-form
            :inline="false"
            :model="detailform"
            :rules="rules"
            class="gcform"
            ref="detailform"
          >
            <div class="row-four">
              <div class="four-name">指标名称</div>
              <div class="four-name">房屋建筑施工面积(平方米)</div>
              <div class="four-name">房屋建筑竣工面积(平方米)</div>
              <div class="four-name">房屋竣工价值(万元)</div>
            </div>
            <div class="row-four">
              <div class="four-name">合计：</div>
              <el-form-item>
                <el-input
                  disabled
                  v-model="detailform.buildingDetailList.JB2_00_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  disabled
                  clearable

                  v-model="detailform.buildingDetailList.JB2_00_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  disabled
                  clearable

                  v-model="detailform.buildingDetailList.JB2_00_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">1、住宅房屋：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_01_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_01_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_01_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">2、商业及服务用房屋：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_02_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_02_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_02_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">（1）商厦房屋（批发和零售用房）：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_02_001_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_02_001_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_02_001_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">（2）宾馆用房屋（住宿用房）：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_02_002_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_02_002_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_02_002_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">（3）餐饮用房屋（餐饮用房）：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_02_003_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_02_003_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_02_003_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">（4）商务会展用房屋：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_02_004_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_02_004_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_02_004_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">（5）其他商业及服务用房屋（居民服务业用房）：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_02_005_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_02_005_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_02_005_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">3、办公用房屋：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_03_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_03_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_03_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">4、科研、教育、医疗用房屋：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_04_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_04_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_04_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">（1）科学研究用房屋：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_04_001_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_04_001_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_04_001_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">（2）教育用房屋：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_04_002_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_04_002_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_04_002_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">（3）医疗用房屋（卫生医疗用房）：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_04_003_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_04_003_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_04_003_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">5、文化、体育、娱乐用房屋：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_05_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_05_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_05_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">6、厂房及建筑物：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_06_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_06_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_06_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">其中：厂房：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_06_001_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_06_001_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_06_001_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">7、仓库：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_07_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_07_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_07_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">8、其他未列明的房屋建筑物：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_08_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_08_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_08_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">9、铁路工程：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_09_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_09_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_09_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">10、公路工程：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_10_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_10_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_10_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">11、城市轨道：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_11_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_11_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_11_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">12、市政工程：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_12_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_12_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_12_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">13、电力工程：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_13_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_13_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_13_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">14、水利工程：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_14_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_14_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_14_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">15、机场工程：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_15_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_15_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_15_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">16、矿山工程：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_16_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_16_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_16_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
            <div class="four-name">17、港口与航道工程：</div>
            <el-form-item>
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.buildingDetailList.JB2_17_convalue"/>
            </el-form-item>
            <el-form-item>
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.buildingDetailList.JB2_17_comvalue"/>
            </el-form-item>
            <el-form-item>
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.buildingDetailList.JB2_17_value"/>
            </el-form-item>
          </div>
            <div class="row-four">
              <div class="four-name">18、其它工程：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_18_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_18_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingDetailList.JB2_18_value"/>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="季报房建完成JB2表(境内)">
        <div class="detailBox">
          <el-form
            :inline="false"
            :model="detailform"
            :rules="rules"
            class="gcform"
            ref="detailform"
          >
            <div class="row-four">
              <div class="four-name">指标名称</div>
              <div class="four-name">房屋建筑施工面积(平方米)</div>
              <div class="four-name">房屋建筑竣工面积(平方米)</div>
              <div class="four-name">房屋竣工价值(万元)</div>
            </div>
            <div class="row-four">
              <div class="four-name">合计：</div>
              <el-form-item>
                <el-input
                  disabled
                  v-model="detailform.buildingJnDetailList.JB2_00_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  disabled
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_00_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  disabled
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_00_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">1、住宅房屋：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_01_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_01_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_01_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">2、商业及服务用房屋：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_02_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_02_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_02_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">（1）商厦房屋（批发和零售用房）：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_02_001_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_02_001_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_02_001_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">（2）宾馆用房屋（住宿用房）：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_02_002_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_02_002_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_02_002_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">（3）餐饮用房屋（餐饮用房）：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_02_003_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_02_003_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_02_003_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">（4）商务会展用房屋：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_02_004_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_02_004_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_02_004_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">（5）其他商业及服务用房屋（居民服务业用房）：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_02_005_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_02_005_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_02_005_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">3、办公用房屋：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_03_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_03_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_03_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">4、科研、教育、医疗用房屋：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_04_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_04_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_04_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">（1）科学研究用房屋：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_04_001_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_04_001_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_04_001_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">（2）教育用房屋：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_04_002_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_04_002_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_04_002_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">（3）医疗用房屋（卫生医疗用房）：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_04_003_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_04_003_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_04_003_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">5、文化、体育、娱乐用房屋：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_05_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_05_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_05_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">6、厂房及建筑物：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_06_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_06_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_06_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">其中：厂房：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_06_001_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_06_001_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_06_001_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">7、仓库：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_07_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_07_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_07_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">8、其他未列明的房屋建筑物：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_08_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_08_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_08_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">9、铁路工程：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_09_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_09_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_09_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">10、公路工程：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_10_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_10_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_10_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">11、城市轨道：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_11_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_11_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_11_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">12、市政工程：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_12_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_12_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_12_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">13、电力工程：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_13_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_13_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_13_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">14、水利工程：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_14_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_14_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_14_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">15、机场工程：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_15_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_15_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_15_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">16、矿山工程：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_16_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_16_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_16_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">17、港口与航道工程：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_17_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_17_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_17_value"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">18、其它工程：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_18_convalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_18_comvalue"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.buildingJnDetailList.JB2_18_value"/>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="季报从业人员JB3表">
        <div class="detailBox">
          <el-form
            :inline="false"
            :model="detailform"
            :rules="rules"
            class="gcform"
            ref="detailform"
          >
            <div class="row-three">
              <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                <span>一 ﹑从业人员 </span>
              </p>
              <el-form-item
                label="从业人员期末人数(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.salaryDetail.terminal"/>
              </el-form-item>
              <el-form-item
                label="其中：女性(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.salaryDetail.female"/>
              </el-form-item>
              <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                <span>按人员类型分 </span>
              </p>
              <el-form-item
                label="在岗职工(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.salaryDetail.terstaff"/>
              </el-form-item>
              <el-form-item
                label="劳务派遣人员(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.salaryDetail.terlabor"/>
              </el-form-item>
              <el-form-item
                label="其他从业人员(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.salaryDetail.terother"/>
              </el-form-item>
              <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                <span>从业人员平均人数(人): </span>
              </p>
              <el-form-item
                label="在岗职工(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.salaryDetail.averstaff"/>
              </el-form-item>
              <el-form-item
                label="劳务派遣人员(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.salaryDetail.averlabor"/>
              </el-form-item>
              <el-form-item
                label="其他从业人员(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.salaryDetail.averother"/>
              </el-form-item>
            </div>
            <div class="row-three">
              <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                <span>二﹑工资总额</span>
              </p>
              <el-form-item
                label="从业人员工资总额(千元):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.salaryDetail.salary"/>
              </el-form-item>
              <el-form-item
                label="在岗职工(千元):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.salaryDetail.salstaff"/>
              </el-form-item>
              <el-form-item
                label="劳务派遣人员(千元):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.salaryDetail.sallabor"/>
              </el-form-item>
              <el-form-item
                label="其他从业人员(千元):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.salaryDetail.salother"/>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="季报财务状况JB4表">
        <div class="detailBox">
          <el-form
            :inline="false"
            :model="detailform"
            :rules="rules"
            class="gcform"
            ref="detailform"
          >
            <p  class="detail-title" style="overflow: hidden;margin-right:30px">
              <span>指标名称(单位：千元)</span>
            </p>
            <el-form-item
              label="一 、年初存货:"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.financialDetail.yearstock"/>
            </el-form-item>
            <p  class="detail-title" style="overflow: hidden;margin-right:30px">
              <span>二﹑资产负债</span>
            </p>
            <div class="row-three">
              <el-form-item
                label="流动资产合计:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.financialDetail.ldasset"/>
              </el-form-item>
              <el-form-item
                label="其中：应收工程款:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.financialDetail.project"/>
              </el-form-item>
              <el-form-item
                label="其中：竣工工程:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.financialDetail.comproject"/>
              </el-form-item>
              <el-form-item
                label="存货:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.financialDetail.stock"/>
              </el-form-item>
            </div>
            <div class="row-three">
              <el-form-item
                label="资产总计:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.financialDetail.asset"/>
              </el-form-item>
              <el-form-item
                label="负债合计:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.financialDetail.debt"/>
              </el-form-item>
            </div>
            <p  class="detail-title" style="overflow: hidden;margin-right:30px">
              <span>三﹑损益及分配</span>
            </p>
            <div class="row-three">
              <el-form-item
                label="营业收入:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.financialDetail.income"/>
              </el-form-item>
              <el-form-item
                label="其中：主营业务收入:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.financialDetail.mainincome"/>
              </el-form-item>
              <el-form-item
                label="营业成本:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.financialDetail.cost"/>
              </el-form-item>
              <el-form-item
                label="其中：主营业务成本:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.financialDetail.maincost"/>
              </el-form-item>
              <el-form-item
                label="营业税金及附加:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.financialDetail.tax"/>
              </el-form-item>
              <el-form-item
                label="其中：主营业务税金及附加:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.financialDetail.maintax"/>
              </el-form-item>
              <el-form-item
                label="其他业务利润:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.financialDetail.other"/>
              </el-form-item>
              <el-form-item
                label="利润总额:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.financialDetail.sumprofit"/>
              </el-form-item>
            </div>
            <div class="row-three">
              <el-form-item
                label="销售费用:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.financialDetail.sale"/>
              </el-form-item>
              <el-form-item
                label="管理费用:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.financialDetail.manage"/>
              </el-form-item>
              <el-form-item
                label="其中：税金:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.financialDetail.taxmanage"/>
              </el-form-item>
              <el-form-item
                label="差旅费:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.financialDetail.clmanage"/>
              </el-form-item>
              <el-form-item
                label="工会经费:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.financialDetail.ghmanage"/>
              </el-form-item>
              <el-form-item
                label="财务费用:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.financialDetail.financial"/>
              </el-form-item>
              <el-form-item
                label="营业利润:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.financialDetail.profit"/>
              </el-form-item>
            </div>
            <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                <span>四、人工成本</span>
            </p>
            <el-form-item
              label="应付职工薪酬(本年贷方累计发生额):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.financialDetail.salary"/>
            </el-form-item>
            <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                <span>五、土地和固定资产支出: <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.financialDetail.fixed"/> </span>
            </p>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="审批流程" v-if="p.actpoint == 'task'||p.actpoint == 'look'">
        <Audit-Process :task="p.task||{businessId:p.instid,businessType:' contract_project_new'}"></Audit-Process>
      </el-tab-pane>
    </el-tabs>
    <Tree v-if="treeStatas" ref="addOrUpdate" @getPosition="getPositionTree"></Tree>
  </div>
</template>

<script>
  import Tree from '@/components/tree'
  import FileUpload from '@/components/fileUpload'
  import { isMoney, isMobile} from '@/utils/validate'
  import AuditProcess from '@/components/auditProcess'
  import financeDetail from "../project/change/financeDetail";
  export default {
    // name: "详情",
    data() {
      var validateMoney = (rule, value, callback) => {
        // console.log(value)
        if(value===''){
          callback(new Error('不能为空'))
        }else if (!isMoney(value)) {
          callback(new Error('请输入正确的金额格式'))
        } else {
          callback()
        }
      };
      var validatePhone = (rule, value, callback) => {
        // console.log(value)
        if(value===''){
          callback(new Error('不能为空'))
        }else if (!isMobile(value)) {
          callback(new Error('请输入正确的手机格式'))
        } else {
          callback()
        }
      }
      return {
        timeout:  null,
        maxMoney:1000000,
        id:'',
        key: 0,
        treeStatas: false,
        positionIndex: '',//缓存当前的选中的项目地点的index
        options2: [],
        options: [],
        searchform:{},
        detailform: {
            buildingDetailList:{},
            buildingJnDetailList:{},
            businessDetailMap:{},
            businessJnDetailMap:{},
            financialDetail:{},
            salaryDetail:{},
            season:{},
        },
        xqprojectType: [],//工程类别二级
        emergingMarketTwo:[],//新兴市场二级
        projectNatureTwo:[],//项目性质二级
        p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
        sizeform: {projectScale: "", sectionName: ""},
        yesOrNo:[
          {
            id:'0',
            detailName:'是'
          },
          {
            id:'1',
            detailName:'否'
          }
        ],
        rules:{
          contractAmount: [
            { required: true,validator: validateMoney, trigger: 'change' }
          ],
          phone: [
            { required: true,validator: validatePhone, trigger: 'blur' }
          ]
        },//表单验证规则
      };
    },
    components: {
      Tree,
      FileUpload,
      AuditProcess
    },
    computed: {
      projectDomainType() {
        // console.log(this.$store.state.category.projectDomainType)
        return this.$store.state.category.projectDomainType;
      },
      emergingMarket() {
        // console.log(this.$store.state.category.emergingMarket)
        return this.$store.state.category.emergingMarket;
      },
      projectNature(){
        return this.$store.state.category.projectNature;
      },
      certificationType(){
        return this.$store.state.certificationType;
      },
      bizCode() {
        return this.$store.state.bizCode;
      },
      projectPlate(){
        return this.$store.state.projectPlate;
      },
      bulletinType() {
        return this.$store.state.bulletinType;
      },
      projectModel() {
        return this.$store.state.projectModel;
      },
      amountSource() {
        return this.$store.state.amountSource;
      },
      // yesOrNo() {
      //   return this.$store.state.yesOrNo;
      // },
      position() {
        return this.$store.state.position;
      },
      probability() {
        return this.$store.state.probability;
      },
      railwayLine() {
        return this.$store.state.railwayLine;
      },
      pubCustomers() {//客户名称
        return this.$store.state.pubCustomers;
      },
      assemblyType(){
        return this.$store.state.assemblyType;//装配类型
      },
      architecturalType(){
        return this.$store.state.architecturalType;//建筑类型
      },
      buildingStructure(){
        return this.$store.state.buildingStructure;//建筑结构类型
      },
      siteName(){
        return this.$store.state.siteName;//场地名称
      },
    },
    mounted() {
      // window.onresize = () => {
      //   return (() => {
      //     window.screenWidth = document.body.clientWidth
      //   console.log( window.screenWidth)
      // })()
      // }
      // this.$store.commit("setCategory", 'projectDomainType');
      this.$store.dispatch("getConfig", {});
      this.$store.dispatch("getPubCustomers", {});
      this.$store.dispatch('getCategory', {name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e'});
      this.$store.dispatch('getCategory', {name: 'emergingMarket', id: '33de2e063b094bdf980c77ac7284eff3'});
      this.$store.dispatch('getCategory', {name: 'projectNature', id: '99239d3a143947498a5ec896eaba4a72'});
      this.id=this.p.instid;
      if (this.p.actpoint === "edit"||this.id) {
        this.getDetail();
      }
      if (this.p.actpoint === "add") {
        this.detailform.topInfoSiteList=[{
          country: '',
          ffid: '',
          path: '',
          contractAmount: '',
          isMain: ''
        }];
        this.detailform.topInfoSectionList=[{
          sectionName: '',
          projectScale: '',
        }]
      }

      // eslint-disable-next-line no-unde
    },
    methods: {
      //复选下拉框框获取name
      getMultipleName(valueList,list,id,name){
        var _id=[],_name=[];
        list.forEach((item)=>{
          if(valueList.indexOf(item.id)!=-1){
          _id.push(item.id);
          _name.push(item.detailName)
        }
      });
        this.detailform.topInfor[id]=_id.join(",");
        this.detailform.topInfor[name]=_name.join(",");
      },
      //流程操作
      operation(type){
        this.$http
          .post(
            '/api/contract/topInfo/TopInfor/process/'+type,
            JSON.stringify(this.p.task),
            {useJson: true}
          )
          .then((res) => {
          if (res.data.code === 200) {
          this.$message({
            message: "操作成功",
            type: "success",
          });
          this.$router.back()
        }
      });
      },
      //建设单位搜索
      querySearchAsync(queryString, cb) {
        var restaurants = this.pubCustomers;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.$forceUpdate();
        cb(results);
      }, 500 * Math.random());
      },
      createStateFilter(queryString) {
        return (restaurants) => {
          return (restaurants.value.toLowerCase().indexOf(queryString.toLowerCase()) != -1);
        };
      },
      //设置主地点
      setMain(i,list){
        list.forEach((item,index)=>{
          if(index==i){
          item.isMain="1"
        }else{
          item.isMain="0"
        }
      });
      },
      //解决新增的时候二级联动清除不了
      clear(id,name){
        id='';
        name='';
        this.$forceUpdate();
      },
      //金额过滤
      getMoney(value){
        return isMoney(value);
      },
      //获取项目地点的值
      getPositionTree(data) {
        console.log(data)
        this.treeStatas = false;
        var country = '', _data = data;
        if (_data.fullDetailName.indexOf("境内") != -1) {
          country = '01';
        } else if (_data.fullDetailName.indexOf("境外") != -1) {
          country = '02';
        }
        this.detailform.topInfoSiteList.forEach((item, index) => {
          if (index == this.positionIndex) {
          // item.detailName = _data.detailName;
          item.country = country;
          item.ffid = _data.fullDetailCode;
          item.path = _data.fullDetailName;
        }
      });
        this.key = this.key + 1;
      },
      //选择项目地点
      selectPosition() {
        this.treeStatas = true;
        console.log(this.positionIndex);
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init()
      })
      },
      submit() {
      },
      //工程类别二级
      getTwo(id) {
        this.detailform.topInfor.enginTypeSecondId='';
        this.detailform.topInfor.enginTypeSecondName='';
        this.detailform.topInfor.enginTypeFirstName='';
        this.xqprojectType=[];
        if(id!=''){
          this.projectDomainType.find(
            (item) => {
            if (item.id == id) {
            this.detailform.topInfor.enginTypeFirstName = item.detailName;
            this.xqprojectType = item.children;
          }
        }
        )
        }
      },
      //新兴市场二级
      getTwoSC(id) {
        this.detailform.topInfor.marketSecondId='';
        this.detailform.topInfor.marketSecondName='';
        this.detailform.topInfor.marketFirstName='';
        this.emergingMarketTwo=[];
        if(id!=''){
          this.emergingMarket.find(
            (item)=>{
            if (item.id == id) {
            this.detailform.topInfor.marketFirstName = item.detailName;
            this.emergingMarketTwo = item.children;
          }
        }
        )
        }
      },
      //项目性质二级
      getTwoXZ(id){
        this.detailform.topInfor.projectNatureSecondId='';
        this.detailform.topInfor.projectNatureSecondName='';
        this.detailform.topInfor.projectNatureFirstName='';
        this.projectNatureTwo=[];
        if(id!=''){
          this.projectNature.find(
            (item)=>{
            if (item.id == id) {
            this.detailform.topInfor.projectNatureFirstName = item.detailName;
            this.projectNatureTwo = item.children;
          }
        }
        )
        }
      },
      //获取下拉框id和name的公共方法
      getName(id, list, name) {
        if(id){
          this.$forceUpdate();
          this.detailform.topInfor[name] = list.find(
            (item) => item.id == id
        ).detailName;
          console.log(this.detailform.topInfor[name]);
        }
      },
      //获取下拉框id和name的公共方法
      getNameZb(id, list, name) {
        if(id){
          this.$forceUpdate()
          this.detailform.topInfoOrg[name] = list.find(
            (item) => item.id == id
        ).detailName;
          console.log(this.detailform.topInfoOrg[name]);
        }
      },
      saveInfo(formName,type) {
        var url='';
        if(type=='save'){
          url="/api/statistics/Season/detail/save"
        }else{
          //url="/api/contract/topInfo/TopInfor/process/start"
        }
        var topInforCapitalList = [];
        this.amountSource.forEach((item) => {
          if (this.detailform.value1&&this.detailform.value1.indexOf(item.id) != -1) {
          var v = {
            capitalId: item.id,
            capitalName: item.detailName,
          };
          topInforCapitalList.push(v);
        }
      });

        this.detailform.topInforCapitalList=topInforCapitalList;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http
              .post(
                url,
                JSON.stringify(this.detailform),
                {useJson: true}
              )
              .then((res) => {
              if (res.data.code === 200) {
              this.$message({
                message: "保存成功",
                type: "success",
              });
              this.$refs[formName].resetFields();
              this.$router.push({
                path: "/manage/proposal/list",
              });
            }
          });
          } else {
            this.$message.error("请添加必填项");
        return false;
      }
      });
      },
      pageGo() {
        this.searchParam.current = this.current;
        this.getuserlist();
      },
      back() {
        this.$router.back()
        // this.$router.push({
        //   path: "/manage/proposal/list",
        // });
      },
      del(index,item,list,type) {
        console.log(index);
        if(item.uuid&&type=='bd'){
          this.$confirm(`确认删除该条数据吗?删除后数据不可恢复`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http
            .post(
              "/api/contract/topInfo/TopInfoSection/list/delete",
              {ids: [item.uuid]}
            )
            .then((res) => {
            if (res.data && res.data.code === 200) {
            list.splice(index, 1);
            console.log(list)
          } else {
            this.$message.error(data.msg)
          }
        });
        }).catch(() => {})
        }else{
          list.splice(index, 1);
        }
        // var _self = this;
        // _self.detailform.topInfoSectionList.splice(index, 1);
      },
      //新增标段和地点
      add(type) {
        var v = {};
        if (type == 'dd') {
          v = {
            country: '',
            ffid: '',
            path: '',
            contractAmount: '',
            isMain: ''
          }
          this.detailform.topInfoSiteList.push(v);
        } else {
          v = {
            sectionName: '',
            projectScale: '',
          }
          this.detailform.topInfoSectionList.push(v);
        }
      },
      resetinfo() {
        this.sizeform = {
          id: "",
          part: "",
          showinput: true,
        };
      },
      // 加载列表
      getDetail() {
        this.$http
          .post("/api/statistics/Season/detail/entityInfo", {uuid:this.id})
          .then((res) => {
          var datas=res.data.data;
        /*this.getTwo(datas.topInfor.enginTypeFirstId||'');
        this.getTwoSC(datas.topInfor.marketFirstNameId||'');
        this.getTwoXZ(datas.topInfor.projectNatureFirstId||'');*/
        this.detailform={
            financialDetail:datas.financialDetail,
            salaryDetail:datas.salaryDetail,

         /* topInfor: datas.topInfor,
          topInfoOrg: datas.topInfoOrg,
          topInfoSiteList: datas.topInfoSiteList,
          topInfoSectionList: datas.topInfoSectionList,
          value1:[],
          zplx:[],//装配类型
          jzlx:[],//建筑类型
          jzjglx:[],//建筑结构类型
          cdmc:[],//场地名称*/
        }
        this.detailform.cdmc=datas.topInfor.siteNameId&&datas.topInfor.siteNameId.split(",");
        this.detailform.zplx=datas.topInfor.otherAssemblyTypeId&&datas.topInfor.otherAssemblyTypeId.split(",");
        this.detailform.jzlx=datas.topInfor.otherBuildingTypeId&&datas.topInfor.otherBuildingTypeId.split(",");
        this.detailform.jzjglx=datas.topInfor.otherBuildingStructureTypeId&&datas.topInfor.otherBuildingStructureTypeId.split(",");
        datas.topInforCapitalList.forEach((item)=>{
          this.detailform.value1.push(item.capitalId)
      });
      });
      },

      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    },
  };
</script>
<style lang="scss" scoped>
  .detail-back-tab{
    padding: 10px 20px ;
    border:1px solid #ddd;
    color: black;
    position: absolute;
    top:1px;
    right:15px;
    z-index: 999999999;
    background: #fff;
  }
  .save-btn{
    right: 95px;
    background: #409EFF;
    color:#fff;
  }
  .sub-btn{
    right: 175px;
  }
  .btn-group{
    text-align: center;
    margin-top: 20px;
  }
  .gcform {
    margin-top: 10px;
    >>>.el-form-item__label:before {
      position: initial;
      left: -10px;
    }
    >>>.el-form-item__error {
      padding-top: 0px;
      width: 95%;
      margin-left: 0;
      text-align: right;
      top: 0%;
    }
    >.el-form-item,>>>.formItem{

      display: inline-block;
      width: 32.5%!important;
    }
    .row-three{
      display: inline-block;
      width: 32.5%!important;
      vertical-align: top;
    }
    .row-three >>>.el-form-item{
      display: inline-block;
      width: 100%!important;
    }
    .row-four{
      margin-top: 10px;
    }
    .row-four>div{
      display: inline-block;
      width: 24%!important;
      margin-right: 0.5%;
      vertical-align: top;
    }
    .row-four >>>.el-input{
      width: 100%!important;
    }
    .div-item >>>.el-form-item{
      display: inline-block;
      width: 32.5%!important;
    }
    .detailformfooter1 {
      margin-top: 5px;
      width: 100%;
      .el-button {
        margin: 0 30px;
        width: 140px;
        height: 42px;
        font-size: 18px;
        font-family: Microsoft YaHei;
      }
      .el-button--primary {
        background: #5c8bfa;
      }
      .el-button--default {
        border: 1px solid #5c8bfa;
        color: #5c8bfa;
      }
    }
    .errorMsg >>>.el-form-item__label {
      color: red;
    }
    .el-input {
      width: 300px;
    }
    .el-input .el-input_inner {
      width: 300px;
      height: 500px;
    }
  }

  .el-input .el-input_inner {
    width: 300px;
    height: 500px;
  }

  .el-table thead.is-group th {
    background: #fff;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }

  .el-card__body {
    /*padding: 0 100px;*/
    // height: 400px;
    // border: 1px solid black;
    // height: 200px;
  }

  >>>.el-input--mini .el-input__inner {
    height: 40px;
    width: 100%;
    box-sizing: border-box;
    // margin: 10px 0 0 10px;
  }

  .gcform >>>.el-input {
    width: 95%;
  }
  .listInput{
    width: auto!important;
  }
  .gcform .listInput input{
    width: 100px!important;
    padding:10px!important;
    box-sizing: border-box;
  }
  .neirong {
    width: 100% !important;
  }

  .gcform >>>.el-form-item {
    margin-bottom: 0px;
  }

  .neirong >>>.el-input--mini .el-input__inner {
    height: 100px;
  }

  .detail_bottom {
    margin: 20px 0 0 0;
    // border: 1px solid #ddd;
  }

  .el-card,
  .el-message {
    overflow: hidden;
  }

  .el-scrollbar__wrap.default-scrollbar__wrap {
    overflow: hidden;
  }

  .el-card.is-always-shadow,
  .el-card.is-hover-shadow:focus,
  .el-card.is-hover-shadow:hover {
    overflow: auto;
    // height: 500px ;
    /*height: 44vh;*/
  }

  .el-button--mini,
  .el-button--mini.is-round {
    margin: 0 27px 5px 0;
  }

  .el-table--border {
    min-height: auto !important;
  }
  .table-div{
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
  }
  .queryForm>.el-button{
    margin-top: 5px;
  }
  .queryForm >>>.el-form-item__label{
    width: auto;
  }
  .queryForm >>>.el-input--mini .el-input__inner{
    height: auto;
    line-height: inherit;
  }
  .detail-title >>>.el-input{
    width: 32.5%!important;
    display: inline-block;
  }
  .tabs-header-copy{
    width: 99%;
    height: 38px;
    background-color: #F5F7FA;
    border-bottom: 1px solid #E4E7ED;
    margin: 0;
    position: absolute;
    top:2px;
    right: 3px;
  }
  >>>.el-tabs__header{
    width: 77%;
  }
  .detailBox{
    padding-top: 20px;
  }
</style>

