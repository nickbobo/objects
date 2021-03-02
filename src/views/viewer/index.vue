<template>
    <div class="viewer">
        <el-form ref="formData" :model="form" label-width="80px">
          <el-form-item label="活动名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

        </el-form>
    </div>
</template>

<script>
export default {
  name: "viewer", //观众登记

  data() {
    return {
      formData: {},
      fileUrl: "",
      showPdf: false,
      contractVisable: false,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.viewer {
  width: 100%;
}
</style>
