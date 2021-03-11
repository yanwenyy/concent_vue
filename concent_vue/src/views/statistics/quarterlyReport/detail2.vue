<template>
  <div style="position: relative">
    <div class="tabs-header-copy"></div>
    <el-button @click="back" class="detailbutton detail-back-tab" >返回</el-button>
    <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'" type="primary" @click="saveInfo('detailform','save')" class="detailbutton detail-back-tab save-btn">保存</el-button>
    <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'&&(p.actpoint == 'add'||detailform.topInfoOrg.flowStatus==1||detailform.topInfoOrg.flowStatus==4)" @click="saveInfo('detailform','sub')" class="detailbutton detail-back-tab sub-btn">提交</el-button>
    <el-button v-show="p.actpoint == 'task'&&p.task.edit==false" class="detailbutton detail-back-tab bh" @click="operation('back')"  type="warning">驳回</el-button>
    <el-button v-show="p.actpoint == 'task'&&p.task.edit==false" class="detailbutton detail-back-tab tg" @click="operation('complete')"  type="success">通过</el-button>
    <el-tabs type="border-card" >
      <el-tab-pane label="法人单位NB1表">
        <div>
          <div style="text-align: center; margin-top: 5px">
            <span>法人单位基本情况</span>
          </div>
          <div style="float: right">
            <span>表&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:&nbsp;NB1表</span><br>
            <span>制表机关:&nbsp;中国铁建股份有限公司</span><br>
            <span>文&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:&nbsp;中国铁建经计函[2016]543号</span><br>
            <span>有效期至:&nbsp;2022年1月</span><br>
          </div>
          <div style=" padding:0 100px 50px 100px">
              <el-form
                :inline="false"
                :model="detailform"
                :rules="rules"
                class="gcform"
                ref="detailform"
              >
                <el-form-item
                  label="企业代码"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforName"/>
                </el-form-item>
                <el-form-item
                  label="单位名称"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <br>
                <el-form-item
                  label="101、组织机构代码"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>

                <el-form-item
                  label="102、单位详细名称"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>

                <el-form-item
                  label="109、统一社会信用代码"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable
                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item><br>

                <el-form-item
                  label="103、行业代码"
                >  </el-form-item><br>
                 <el-form-item label="主要业务活动(或主要产品)"> </el-form-item><br>
                   <el-form-item label="1">
                     <el-input
                       :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                       clearable
                       v-model="detailform.topInfor.inforNameForeign"/>
                   </el-form-item>
                   <el-form-item label="2">
                     <el-input
                       :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                       clearable
                       v-model="detailform.topInfor.inforNameForeign"/>
                   </el-form-item>
                   <el-form-item label="3">
                     <el-input
                       :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                       clearable
                       v-model="detailform.topInfor.inforNameForeign"/>
                   </el-form-item>
                   <el-form-item label="行业代码">
                     <el-input
                       :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                       clearable
                       v-model="detailform.topInfor.inforNameForeign"/>
                   </el-form-item>
              <br>

                <el-form-item
                  label="104、报表类别"
                >

                  <el-select
                    placeholder="请选择"
                    size="mini"
                    v-model="searchform.reportType"
                  >
                      <el-option label="" value="" ></el-option>
                      <el-option label="A 农业" value="1" ></el-option>
                      <el-option label="B 工业" value="2" ></el-option>
                      <el-option label="C 建筑业" value="3" ></el-option>
                      <el-option label="D 运输邮电业" value="4" ></el-option>
                      <el-option label="E 批发和零售业" value="5" ></el-option>
                      <el-option label="S 住宿和餐饮业" value="6" ></el-option>
                      <el-option label="X 房地产业" value="7" ></el-option>
                      <el-option label="F 其他服务业" value="8" ></el-option>
                    </el-select>
                </el-form-item><br>
                <span>A农业</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>B工业</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>C建筑业</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>D运输邮电业</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>E批发和零售业</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>S住宿和餐饮业</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>X房地产业</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>F其他服务业</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <br>
                <el-form-item
                  label="105、单位所在地及区划:"
                >
                </el-form-item><br>
                <el-form-item  label="省(自治区、直辖市)">

                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable
                    v-model="detailform.topInfor.inforNameForeign"/> -
                </el-form-item>

                <el-form-item label="地(区、市、州、盟)">
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable
                    v-model="detailform.topInfor.inforNameForeign"/> -
                </el-form-item>
                <el-form-item label="县(区、市、旗)">
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/> -
                </el-form-item>

                <el-form-item label="乡(镇)">
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/> -
                 </el-form-item>

                 <el-form-item label="街(村)、门牌号">
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
                 </el-form-item>
                <br>
                <el-form-item label="单位位于:"></el-form-item><br>
                <el-form-item label="街道办事处">
               <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable
                v-model="detailform.topInfor.inforNameForeign"/> -
                </el-form-item>

                <el-form-item label="社区(居委会)">
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <br>
                <el-form-item
                  label="区域代码"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable
                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="城乡代码"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable
                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item><br>


                <el-form-item
                  label="106、单位注册地及区划:"
                >
                </el-form-item><br>
                <el-form-item  label="省(自治区、直辖市)">

                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable
                    v-model="detailform.topInfor.inforNameForeign"/> -
                </el-form-item>

                <el-form-item label="地(区、市、州、盟)">
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable
                    v-model="detailform.topInfor.inforNameForeign"/> -
                </el-form-item>
                <el-form-item label="县(区、市、旗)">
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable
                    v-model="detailform.topInfor.inforNameForeign"/> -
                </el-form-item>

                <el-form-item label="乡(镇)">
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable
                    v-model="detailform.topInfor.inforNameForeign"/> -
                </el-form-item>

                <el-form-item label="街(村)、门牌号">
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable
                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <br>
                <el-form-item label="注册地位于:"></el-form-item><br>
                <el-form-item label="街道办事处">
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable
                    v-model="detailform.topInfor.inforNameForeign"/> -
                </el-form-item>

                <el-form-item label="社区(居委会)">
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable
                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <br>
                <el-form-item
                  label="区域代码"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable
                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="城乡代码"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable
                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item><br>


                <el-form-item
                  label="191、单位规模"
                >

                  <el-select
                    placeholder="请选择"
                    size="mini"
                    v-model="searchform.reportType"
                  >
                    <el-option label="" value="" ></el-option>
                    <el-option label="1 大型" value="1" ></el-option>
                    <el-option label="2 中型" value="2" ></el-option>
                    <el-option label="3 小型" value="3" ></el-option>
                    <el-option label="4 微型" value="4" ></el-option>
                  </el-select>
                </el-form-item>&nbsp;&nbsp;
                  <span>1大型</span>&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>2中型</span>&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>3小型</span>&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>4微型</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <br>


                <el-form-item
                  label="192、从业人员"
                ></el-form-item><br>
                <el-form-item
                  label="从业人员期末人数(人):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="其中:女性(人):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <br>
                <el-form-item
                  label="193、企业主要经济指标"
                ></el-form-item><br>
                <el-form-item
                  label="营业收入(千元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable
                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>

                <el-form-item
                  label="其中:主营业务收入(千元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="资产总计(千元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item><br>

                <el-form-item
                  label="201、法定代表人(单位负责人)"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <br>
                <el-form-item
                  label="202、开业(成立)时间"
                ></el-form-item><br>
                <el-form-item label="年">
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable
                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item label="月">
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable
                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <br>

                <el-form-item
                  label="203、联系方式"
                ></el-form-item><br>
                <el-form-item
                  label="长途区号"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>

                <el-form-item
                  label="固定电话"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="电话分机号"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>

                <el-form-item
                  label="移动电话"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="传真号码"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>

                <el-form-item
                  label="传真分机号"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>

                <el-form-item
                  label="邮政编码"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>

                <el-form-item
                  label="电子邮箱"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>

                <el-form-item
                  label="网址"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <br>

                <el-form-item
                  label="204、登记注册(获批准)情况(如登记注册或批准机关为多个,请复选)"
                  label-width="500px"
                ></el-form-item><br>
                <el-form-item
                  label="机关级别:1国家2省(自治区、直辖市)3地(区、市、州、盟)4县(区、市、旗)"
                  label-width="500px"
                ></el-form-item><br>
                <div class="row-four">
                  <div class="four-name">登记注册(或批准)机关名称</div>
                  <div class="four-name">机关级别</div>
                  <div class="four-name">登记注册号</div>
                </div>
                <div class="row-four">
                  <div class="four-name">1、工商行政管理部门：</div>
                  <el-form-item>
                    <el-input
                      :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                      clearable

                      v-model="detailform.topInfor.inforName"/>
                  </el-form-item>
                  <el-form-item>
                    <el-input
                      :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                      clearable

                      v-model="detailform.topInfor.inforName"/>
                  </el-form-item>
                </div>
                <div class="row-four">
                  <div class="four-name">2、编制部门：</div>
                  <el-form-item>
                    <el-input
                      :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                      clearable

                      v-model="detailform.topInfor.inforName"/>
                  </el-form-item>
                  <el-form-item>
                    <el-input
                      :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                      clearable

                      v-model="detailform.topInfor.inforName"/>
                  </el-form-item>
                </div>
                <div class="row-four">
                  <div class="four-name">3、民政部门：</div>
                  <el-form-item>
                    <el-input
                      :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                      clearable

                      v-model="detailform.topInfor.inforName"/>
                  </el-form-item>
                  <el-form-item>
                    <el-input
                      :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                      clearable

                      v-model="detailform.topInfor.inforName"/>
                  </el-form-item>
                </div>
                <div class="row-four">
                  <div class="four-name">4、国家税务部门：</div>
                  <el-form-item>
                    <el-input
                      :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                      clearable

                      v-model="detailform.topInfor.inforName"/>
                  </el-form-item>
                  <el-form-item>
                    <el-input
                      :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                      clearable

                      v-model="detailform.topInfor.inforName"/>
                  </el-form-item>
                </div>
                <div class="row-four">
                  <div class="four-name">5、地方税务部门：</div>
                  <el-form-item>
                    <el-input
                      :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                      clearable

                      v-model="detailform.topInfor.inforName"/>
                  </el-form-item>
                  <el-form-item>
                    <el-input
                      :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                      clearable

                      v-model="detailform.topInfor.inforName"/>
                  </el-form-item>
                </div>
                <div class="row-four">
                  <div class="four-name">6、其他(请注明批准机关)：</div>
                  <el-form-item>
                    <el-input
                      :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                      clearable

                      v-model="detailform.topInfor.inforName"/>
                  </el-form-item>
                  <el-form-item>
                    <el-input
                      :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                      clearable

                      v-model="detailform.topInfor.inforName"/>
                  </el-form-item>
                </div>



                <el-form-item
                  label="205、登记注册类型"
                >
                  <el-select
                    placeholder="请选择"
                    size="mini"
                    v-model="searchform.reportType"
                  >
                    <el-option label="" value="" ></el-option>
                    <el-option label="110 国有" value="110" ></el-option>
                    <el-option label="120 集体" value="120" ></el-option>
                    <el-option label="130 股份" value="130" ></el-option>
                    <el-option label="141 国有联营" value="141" ></el-option>
                    <el-option label="142 集体联营" value="142" ></el-option>
                    <el-option label="143 国有与集体联营" value="143" ></el-option>
                    <el-option label="149 其他联营" value="149" ></el-option>
                    <el-option label="151 国有独资公司" value="151" ></el-option>
                    <el-option label="159 其他有限责任公司" value="159" ></el-option>
                    <el-option label="160 股份有限公司" value="160" ></el-option>
                    <el-option label="171 私营独资" value="171" ></el-option>
                    <el-option label="172 私营合伙" value="172" ></el-option>
                    <el-option label="173 私营有限责任公司" value="173" ></el-option>
                    <el-option label="174 私营股份有限公司" value="174" ></el-option>
                    <el-option label="190 其他" value="190" ></el-option>
                    <el-option label="210 与港澳台商合资经营" value="210" ></el-option>
                    <el-option label="220 与港澳台商合作经营" value="220" ></el-option>
                    <el-option label="230 港澳台商独资" value="230" ></el-option>
                    <el-option label="240 港澳台商投资股份有限公司" value="240" ></el-option>
                    <el-option label="290 其他港澳台投资" value="290" ></el-option>
                    <el-option label="310 中外合资经营" value="310" ></el-option>
                    <el-option label="320 中外合作经营" value="320" ></el-option>
                    <el-option label="330 外资企业" value="330" ></el-option>
                    <el-option label="340 外商投资股份有限公司" value="340" ></el-option>
                    <el-option label="390 其他外商投资" value="390" ></el-option>

                  </el-select>
                </el-form-item>&nbsp;&nbsp<br>
                <div class="row-four">
                  <div class="four-name"></div>
                  <div class="four-name">内资</div>
                  <div class="four-name">港澳台商投资</div>
                  <div class="four-name">外商投资</div>
                </div>
                <div class="row-four">
                  <div class="four-name">110 国有</div>
                  <div class="four-name">159 其他有限责任公司</div>
                  <div class="four-name">210 与港澳台商合资经营</div>
                  <div class="four-name">310 中外合资经营</div>
                </div>
                <div class="row-four">
                  <div class="four-name">120 集体</div>
                  <div class="four-name">160 股份有限公司</div>
                  <div class="four-name">220 与港澳台商合作经营</div>
                  <div class="four-name">320 中外合作经营</div>
                </div>
                <div class="row-four">
                  <div class="four-name">130 股份合作</div>
                  <div class="four-name">171 私营独资</div>
                  <div class="four-name">230 港澳台商独资</div>
                  <div class="four-name">330 外资企业</div>
                </div>
                <div class="row-four">
                  <div class="four-name">141 国有联营</div>
                  <div class="four-name">172 私营合伙</div>
                  <div class="four-name">240 港澳台商投资股份有限公司</div>
                  <div class="four-name">340 外商投资股份有限公司</div>
                </div>
                <div class="row-four">
                  <div class="four-name">142 集体联营</div>
                  <div class="four-name">173 私营有限责任公司</div>
                  <div class="four-name">290 其他港澳台投资</div>
                  <div class="four-name">390 其他外商投资</div>
                </div>
                <div class="row-four">
                  <div class="four-name">143 国有与集体联营</div>
                  <div class="four-name">174 私营股份有限公司</div>
                  <div class="four-name"></div>
                  <div class="four-name"></div>
                </div>
                <div class="row-four">
                  <div class="four-name">149 其他联营</div>
                  <div class="four-name">190 其他</div>
                  <div class="four-name"></div>
                  <div class="four-name"></div>
                </div>
                <div class="row-four">
                  <div class="four-name">151 国有独资公司</div>
                  <div class="four-name"></div>
                  <div class="four-name"></div>
                  <div class="four-name"></div>
                </div>

                <el-form-item
                  label="216、是否台商投资(限港澳台商投资企业填报)"
                >
                  <el-select
                    placeholder="请选择"
                    size="mini"
                    v-model="searchform.reportType"
                  >
                    <el-option label="" value="" ></el-option>
                    <el-option label="是" value="0" ></el-option>
                    <el-option label="否" value="1" ></el-option>
                  </el-select>
                </el-form-item><br>

                <el-form-item
                  label="206、企业控股情况"
                >
                  <el-select
                    placeholder="请选择"
                    size="mini"
                    v-model="searchform.reportType"
                  >
                    <el-option label="" value="" ></el-option>
                    <el-option label="1 国有控股" value="1" ></el-option>
                    <el-option label="2 集体控股" value="2" ></el-option>
                    <el-option label="3 私人控股" value="3" ></el-option>
                    <el-option label="4 港澳台商控股" value="4" ></el-option>
                    <el-option label="5 外商控股" value="5" ></el-option>
                    <el-option label="9 其他" value="9" ></el-option>
                  </el-select>
                </el-form-item>&nbsp;&nbsp;
                <span>1国有控股</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>2集体控股</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>3私人控股</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>4港澳台商控股</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>5外商控股</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>9其他</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <br>

                <el-form-item
                  label="207、隶属关系"
                >
                  <el-select
                    placeholder="请选择"
                    size="mini"
                    v-model="searchform.reportType"
                  >
                    <el-option label="" value="" ></el-option>
                    <el-option label="10 中央" value="10" ></el-option>
                    <el-option label="20 省(自治区、直辖市)" value="20" ></el-option>
                    <el-option label="40 地(区、市、州、盟)" value="40" ></el-option>
                    <el-option label="50 县(区、市、旗)" value="50" ></el-option>
                    <el-option label="61 街道" value="61" ></el-option>
                    <el-option label="62 镇" value="62" ></el-option>
                    <el-option label="63 乡" value="63" ></el-option>
                    <el-option label="71 社区(居委会)" value="71" ></el-option>
                    <el-option label="72 村委会" value="72" ></el-option>
                    <el-option label="90 其他" value="90" ></el-option>
                  </el-select>
                </el-form-item><br>
                <span>10中央</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>20省(自治区、直辖市)</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>40地(区、市、州、盟)</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>50县(区、市、旗)</span>&nbsp;&nbsp;&nbsp;&nbsp;<br>
                <span>61街道</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>62镇</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>63乡</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>71社区(居委会)</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>72村委会</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>90其他</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <br>

                <el-form-item
                  label="208、营业状态"
                >
                  <el-select
                    placeholder="请选择"
                    size="mini"
                    v-model="searchform.reportType"
                  >
                    <el-option label="" value="" ></el-option>
                    <el-option label="1 营业" value="1" ></el-option>
                    <el-option label="2 停业(歇业)" value="2" ></el-option>
                    <el-option label="3 筹建" value="3" ></el-option>
                    <el-option label="4 当年关闭" value="4" ></el-option>
                    <el-option label="5 当年破产" value="5" ></el-option>
                    <el-option label="9 其他" value="9" ></el-option>
                  </el-select>
                </el-form-item>
                <span>1营业</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>2停业(歇业)</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>3筹建</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>4当年关闭</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>5当年破产</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>9其他</span>&nbsp;&nbsp;&nbsp;&nbsp;<br>


                <el-form-item
                  label="209、执行会计标准类别"
                >
                  <el-select
                    placeholder="请选择"
                    size="mini"
                    v-model="searchform.reportType"
                  >
                    <el-option label="" value="" ></el-option>
                    <el-option label="1 企业会计制度" value="1" ></el-option>
                    <el-option label="2 事业单位会计制度" value="2" ></el-option>
                    <el-option label="3 行政单位会计制度" value="3" ></el-option>
                    <el-option label="4 民间非营利组织会计制度" value="4" ></el-option>
                    <el-option label="9 其他" value="9" ></el-option>
                  </el-select>
                </el-form-item><br>
                <span>1企业会计制度</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>2事业单位会计制度</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>3行政单位会计制度</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>4民间非营利组织会计制度</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>9其他</span>&nbsp;&nbsp;&nbsp;&nbsp;<br>


                <el-form-item
                  label="210、是否执行2006年《企业会计准则》"
                >
                  <el-select
                    placeholder="请选择"
                    size="mini"
                    v-model="searchform.reportType"
                  >
                    <el-option label="" value="" ></el-option>
                    <el-option label="1 是" value="1" ></el-option>
                    <el-option label="2 否" value="2" ></el-option>
                  </el-select>
                </el-form-item>
                <span>1是</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>2否</span>&nbsp;&nbsp;&nbsp;&nbsp;<br>

                <el-form-item
                  label="211、机构类型"
                >
                  <el-select
                    placeholder="请选择"
                    size="mini"
                    v-model="searchform.reportType"
                  >
                    <el-option label="" value="" ></el-option>
                    <el-option label="10 企业" value="10" ></el-option>
                    <el-option label="20 事业单位" value="20" ></el-option>
                    <el-option label="30 机关" value="20" ></el-option>
                    <el-option label="40 社会团体" value="40" ></el-option>
                    <el-option label="51 民办非企业单位" value="51" ></el-option>
                    <el-option label="52 基金会" value="52" ></el-option>
                    <el-option label="53 居委会" value="53" ></el-option>
                    <el-option label="54 村委会" value="54" ></el-option>
                    <el-option label="90 其他组织机构" value="90" ></el-option>
                  </el-select>
                </el-form-item><br>
                <span>10企业</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>20事业单位</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>30机关</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>40社会团体</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>51民办非企业单位</span>&nbsp;&nbsp;&nbsp;&nbsp;<br>
                <span>52基金会</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>53居委会</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>54村委会</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>90其他组织机构</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <br>

                <el-form-item
                  label="212、产业活动单位数"
                ></el-form-item><br>
                <el-form-item
                  label="总计(个)"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable
                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="其中:1.农林牧渔业(个)"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="2工业(个)"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="3建筑业(个)"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="4批发和零售业(个)"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="5住宿和餐饮业(个)"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="6房地产业(个)"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="9其他(个)"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item><br>


                <el-form-item
                  label="213、企业集团情况(限企业集团母公司及成员企业填写)"
                ></el-form-item><br>
                <el-form-item
                label="本企业是"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable
                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item><br>

                <el-form-item
                  label="1集团母公司(核心企业或集团总部)"
                ></el-form-item><br>
                <el-form-item
                  label="2成员企业——请填直接上级法人单位组织机构代码"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable
                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item><br>


                <el-form-item
                  label="C01、建筑业企业资质登记(请填写资质证书编号前4位)"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable
                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item><br>

                <el-form-item
                  label="C02、是否换发新版建筑企业资质证书"
                >
                  <el-select
                    placeholder="请选择"
                    size="mini"
                    v-model="searchform.reportType"
                  >
                    <el-option label="" value="" ></el-option>
                    <el-option label="1 是" value="1" ></el-option>
                    <el-option label="2 否" value="2" ></el-option>
                  </el-select>
                </el-form-item><br>

                <el-form-item
                  label="X01、房地产开发经营企业资质等级"
                >
                  <el-select
                    placeholder="请选择"
                    size="mini"
                    v-model="searchform.reportType"
                  >
                    <el-option label="" value="" ></el-option>
                    <el-option label="1 一级" value="1" ></el-option>
                    <el-option label="2 二级" value="2" ></el-option>
                    <el-option label="3 三级" value="3" ></el-option>
                    <el-option label="4 四级" value="4‘" ></el-option>
                    <el-option label="5 暂定" value="5" ></el-option>
                    <el-option label="9 其他" value="9" ></el-option>

                  </el-select>
                </el-form-item>
                <span>1一级</span>&nbsp;&nbsp;
                <span>2二级</span>&nbsp;&nbsp;
                <span>3三级</span>&nbsp;&nbsp;
                <span>4四级</span>&nbsp;&nbsp;
                <span>5暂定</span>&nbsp;&nbsp;
                <span>9其他</span>
                <br>
                <el-form-item
                  label="E01、批发和零售业企业经营形式"
                >
                  <el-select
                    placeholder="请选择"
                    size="mini"
                    v-model="searchform.reportType"
                  >
                    <el-option label="" value="" ></el-option>
                    <el-option label="1 独立门店" value="1" ></el-option>
                    <el-option label="2 连锁总店(总部)" value="2" ></el-option>
                    <el-option label="3 连锁门店" value="3" ></el-option>
                    <el-option label="9 其他" value="9" ></el-option>
                  </el-select>
                </el-form-item>
                <span>1独立门店</span>&nbsp;&nbsp;
                <span>2连锁总店(总部)</span>&nbsp;&nbsp;
                <span>3连锁门店</span>&nbsp;&nbsp;
                <span>9其他</span><br>


                <el-form-item
                  label="E02、零售业态"
                >
                  <el-select
                    placeholder="请选择"
                    size="mini"
                    v-model="searchform.reportType"
                  >
                    <el-option label="" value="" ></el-option>
                    <el-option label="1010 食杂店" value="1010" ></el-option>
                    <el-option label="1020 便利店" value="1020" ></el-option>
                    <el-option label="1030 折扣店" value="1030" ></el-option>
                    <el-option label="1040 超市" value="1040" ></el-option>
                    <el-option label="1050 大型超市" value="1050" ></el-option>
                    <el-option label="1060 仓储会员店" value="1060" ></el-option>
                    <el-option label="1070 百货店" value="1070" ></el-option>
                    <el-option label="1080 专业店" value="1080" ></el-option>
                    <el-option label="1090 专卖店" value="1090" ></el-option>
                    <el-option label="1100 家居理材商店" value="1100" ></el-option>
                    <el-option label="1110 购物中心" value="1110" ></el-option>
                    <el-option label="1120 厂家直销中心" value="1120" ></el-option>
                    <el-option label="2010 电视购物" value="2010" ></el-option>
                    <el-option label="2020 邮购" value="2020" ></el-option>
                    <el-option label="2030 网上商店" value="2030" ></el-option>
                    <el-option label="2040 自动售货亭" value="2040" ></el-option>
                    <el-option label="2050 电话购物" value="2050" ></el-option>
                  </el-select>
                </el-form-item><br>
                <span>有店铺零售</span><br>
                <span>1010食杂店</span>&nbsp;&nbsp;
                <span>1020便利店</span>&nbsp;&nbsp;
                <span>1030折扣店</span>&nbsp;&nbsp;
                <span>1040超市</span>&nbsp;&nbsp;
                <span>1050大型超市</span>&nbsp;&nbsp;
                <span>1060仓储会员店</span>&nbsp;&nbsp;
                <br>
                <span>1070百货店</span>&nbsp;&nbsp;
                <span>1080专业店</span>&nbsp;&nbsp;
                <span>1090专卖店</span>&nbsp;&nbsp;
                <span>1100家居理材商店</span>&nbsp;&nbsp;
                <span>1110购物中心</span>&nbsp&nbsp;
                <span>1120厂家直销中心</span>&nbsp;&nbsp;
                <br>
                <span>无店铺零售</span><br>
                <span>2010电视购物</span>&nbsp;&nbsp;
                <span>2020邮购</span>&nbsp;&nbsp;
                <span>2030网上商店</span>&nbsp;&nbsp;
                <span>2040自动售货亭</span>&nbsp;&nbsp;
                <span>2050电话购物</span>&nbsp&nbsp;
                <br>
                <el-form-item
                  label="E03、批发和零售业年末零售营业面积(平方米)"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item><br>

                <el-form-item
                  label="S01、住宿和餐饮业企业经营形式"
                >
                  <el-select
                    placeholder="请选择"
                    size="mini"
                    v-model="searchform.reportType"
                  >
                    <el-option label="" value="" ></el-option>
                    <el-option label="1 独立门店" value="1" ></el-option>
                    <el-option label="2 连锁总店(总部)" value="2" ></el-option>
                    <el-option label="3 连锁门店" value="3" ></el-option>
                    <el-option label="9 其他" value="9" ></el-option>
                  </el-select>
                </el-form-item>
                <span>1独立门店</span>&nbsp;&nbsp;
                <span>2连锁总店(总部)</span>&nbsp;&nbsp;
                <span>3连锁门店</span>&nbsp;&nbsp;
                <span>9其他</span><br>

                <el-form-item
                  label="S02、住宿业企业星级评定情况"
                >
                  <el-select
                    placeholder="请选择"
                    size="mini"
                    v-model="searchform.reportType"
                  >
                    <el-option label="" value="" ></el-option>
                    <el-option label="1 一星" value="1" ></el-option>
                    <el-option label="2 二星" value="2" ></el-option>
                    <el-option label="3 三星" value="3" ></el-option>
                    <el-option label="4 四星" value="4‘" ></el-option>
                    <el-option label="5 五星" value="5" ></el-option>
                    <el-option label="9 其他" value="9" ></el-option>

                  </el-select>
                </el-form-item>
                <span>1一星</span>&nbsp;&nbsp;
                <span>2二星</span>&nbsp;&nbsp;
                <span>3三星</span>&nbsp;&nbsp;
                <span>4四星</span>&nbsp;&nbsp;
                <span>5五星</span>&nbsp;&nbsp;
                <span>9其他</span>
                <br>

                <el-form-item
                  label="单位负责人"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="统计负责人"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable
                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="填表人"
                >
                  <el-input
                  disabled
                  value="设计院"
                  />
                </el-form-item>
                <el-form-item
                  label="联系电话"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable
                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="报出日期"
                >
                  <el-date-picker
                    v-model="value2"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <br>
                <span>说明:1.报表单位:股份公司所属各二级法人单位。</span><br>
                <span>2.报送时间及方式:次年3月15日前完成网上填报;3月31日前完成书面资料报送</span><br>
                <span>3.本表涉及的填报目录:《国民经济行业目录及代码》(GB/T 4754-2011)、2012年《统计用区划代码》和《建筑业企业资质等级编码》。</span><br>
                <span>4.数据审核、处理要求:"192从业人员"和"193企业主要经济指标"等指标数据由二级单位向同级相关部门取得后填写</span><br>
              </el-form>
            </div>
        </div>

      </el-tab-pane>
      <el-tab-pane label="生产情况NB2-1表">
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

                v-model="detailform.topInfor.inforName"/>
            </el-form-item>
            <el-form-item
              label="上年结转合同额(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="本年新签合同额(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
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

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="自行完成施工产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="分包出去工程的产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="从建设单位以外承揽工程完成的产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <p  class="detail-title" style="overflow: hidden;margin-right:30px">
            <span>三、企业总产值</span>
            </p>
            <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                <span>(一)、施工产值(万元): <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/> </span>
            </p>
            <el-form-item
              label="其中:装饰装修产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="其中:在外省完成的产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <p  class="detail-title" style="overflow: hidden;margin-right:30px">
            <span>1、按构成分</span>
            </p>
            <el-form-item
              label="建筑工程产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="安装工程产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>

            <el-form-item
              label="设备工器具产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="其他产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>

            <p  class="detail-title" style="overflow: hidden;margin-right:30px">
              <span>2、按类别分</span>
            </p>
            <el-form-item
              label="铁路(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="公路(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>

            <el-form-item
              label="房建(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="市政(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>

            <el-form-item
              label="城轨(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>

            <el-form-item
              label="水利(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>

            <el-form-item
              label="电力(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>

            <el-form-item
              label="机场(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>

            <el-form-item
              label="矿山(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>

            <el-form-item
              label="港口与航道(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>

            <el-form-item
              label="其它(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>

            <p  class="detail-title" style="overflow: hidden;margin-right:30px">
              <span>3、按地域分</span>
            </p>
            <el-form-item
              label="北京市(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="天津市(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="河北省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="山西省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="内蒙古自治区(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="辽宁省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="吉林省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="黑龙江省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="上海市(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="江苏省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="浙江省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="安徽省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="福建省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="江西省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="山东省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="河南省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="湖北省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="湖南省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="广东省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="广西壮族自治区(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="海南省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="重庆市(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="四川省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="贵州省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="云南省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="西藏自治区(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="陕西省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="甘肃省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="青海省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="宁夏(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="新疆(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="澳门(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="台湾省(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="香港(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="海外(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>

            <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                <span>(二)、勘察设计咨询产值: <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/> </span>
            </p>

            <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                <span>(三)、工业产值: <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/> </span>
            </p>

            <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                <span>(四)、物资贸易产值: <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/> </span>
            </p>

            <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                <span>(五)、房地产收入: <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/> </span>
            </p>

            <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                <span>(六)、金融与保险: <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/> </span>
            </p>

            <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                <span>(七)、运营维管收入: <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/> </span>
            </p>

            <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                <span>(八)、其它营业收入: <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/> </span>
            </p>

            <p  class="detail-title" style="overflow: hidden;margin-right:30px">
              <span>四、竣工产值</span>
            </p>
            <el-form-item
              label="竣工产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <p  class="detail-title" style="overflow: hidden;margin-right:30px">
              <span>五、房屋施工面积</span>
            </p>
            <el-form-item
              label="房屋施工面积(平方米):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="其中:本年新开工面积(平方米):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="其中:实行投标承包面积(平方米):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
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

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="木材*(立方米):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="平板玻璃*(平方米):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="平板玻璃*(平方米):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="平板玻璃*(重量箱):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="铝材*(吨):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
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

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="木材*(万元):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="水泥*(万元):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="平板玻璃*(万元):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="铝材*(万元):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
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

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="期末人数(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="其中:工程技术人员(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="其中:一级建造师(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="其中:现场施工人员*(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="其中:持证上岗人员*(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
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

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="其中:施工机械设备总台数(台):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="总功率*(千瓦):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="其中:施工机械设备总功率(千瓦):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="净值*(万元):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="其中:施工机械设备净值(万元):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="生产情况NB2-1表(境内)">
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
              label="签订的合同额小计(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforName"/>
            </el-form-item>
            <el-form-item
              label="上年结转合同额(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="本年新签合同额(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
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

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="自行完成施工产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="分包出去工程的产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="从建设单位以外承揽工程完成的产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                <span>三、企业总产值 </span>
            </p>
            <p  class="detail-title" style="overflow: hidden;margin-right:30px">
              <span>(一)、施工产值(万元): <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable
                v-model="detailform.topInfor.inforNameForeign"/></span>
            </p>
            <el-form-item
              label="其中:装饰装修产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="其中:在外省完成的产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <p  class="detail-title" style="overflow: hidden;margin-right:30px">
              <span>1、按构成分</span>
            </p>
            <el-form-item
              label="建筑工程产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="安装工程产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>

            <el-form-item
              label="设备工器具产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="其他产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>

          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="实物量NB2-2表">
        <div style="margin-top: 10px; margin-left: 10px">
          <el-table
            class="tableStyle"
            :max-height="$tableHeight"
            :height="$tableHeight"
            :data="data"
            :header-cell-style="{
          'text-align': 'center',
          'background-color': 'whitesmoke'
        }"
            border
            highlight-current-row
            ref="table"
            style="width: 100%"
            cell-style="padding:5px 0"
            tooltip-effect="dark"
          >
            <el-table-column
              :width="50"
              align="center"
              label="序号"
              show-overflow-tooltip
              type="index"
            ></el-table-column>
            <el-table-column
              :width="250"
              align="left"
              label="统计项名称"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div :class="vnameMarginLeft(scope.row.tjxCode,scope.row.veditable)">{{scope.row.tjxName}}</div>
              </template>
            </el-table-column>
            <el-table-column
              :width="90"
              align="center"
              prop="jldw"
              label="计量单位"
              show-overflow-tooltip
            >
            </el-table-column>

            <el-table-column
              :width="150"
              align="center"
              label="本年实际"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div v-if="scope.row.veditable === '1' && scope.row.venabled === '1' && projectStatus !== '1' ">
                  <el-input v-model="scope.row.value" @input="scope.row.value = scope.row.value.replace(/[^\-?\d.]/g,'','')"/>
                </div>
                <div v-else-if="projectStatus !== '1' " style="text-align: right">{{sonCount(scope.row)}}</div>
                <div v-else>{{scope.row.value}}</div>
              </template>
            </el-table-column>
            <el-table-column
              :width="400"
              align="center"
              label=""
            ></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="房屋建筑NB2-3表">
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
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">1、住宅房屋：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">（1）商厦房屋（批发和零售用房）：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">（2）宾馆用房屋（住宿用房）：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">（3）餐饮用房屋（餐饮用房）：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">（4）商务会展用房屋：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">（5）其他商业及服务用房屋（居民服务业用房）：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">3、办公用房屋：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">4、科研、教育、医疗用房屋：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">（1）科学研究用房屋：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">（2）教育用房屋：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">（3）医疗用房屋（卫生医疗用房）：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">5、文化、体育、娱乐用房屋：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">6、厂房及建筑物：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">其中：厂房：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">7、仓库：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">8、其他未列明的房屋建筑物：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">9、铁路工程：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>

            <div class="row-four">
              <div class="four-name">11、公路工程：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">12、城市轨道：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">13、市政工程：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">14、电力工程：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">15、水利工程：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">16、机场工程：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">17、矿山工程：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">18、港口与航道工程：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">19、其它工程：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="房屋建筑NB2-3表(境内)">
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
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">1、住宅房屋：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">（1）商厦房屋（批发和零售用房）：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">（2）宾馆用房屋（住宿用房）：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">（3）餐饮用房屋（餐饮用房）：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">（4）商务会展用房屋：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">（5）其他商业及服务用房屋（居民服务业用房）：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">3、办公用房屋：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">4、科研、教育、医疗用房屋：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">（1）科学研究用房屋：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">（2）教育用房屋：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">（3）医疗用房屋（卫生医疗用房）：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">5、文化、体育、娱乐用房屋：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">6、厂房及建筑物：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">其中：厂房：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">7、仓库：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">8、其他未列明的房屋建筑物：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">9、铁路工程：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">11、公路工程：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">12、城市轨道：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">13、市政工程：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">14、电力工程：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">15、水利工程：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">16、机场工程：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">17、矿山工程：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">18、港口与航道工程：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
            <div class="row-four">
              <div class="four-name">19、其它工程：</div>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="从业人员NB2-4表">
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
                label="(一)从业人员期末人数小计(人): "
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="其中：女性(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>

              <el-form-item
                label="其中：非全日制(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
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

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="劳务派遣人员(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="其他从业人员(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>

              <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                <span>按职业类型分 </span>
              </p>
              <el-form-item
                label="中层及以上管理人员(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="专业技术人员(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="办事人员和有关人员(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>

              <el-form-item
                label="商业、服务业人员(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="生产、运输设备操作人员及有关人员(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>

              <el-form-item
                label="(二)从业人员平均人数:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>

              <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                <span>按人员类型分</span>
              </p>
              <el-form-item
                label="在岗职工(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="劳务派遣人员(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="其它从业人员(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>

              <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                <span>按职业类型分</span>
              </p>
              <el-form-item
                label="中层及以上管理人员(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="专业技术人员(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>

              <el-form-item
                label="办事人员和有关人员(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="商业、服务业人员(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="生产、运输设备操作人员及有关人员(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
            </div>
            <div class="row-three">
              <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                <span>二﹑工资</span>
              </p>


              <el-form-item
                label="(一)从业人员工资总额小计(千元):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>

              <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                <span>按人员类型分</span>
              </p>
              <el-form-item
                label="在岗职工小计(千元):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>

              <el-form-item
                label="基本工资(千元):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>

              <el-form-item
                label="绩效工资(千元):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="工资性津贴和补贴(千元):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="其他工资(千元):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="劳务派遣人员(千元):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="其他从业人员(千元):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>

              <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                <span>按职业类型分</span>
              </p>
              <el-form-item
                label="中层及以上管理人员(千元):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="专业技术人员(千元):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="办事人员和有关人员(千元):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>

              <el-form-item
                label="商业、服务业人员(千元):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>

              <el-form-item
                label="生产、运输设备操作人员及有关人员(千元):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="其他板块NB4表">
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
                <span>工业制造板块(万元)</span>
              </p>
              <el-form-item
                label="工业总产值: "
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="其中：境外:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>

              <el-form-item
                label="*其中：新产品产值:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="*其中：现场制梁产值:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="工业销售产值:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="企业提取技术开发费:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>

              <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                <span>物资贸易产值板块(万元)</span>
              </p>
              <el-form-item
                label="物资贸易产值:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="其中:境外:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="物资贸易收入:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>

              <el-form-item
                label="其中:采购成本:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="工程物流收入:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="其中:采购成本:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="其它收入:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
            </div>
            <div class="row-three">
              <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                <span>房地产板块(万元)</span>
              </p>

              <el-form-item
                label="房地产收入:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>

              <el-form-item
                label="其中:境外:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="销售金额:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>

              <el-form-item
                label="净利润:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>

                <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                  <span>其他产值板块(万元)</span>
                </p>
              <el-form-item
                label="其中:境外:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="租赁收入:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="住宿餐饮收入:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="物业管理收入:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>

              <el-form-item
                label="金融保险收入:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="运营维管收入:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="其它营业收入:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="勘察设计NB5表">
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
              <span>一、产值情况</span>
            </p>
            <el-form-item
              label="企业总产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforName"/>
            </el-form-item>

            <el-form-item
              label="其中:境外(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforName"/>
            </el-form-item>
            <el-form-item
              label="勘察设计产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforName"/>
            </el-form-item>
            <el-form-item
              label="其中:"
            >
              <el-form-item
                label="*1.建设项目产值(万元):"
              >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforName"/>
              </el-form-item>
              <el-form-item
                label="*2.三大部类产值(万元):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>
            </el-form-item>

            <el-form-item
              label="技术咨询与技术转让产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforName"/>
            </el-form-item>

            <el-form-item
              label="勘察设计延伸经营产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforName"/>
            </el-form-item>
            <el-form-item
              label="工程承包产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforName"/>
            </el-form-item>
            <el-form-item
              label="其它产值(万元):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforName"/>
            </el-form-item>

              <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                <span>三﹑主要实物工程量完成情况</span>
              </p>
              <el-form-item
                label="工程地质(实钻米):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>

              <el-form-item
                label="水文地质(实钻米):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="工程物探(标准点):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="预可行性研究铁路正线(公里):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>

              <el-form-item
                label="初测铁路正线(公里):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="可行性研究铁路正线(公里):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="定测铁路正线(公里):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="初步设计铁路正线(公里):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="补充定测铁路正线(公里):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="施工图铁路正线(公里):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="线路折算公里(折算公里):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>

            </div>
            <div class="row-three">
              <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                <span>二﹑人员情况</span>
              </p>
              <el-form-item
                label="(一)从业人员年末人数(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>

              <el-form-item
                label="其中：在岗职工(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="聘用人员(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="临时人员(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>

              <el-form-item
                label="(二)专业技术人员年末人数(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>


              <el-form-item
                label="其中：高级职称人员(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="中级职称人员(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="初级职称人员(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="其他人员(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>

              <el-form-item
                label="(三)生产人员年末人数(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>


              <el-form-item
                label="其中：勘察生产人员(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="设计生产人员(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="工程监理人员(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="其他人员(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>

              <el-form-item
                label="(四)注册执业人员年末人次数(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>


              <el-form-item
                label="其中：一级注册建筑师(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="二级注册建筑师(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="一级注册结构工程师(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
              label="二级注册结构工程师(人):"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
              <el-form-item
                label="其他注册工程师(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="其他注册人员(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="(五)从业人员平均人数(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <el-form-item
                label="其中:勘察设计平均人数(人):"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
            </div>
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
          topInfor: {
            marketSecondId:'',
            constructionOrg:''
          },
          topInfoOrg: {},
          topInfoSiteList: [],
          topInfoSectionList: [],
          value1: [],
          value2: '',
          zplx:[],//装配类型
          jzlx:[],//建筑类型
          jzjglx:[],//建筑结构类型
          cdmc:[],//场地名称
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
          url="/api/contract/topInfo/TopInfor/detail/saveOrUpdate"
        }else{
          url="/api/contract/topInfo/TopInfor/process/start"
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
          .post("/api/contract/topInfo/TopInfor/detail/entityInfo", {topOrgId:this.id})
          .then((res) => {
          var datas=res.data.data;
        this.getTwo(datas.topInfor.enginTypeFirstId||'');
        this.getTwoSC(datas.topInfor.marketFirstNameId||'');
        this.getTwoXZ(datas.topInfor.projectNatureFirstId||'');
        this.detailform={
          topInfor: datas.topInfor,
          topInfoOrg: datas.topInfoOrg,
          topInfoSiteList: datas.topInfoSiteList,
          topInfoSectionList: datas.topInfoSectionList,
          value1:[],
          zplx:[],//装配类型
          jzlx:[],//建筑类型
          jzjglx:[],//建筑结构类型
          cdmc:[],//场地名称
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
      .el-button -primary {
        background: #5c8bfa;
      }
      .el-button -default {
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

  >>>.el-input -mini .el-input__inner {
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

  .neirong >>>.el-input -mini .el-input__inner {
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

  .el-button -mini,
  .el-button -mini.is-round {
    margin: 0 27px 5px 0;
  }

  .el-table -border {
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
  .queryForm >>>.el-input -mini .el-input__inner{
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

