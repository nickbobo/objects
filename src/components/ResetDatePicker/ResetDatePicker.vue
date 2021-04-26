<template>
  <el-date-picker
    v-model="dateTime"
    type="daterange"
    class="data_picker"
    :unlink-panels="true"
    range-separator="-"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    @blur="datePickerChange"
    :picker-options="pickerOptions0"
    @change="onDataPickerChange"
  ></el-date-picker>
</template>
<script>
export default {
  // @change="onDataPickerChange"
  name: "ResetDatePicker", //开始日期,结束日期 封装
  props: ["startTime", "endTime"],
  data() {
    return {
      dateTime: ["", ""],
      startTimes: "",
      endTimes: "",
      pickerOptions0: {
        disabledDate(date) {
          var disabledDay = date.getFullYear();
          //取1950年至今的时间范围.
          return disabledDay <= 1949 || date.valueOf() > Date.now();
        }
      }
    };
  },
  methods: {
    datePickerChange() {
      this.$forceUpdate(); //外部js无效  只对当前组件有效
    },
    onDataPickerChange(dateTime) {
      this.dateTime = dateTime;
      this.$nextTick(() => {
        this.$emit("validata");
      });
    }
  },
  mounted() {
    if(this.startTime!="1")
    this.dateTime = [this.startTime, this.endTime];
    this.startTimes = this.startTime;
    this.endTimes = this.endTime;
  },
  created() { },
  watch: {
    dateTime: {
      handler: function(newValue) {
        let data1 = "";
        let data2 = "";
        if (newValue) {
          if (newValue[0] != "") {
            data1 = this.$Format(newValue[0], "yyyy-MM-dd");
            data2 = this.$Format(newValue[1], "yyyy-MM-dd");
          }
        }
        if(this.startTimes!="1")
        this.$emit("validata");
        this.$emit("update:startTime", data1);
        this.$emit("update:endTime", data2);
      },
      deep: true //要watch一个object需要用deep属性
    }
  }
};
</script>

<style lang="scss"></style>
