<template>
  <el-dialog
    title="疑似重复"
    :visible.sync="isShowResumeReuse"
    class="resume_reuse"
    :modal-append-to-body="false"
    :close-on-click-modal="false"
    @close="$reset('formRef')"
  >
    <el-table :data="reuseResumeList">
      <el-table-column prop="Name" label="姓名" width="180"></el-table-column>
      <el-table-column
        prop="Mobile"
        label="手机号"
        width="180"
      ></el-table-column>
      <!-- <el-table-column prop="Email" label="邮箱" width="180"></el-table-column> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div class="table_operation_but">
            <el-button
              @click="onResumeReuseDetail(scope.row)"
              type="text"
              size="small"
              >详情</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="addResumeVersions(scope.row)"
              >新增版本</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>
<script>
import { AddVersion } from "@/api/resume";
export default {
  name: "resume-preview", //简历预览
  data() {
    return {
      msg: "",
      isShowResumeReuse: false,
      reuseResumeList: []
    };
  },
  // components: {
  //   navbar
  // },
  methods: {
    init(data) {
      this.reuseResumeList = [];
      this.reuseResumeList.push(data);
    },
    /**
     * 疑似重复详细信息   跳到预览页面
     */
    onResumeReuseDetail(datas) {
      console.info(datas); //2baa99a2-cd4a-41e9-8bae-82fab06a46f1
      // this.$store.dispatch("updateAddResumeId", data.Id);
      // this.getBaseInfo();
      // this.editBasicInfoDialog = false;
      // this.isShowResumeReuse = false;
      let id = datas.Data.split(";")[1];
      let data = {
        ResumeId: id,
        PositionId: ""
      };

      let routeData = this.$router.resolve({
        path: "/ResumeDetail",
        query: data
      });
      window.open(routeData.href, "_blank");
    },
    /**
     * 新增版本
     */
    addResumeVersions(datas) {
      console.info(datas);
      let data = {
        personId: datas.Data.split(";")[0],
        resumeId: datas.Data.split(";")[2]
      };
      console.info(data);
      AddVersion(data).then(res => {
        if (res.data.Success) {
          this.isShowResumeReuse = false;
          // this.$message({
          //   showClose: true,
          //   message: "保存成功",
          //   type: "success"
          // });

          this.$Bus.$emit("isUploadSubmit",res.data);
        } else {
          this.$message.error(res.data.Message);
        }
      });
      // this.formData.PersonId = data.PersonId;
      // this.onSave("add");
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang="scss" scoped></style>
