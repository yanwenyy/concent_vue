<!--
 文书组件，actpoint: look 查看，不显示操作类按钮，如上传，删除，生成等；edit 编辑 显示全部功能按钮
          build: 显示生成按钮
          imp: 显示导入按钮
          upload: 显示上传按钮
          typecode: 同一个功能如果有多个附件的情况，如底稿分为底稿正文和证据两个部分，默认是0，前端控制
          title: 标题，默认为附件列表
          instid: 必须，文件对应实体id
          projectid: 根据projectid下载文件
 -->
<template>
  <div>
    <el-row style="margin-top: 10px; margin-bottom: 10px;">
      <el-col :span="24">
        <div style="border-radius: 10px; margin:0 auto; height:40px; line-height: 40px;">
          <span
            style="font-family: Microsoft YaHei; font-weight: bold; margin-left: 20px; "
          >{{lc_title}}</span>
          <div style="float: right; margin-right:40px;">
            <!-- <el-button
              @click="handleBuild"
              class="el-icon-finished icon-cursor"
              size="mini"
              title="按模板生成"
              type="primary"
              v-if="lc_build && lc_actpoint==='edit'"
            >{{lc_sctitle}}</el-button>
            <el-button
              @click="selgxzl"
              class="el-icon-folder-checked icon-cursor"
              size="mini"
              title="选择共享资料"
              type="primary"
              v-if="lc_gxzl==='ok' && lc_actpoint==='edit'"
            >选择共享资料</el-button>
            <el-button
              @click="handleImp"
              class="el-icon-folder-checked icon-cursor impBtn"
              size="mini"
              title="导入"
              type="primary"
              v-if="lc_imp && lc_actpoint==='edit'"
            >导入</el-button>-->
            <el-button
              @click="handleUpload"
              class="el-icon-upload2 icon-cursor"
              size="mini"
              title="上传"
              type="primary"
              v-if="lc_upload && lc_actpoint==='edit'"
            >上传</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <template v-for="rowdata in this.data">
      <el-row class="file-style content-style" v-bind:key="rowdata.id" v-if="!lc_imp">
        <el-col :offset="1" :span="21">
          <el-col :span="18" style="text-align:left;">
            <span>
              文档名称 ：
              {{rowdata.filename}}
            </span>
            <span v-if="rowdata.createtime">--{{rowdata.createtime | dateformat}}</span>
          </el-col>
          <el-col :span="6">
            <el-button @click="download(rowdata)" size="mini">
              <i class="el-icon-download icon-cursor">下载</i>
            </el-button>
            <el-button @click="del(rowdata)" size="mini" v-if="lc_actpoint==='edit'">
              <i class="el-icon-delete icon-cursor">删除</i>
            </el-button>
          </el-col>
        </el-col>
      </el-row>
    </template>

    <el-dialog :append-to-body='true'
      :before-close="beforeClose"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
      :modal="true"
      :visible.sync="uploadvisible"
      @opened="opened"
      title="文件上传"
      v-loading="loading"
      width="25%"
    >
      <el-upload
        :accept="lc_accept.toString()"
        :action="getUploadUrl()"
        :before-upload="beforeUpload"
        :data="{uploadData:uploadData}"
        :fileList="upfileList"
        :multiple="multiple"
        :on-error="error"
        :on-preview="uppic"
        :on-progress="progress"
        :on-remove="del"
        :on-success="success"
      >
        <el-button
          ref="uploadbutton"
          size="small"
          slot="trigger"
          type="primary"
          v-show="showupbtn"
        >点击上传</el-button>
      </el-upload>
    </el-dialog>

    <el-dialog :append-to-body='true'  :visible.sync="dialogVisible" title="共享资料" width="900px">
      <el-table
        :data="filterList"
        :tree-props="{children: 'filechildren', hasChildren: 'hasChildren'}"
        @selection-change="handleSelectionChange"
        border
        default-expand-all
        row-key="value"
        style="width: 100%;margin-bottom: 20px;"
      >
        <el-table-column :selectable="checkboxd" :width="40" align="center" type="selection"></el-table-column>
        <!-- <el-table-column label="项目共享资料" prop="label"></el-table-column> -->
        <el-table-column>
          <template slot="header">
            <el-input placeholder="输入关键字搜索" size="mini" v-model="search" />
          </template>
          <template slot-scope="scope">{{scope.row.label}}</template>
        </el-table-column>
        <el-table-column label="资料类型" prop="filesource"></el-table-column>
      </el-table>
      <span class="dialog-footer" slot="footer">
        <el-button @click="closelist">取 消</el-button>
        <el-button @click="surelist" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :append-to-body='true'
      :destroy-on-close="true"
      :lock-scroll="true"
      :visible.sync="pdfVisible"
      @open="open"
      class="pdf_dialog"
      v-loading="loading"
      width="900px"
    >
      <template slot="title">
        <div style="width:22px;height:22px;float:left" v-if="showpdf">
          <img src="@/assets/image/fileicon/pdf.jpg" style="width:100%" />
        </div>
        <div style="float:left;margin-left:5px;">{{pdfTitle}}</div>
      </template>
      <embed :src="pdfsrc" height="100%" type="application/pdf" width="100%" />
    </el-dialog>
    <el-dialog :append-to-body='true'  :visible.sync="picshow">
      <img :src="dialogImageUrl" alt width="100%" />
      <span class="dialog-footer" slot="footer"></span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  // actpoint edit:编辑 look:查看
  props: [
    "actpoint",
    "instid",
    "typecode",
    "title",
    "build",
    "sctitle",
    "imp",
    "upload",
    "urlparam",
    "gxzl",
    "projectid",
    "name",
    "accept"
  ],
  data() {
    return {
      uploadData: "",
      showupbtn: false,
      headers: "",
      showpdf: true,
      search: "",
      picshow: false,
      dialogImageUrl: "",
      loading: false,
      uploadvisible: false,
      dialogVisible: false,
      pdfVisible: false,
      action: "upload/operate",
      multiple: false,
      dialog: true,
      gxzllist: [],
      filterList: [],
      selgxzllist: [],
      lc_sctitle: this.sctitle,
      lc_gxzl: this.gxzl,
      lc_actpoint: this.actpoint,
      lc_instid: this.instid,
      lc_typecode: this.typecode,
      lc_accept: this.accept,
      // lc_limit:this.limit,
      lc_typecodes: "",
      lc_title: this.title,
      lc_urlparam: this.urlparam,
      lc_imp: this.imp,
      lc_upload: this.upload,
      lc_build: this.build,
      lc_name: this.name,
      fileid: [],
      data: [],
      pdfsrc: "",
      pdfTitle: "",
      successloading: true,
      upfileList: []
    };
  },
  computed: {
    // lc_instid: function() {
    //   return this.instid
    // }
  },
  watch: {
    lc_instid: function() {
      this.getData();
    },
    search: function(val) {
      this.getgxzllist(val);
    },
    actpoint: function(val) {
      this.lc_actpoint = val;
    }
  },
  methods: {
    beforepic(file) {
      console.log(file);
    },

    getUploadUrl() {
      return "/api" + this.$route.path + this.lc_urlparam + this.action;
    },

    open() {
      this.loading = true;
      let _self = this;
      setTimeout(function() {
        _self.loading = false;
      }, 2000);
    },

    handleBuild() {
      this.$http
        .post("/api" + this.$route.path + "file/build", {
          instid: this.lc_instid,
          typecode: this.lc_typecode
        })
        .then(res => {
          if (res.data.code === 0) this.getData();
        });
    },

   convertImgToBase64(imgUrl) {
      window.URL = window.URL || window.webkitURL;
      var xhr = new XMLHttpRequest();
      xhr.open("get", imgUrl, true); // 至关重要
      xhr.responseType = "blob";
      var that = this;
      xhr.onload = function() {
        if (this.status === 200) {
          var blob = this.response;
          console.log("blob", blob); // 至关重要
          let oFileReader = new FileReader();

          oFileReader.onloadend = function(e) {
            let base64 = e.target.result;
            const h = that.$createElement;
            that
              .$msgbox({
                title: "图片预览",
                message: h(
                  "p",
                  { style: "max-height:600px;overflow:scroll;" },
                  [
                    h(
                      "img",
                      {
                        attrs: {
                          src: base64
                        }
                      },
                      null
                    )
                  ]
                ),
                confirmButtonText: "确定"
              })
              .then(action => {});
          };
          oFileReader.readAsDataURL(blob);
          var img = document.createElement("img");
          img.onload = function(e) {
            window.URL.revokeObjectURL(img.src); // 清除释放
          };
          let src = window.URL.createObjectURL(blob);
          img.src = src;
        }
      };
      xhr.send();
    },

   picShow(file) {
      var project =
        this.projectid === undefined
          ? sessionStorage.getItem("curProjectId")
          : this.projectid;
      this.pdfsrc =
        "/api" +
        this.$route.path +
        this.lc_urlparam +
        "file/show?fileid=" +
        file.showid +
        "&projectid=" +
        project;
      // this.$http.post(this.pdfsrc).then(res => {
      // let imageUrl = URL.createObjectURL(this.pdfsrc)
      this.convertImgToBase64(this.pdfsrc);
      // })
    },

    uppic(file) {
      let picaccept = [".jpg", ".jpeg", ".png"];
      let imageUrl = URL.createObjectURL(file.raw);
      picaccept.forEach(element => {
        if (file.name.lastIndexOf(element) > 0) {
          const h = this.$createElement;
          this.$msgbox({
            title: "图片预览",
            message: h("p", null, [
              h(
                "img",
                {
                  attrs: {
                    src: imageUrl
                  }
                },
                null
              )
            ]),
            confirmButtonText: "确定"
          }).then(action => {});
        }
      });
    },

    beforeUpload(file) {
      let isaccept = false;
      this.lc_accept.forEach(element => {
        if (file.name.lastIndexOf(element) > 0) {
          isaccept = true;
        }
      });
      //  if(this.lc_limit===1&&this.data.length>0){
      //      this.$message.error("只能上传一个文件，请删除后再上传")
      //      isaccept  =false
      //      return
      // }
      if (!isaccept) {
        this.$message.error("文件格式不允许上传:" + file.name);
        return false;
      }
      // todo 后台取
      isaccept = file.size / 1024 / 1024 < 100;
      if (!isaccept) {
        this.$message.error("上传文件大小不能超过 100MB!");
        return false;
      }

      return isaccept;
    },


   handleUpload() {
      this.uploadvisible = true;
      this.action = "upload/operate";
      this.multiple = true;
    },

  handleImp() {
      this.uploadvisible = true;
      this.action = "imp";
      this.multiple = false;
    },

  selgxzl() {
      this.dialogVisible = true;
      this.getgxzllist();
    },

  closelist() {
      this.dialogVisible = false;
      this.getData();
    },

  checkboxd(val) {
      if (val.showdelete === false) {
        return false;
      } else {
        return true;
      }
    },

  surelist() {
      this.fileid = [];
      this.selgxzllist.forEach(item => {
        this.fileid.push(item.value);
      });
      this.$http
        .post("/api" + this.$route.path + "projectfile/todraft", {
          draftid: this.lc_instid,
          fileid: this.fileid.join(","),
          typecode: 2
        })
        .then(res => {
          if (res.data.code === 0) {
            this.$message({ message: "引用成功", type: "success" });
            this.getgxzllist();
            this.getData();
          }
        });
      this.closelist();
    },
    handleSelectionChange(val) {
      this.selgxzllist = val;
    },

  getgxzllist(val) {
      this.$http
        .post("/api" + this.$route.path + "projectfile", {
          projectid: this.projectid || sessionStorage.getItem("curProjectId")
        })
        .then(res => {
          if (res.data.code === 0) {
            this.filterList = res.data.data.filetree;
            if (val) {
              this.filterList.forEach(item => {
                for (var i = item.filechildren.length - 1; i >= 0; i--) {
                  if (item.filechildren[i].label.indexOf(val) > -1) {
                  } else {
                    item.filechildren.splice(i, 1);
                  }
                }
              });
            }
          }
        });
    },
    opened() {
      // if(this.lc_typecode=='1,2'){
      //   this.lc_typecode = 1
      // }
      this.uploadData = JSON.stringify({
        applyid: localStorage.getItem("sbuuid"),
        type: this.lc_typecode,
        name: this.lc_name,
        value2: localStorage.getItem("value2")
      });
      var isFirefox = navigator.userAgent.indexOf("Firefox") > -1;
      if (!isFirefox) {
        this.showupbtn = false;
        this.$refs.uploadbutton.$el.click();
      } else {
        this.showupbtn = true;
      }
    },

    download(file) {
      var path = file.url;
      window.open(path);

      // this.$http
      //   .post(
      //     '/api' + this.$route.path + this.lc_urlparam + 'file/download',
      //     {
      //       fileid: file.uuid
      //     },
      //     { responseType: 'blob' }
      //   )
      //   .then(res => {
      //     var blob = new Blob([res.data])
      //     if (window.navigator.msSaveOrOpenBlob) {
      //       // 兼容IE10
      //       navigator.msSaveBlob(blob, file.filename)
      //     } else {
      //       var downloadElement = document.createElement('a')
      //       var href = window.URL.createObjectURL(blob) // 创建下载的链接
      //       downloadElement.href = href
      //       downloadElement.download = file.filename // 下载后文件名
      //       document.body.appendChild(downloadElement)
      //       downloadElement.click() // 点击下载
      //       document.body.removeChild(downloadElement) // 下载完成移除万元素
      //       window.URL.revokeObjectURL(href) // 释放掉blob对象
      //     }
      //   })
    },
    pdfShow(file, ispdf) {
      this.showpdf = ispdf;
      this.pdfVisible = true;
      this.pdfsrc = "http://aa.dev.com:8081/" + file.url;
      this.pdfTitle = file.filename;
    },
    del(file) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post("/api" + this.$route.path + this.lc_urlparam + "delete", {
              uuid: file.uuid
            })
            .then(res => {
              if (res.data.code === 0) {
                this.$message({ message: "删除成功", type: "success" });
                this.getData();
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getData() {
      if (this.lc_instid === null) {
        return;
      }
      this.$http
        .post("/api" + this.$route.path + this.lc_urlparam + "list/query", {
          value2: localStorage.getItem("value2"),
          name: this.lc_name,
          // applyid: this.lc_instid,
          applyid: localStorage.getItem("sbuuid"),
          type: this.lc_typecode
        })
        .then(res => {
          if (res.data.code === 0) this.data = res.data.data;
          this.$emit("getfiledata", this.data);
        });
    },
    progress(event, file, fileList) {
      this.upfileList = fileList;
      this.successloading = false;
    },

    success(response, file, fileList) {
      if (response.code === 0) {
        this.successloading = true;
        this.$message({ message: file.name + "上传完毕", type: "success" });
        this.$emit("upfiledata", response);
      } else if (response.code === -3) {
        this.successloading = true;
        var message = "";
        response.data.forEach(item => {
          message += item.message + "<br/>";
        });
        this.$message({
          showClose: true,
          dangerouslyUseHTMLString: true,
          duration: 0,
          message: "<p>" + message + "</p>",
          type: "error"
        });
      } else {
        this.successloading = true;
        this.$message({ message: file.name + "上传失败", type: "error" });
      }
    },
    error(e, file, fileList) {
      this.successloading = true;
      this.$message({ message: file.name + "上传失败", type: "error" });
    },
    beforeClose(done) {
      console.log(this.upfileList);
      if (this.successloading === false && this.upfileList.length !== 0) {
        this.$message({ message: "请等待文件上传完毕后关闭", type: "error" });
        return;
      }
      this.getData();
      this.successloading = false;
      this.upfileList = [];
      done();
    }
  },
  mounted() {
    this.headers = { "Content-Type": "multipart/form-data" };
    if (!this.lc_gxzl) this.lc_gxzl = "";
    if (!this.lc_urlparam) this.lc_urlparam = "";
    // if (!this.lc_limit) this.lc_limit = 10
    if (!this.lc_title) this.lc_title = "附件列表";
    if (!this.lc_sctitle) this.lc_sctitle = "模板生成";
    if (!this.lc_build) this.lc_build = false;
    if (!this.lc_imp) this.lc_imp = false;
    if (!this.lc_upload) this.lc_upload = false;
    if (!this.lc_name) this.lc_name = "";
    if (!this.lc_actpoint) this.lc_actpoint = "look";
    if (!this.lc_typecode) this.lc_typecode = 0;
    if (this.lc_typecode === "1,2") {
      this.lc_typecodes = 1;
    }
    if (!this.lc_accept) {
      this.lc_accept = [
        // todo 后台取
        ".jpg",
        ".jpeg",
        ".png",
        ".doc",
        ".docx",
        ".xls",
        ".xlsx",
        ".ppt",
        ".pptx",
        ".pdf"
      ];
    }
    // this.lc_typecode = this.lc_typecode.length > 1 ? 1 : this.lc_typecode
    this.getData();
  }
};
</script>

<style>
.icon-cursor {
  margin-left: 0;
}
.pdf_dialog {
  display: flex;
  justify-content: center;
  align-items: Center;
  overflow: hidden;
}
.pdf_dialog .el-dialog {
  margin: 0 auto !important;
  margin-top: 0;
  height: 90%;
  overflow: hidden;
}
.pdf_dialog .el-dialog .el-dialog__body {
  position: absolute;
  left: 0;
  top: 54px;
  bottom: 0;
  right: 0;
  padding: 0;
  z-index: 1;
  overflow: hidden;
}
</style>
