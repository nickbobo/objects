<template>
  <div class="position_input">
    <el-select
      filterable
      remote
      reserve-keyword
      placeholder="请选择职位"
      :remote-method="getPositionListByName"
      :loading="positionLoading"
      v-model="positionId"
      @change="onAction($event)"
      @keyup.enter.native="onSearch"
    >
      <el-option
        v-for="items in positionList"
        :key="items.Id"
        :label="items.PositionName"
        :value="items.Id"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import { GetCurCompanyPositionListByCurUser } from "api/positionManager";
export default {
  name: "PositionInput", //职位模糊查询列表
  data() {
    return {
      positionLoading: false,
      positionList: [],
      msg: "",
      positionId: ""
    };
  },
  methods: {
    getPositionListByName(keyVal) {
      GetCurCompanyPositionListByCurUser({ PositionName: keyVal }).then(res => {
        if (res.data.Success) {
          this.positionList = res.data.Data;
        } else {
          this.$message.error(res.data.Message);
        }
      });
    },
    onAction(e) {
      this.$emit("update:deliveryPositionId", this.positionId);
      this.$emit("onsearch");
    },
    onSearch() {
      this.$emit("onsearch");
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang="scss">
.position_input {
  width: 100px;
}
</style>
