<template>
  <div class="container">
    <div class="dashboard">
        CDN文件
    </div>
    <!-- <div class="search-wrapper">
      <el-input
        placeholder="请输入内容"
        @keyup.enter.native="search"
        v-model="keyword">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div> -->
    <ul>
      <li v-for="(item, index) in fileList" :key="index">
          <el-card>
            <p :id="item.key.replace(/\./g,'')" :title="domain + item.key">{{domain + item.key}}</p>
            <el-button class="clipboard-btn" type="success" plain circle icon="el-icon-document" data-clipboard-action="copy" :data-clipboard-target="'#'+item.key.replace(/\./g,'')"></el-button>
          </el-card>
      </li>
    </ul>
    <button class="upload-btn" @click="isUploadFile = true"><i class="el-icon-plus"></i></button>
    <el-dialog
      title="添加文件"
      :visible.sync="isUploadFile"
      width="60%">
      <div>
        <el-input placeholder="输入文件名称" v-model="fileName" clearable>
          <template slot="prepend">{{prefix}}</template>
        </el-input>
        <el-upload
          class="upload-wrapper"
          ref="upload"
          :action="action"
          :file-list="uploadFileList"
          :data="params"
          :multiple="false"
          :on-change="onChange"
          :on-success="onSuccess"
          :on-error="onError"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        </el-upload>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Clipboard from 'clipboard'
  import SystemAPI from '@/api/system'
  export default {
    data () {
      return {
        domain: 'https://public.myutopa.com/',
        action: 'http://120.76.73.203:2001/ura/qiniu/file/upload',
        fileList: [],
        uploadFileList: [],
        isUploadFile: false,
        prefix: 'h5.cdn.',
        fileName: '',
        keyword: ''
      }
    },
    components: {Clipboard},
    mounted() {
      this.getFileList()
      /* eslint-disable no-new */
      new Clipboard('.clipboard-btn')
    },
    computed: {
      params () {
        return {key: this.prefix + this.fileName}
      }
    },
    methods: {
      getFileList () {
        SystemAPI.list().then(response => {
          if (response.code === 0) {
            this.fileList = response.data.list.items
          }
        })
      },
      search () {
        SystemAPI.search(this.keyword).then(response => {
          if (response.code === 0) {
            this.fileList = response.data.list.items
          }
        })
      },
      onChange (file) {
        this.fileName = file && file.name
      },
      onSuccess (response) {
        if (response.code === 0) {
          this.$message({
            message: '上传成功',
            title: null,
            duration: 800
          })
          this.$refs.upload.clearFiles()
          this.fileName = ''
          this.uploadFileList = []
          setTimeout(() => {
            this.isUploadFile = false
            this.getFileList()
          }, 1200)
        }
      },
      onError () {
        this.$message({
          message: '上传失败',
          title: null,
          duration: 800
        })
      },
      submitUpload() {
        if (!this.fileName) {
         return this.$message({
            message: '文件名称不能为空',
            title: null,
            duration: 800
          })
        }
        this.$refs.upload.submit()
      }
    }
  }
</script>

<style scoped>
body{
  font-size: 14px;
}
.container{
  width: 60%;
  margin: 0 auto;
}
.dashboard{
  padding: 1.125rem .75rem;
  font-size: 1.25rem;
  color: #ffffff;
  background-color: hsla(0, 85%, 57%, 0.925);;
  text-align: center;
}
.search-wrapper{
  width: 80%;
  margin: .625rem auto;
}
ul,li{
  list-style: none;
  margin: 0;
  padding: 0;
  color: darkgray;
}
ul{
  padding: .3125rem;
  margin-top: .9375rem;
}
li {
  margin-top: .3125rem
}
.el-card{
  position: relative;
}
.el-card p {
  font-size: 1rem;
  color: #999;
  text-shadow: 6px 14px 5px #eee;
  margin: 0;
  padding: 0;
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.el-card .el-button{
  position: absolute;
  right: .625rem;
  top: 50%;
  transform: translateY(-50%);
}
.upload-btn{
  position: fixed;
  right: 10%;
  bottom: 1.875rem;
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 100%;
  background-color: hsla(0, 85%, 57%, 0.925);
  font-size: 1.25rem;
  border: 1px solid hsla(0, 85%, 57%, 0.925);
  color: #ffffff;
  cursor: pointer;
  /* box-shadow: .0625rem 0 .3125rem hsla(0, 85%, 57%, 0.925) */
}
.upload-btn:focus, .upload-btn:active{
  outline: none;
}
.upload-wrapper{
  margin-top: .9375rem;
}
</style>
