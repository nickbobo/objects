<template>
  <el-row class="enterprise_pager">
    <a :href="item.Url" v-for="(item, index) in list" :key="index">
      <img :src="$apiImgUrl(item.Picture)" @error="defImg()" />
    </a>
  </el-row>
</template>
<script>
import { GetEnterprisePager, GetEnterprisePicture } from "api/position";
export default {
  name: "EnterprisePager",
  data() {
    return {
      resumeStatus: "",
      list: []
    };
  },
  methods: {
    defImg() {
      let img = event.srcElement;
      img.src = "../../../static/img/company_icon.png";
      img.onerror = null; //防止闪图
    },
    GetEnterprisePager() {
      GetEnterprisePager({
        EnterpriseName: "",
        Offset: 0,
        Limit: 10
      }).then(res => {
        if (res.data.Data && res.data.Data.length > 0) {
          this.list = res.data.Data;
        }
        // if (res.data.total > 0) {
        //   // this.list = res.data.rows;
        //   // this.dataInfo = res.data.Data;
        //   // this.GetCompanyInfo(res.data.Data.CompanyId);
        //   // this.PositionSearch(res.data.Data.CompanyId);
        // } else {
        // }
      });
    },
    GetEnterprisePicture() {
      GetEnterprisePicture({
        EnterpriseName: "",
        Offset: 0,
        Limit: 10
      }).then(res => {
        if (res.data.Success) {
          // this.dataInfo = res.data.Data;
          // this.GetCompanyInfo(res.data.Data.CompanyId);
          // this.PositionSearch(res.data.Data.CompanyId);
        } else {
        }
      });
    },
    // getPicture(id) {
    //   return `http://localhost:62116/api/Company/GetEnterprisePicture?FileId=${id}`;//126a6044-4663-4db1-b806-7c3e821efac4
    // },
    onUploadResume() {
      this.uploadLoadingDialog = true;
      setTimeout(() => {
        this.uploadLoadingDialog = false;
        this.uploadOkDialog = true;
      }, 2000);
    },
    onRefreshResume() {}
  },
  mounted() {},
  created() {
    this.GetEnterprisePager();
  }
};
</script>
<style lang="scss"></style>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.enterprise_pager {
  img {
    width: 280px;
    height: 124px;
    margin-bottom: 15px;
    border: 1px dashed #44a8e1;
    background: #fff;
    cursor: pointer;
  }
}
</style>
