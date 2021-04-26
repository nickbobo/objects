<template>
  <section>
    <div class="personal_center_content">
      <img class="userinfo_bg" src="~/static/img/user_bg.png" />

      <div class="userinfo_content">
        <el-tabs v-model="activeTabs.titleComp" v-if="false">
          <el-tab-pane name="basicInfo">
            <transition
              name="fade11"
              enter-active-class="animate__animated animate__fadeInLeft"
              ><div v-if="activeTabs.titleComp">
                {{ activeTabs.title }}
              </div>
            </transition>
          </el-tab-pane>
          <el-tab-pane name="resumeManag"
            ><transition
              name="fade22"
              enter-active-class="animate__animated animate__fadeInLeft"
            >
              <div>
                {{ activeTabs.title }}
              </div>
            </transition></el-tab-pane
          >
          <el-tab-pane name="myFavorite"
            ><transition
              name="fade33"
              enter-active-class="animate__animated animate__fadeInLeft"
            >
              <div>
                {{ activeTabs.title }}
              </div>
            </transition></el-tab-pane
          >
          <el-tab-pane name="deliveredRecord"
            ><transition
              name="fade44"
              enter-active-class="animate__animated animate__fadeInLeft"
            >
              <div>
                {{ activeTabs.title }}
              </div>
            </transition></el-tab-pane
          >
        </el-tabs>
        <el-row class="userinfo_header_name">
          <el-col :span="24">
            <img
              class="user_header"
              :src="my_portrait_url"
              @error="defHeadImg()"
            />
          </el-col>
          <el-col :span="24" class="user_info_name">{{ userInfo.Name }}</el-col>
          <el-col :span="24" class="tabs_list">
            <div
              v-for="(item, index) in tabsList"
              :key="index"
              :class="{ tabls_active: item.active }"
              @click="onTabs(item)"
            >
              <div>{{ item.title }}</div>
              <span class="svg-container" v-if="item.icon">
                <svg-icon icon-class="tik" />
              </span>
              <p v-if="item.num">{{ item.num }}</p>
            </div>
          </el-col>
          <transition
            name="fade"
            enter-active-class="animate__animated animate__fadeInLeft"
          >
            <el-col
              :span="24"
              class="tabs_content"
              v-if="activeTabs.titleComp == 'basicInfo'"
            >
              <basic-info ref="basicInfo"></basic-info>
            </el-col>
          </transition>

          <transition
            name="fade2"
            enter-active-class="animate__animated animate__fadeInLeft"
          >
            <el-col
              :span="24"
              class="resume_manag"
              v-if="activeTabs.titleComp == 'resumeManag'"
            >
              <resume-manag ref="resumeManag"></resume-manag>
            </el-col>
          </transition>
          <transition
            name="fade3"
            enter-active-class="animate__animated animate__fadeInLeft"
          >
            <el-col
              :span="24"
              class="resume_manag"
              v-if="activeTabs.titleComp == 'myFavorite'"
            >
              <my-favorite
                ref="myFavorite"
                :isShowPositionFavouritBut="true"
              ></my-favorite>
            </el-col>
          </transition>
          <transition
            name="fade4"
            enter-active-class="animate__animated animate__fadeInLeft"
          >
            <el-col
              :span="24"
              class="resume_manag"
              v-if="activeTabs.titleComp == 'deliveredRecord'"
            >
              <delivered-record ref="deliveredRecord"></delivered-record>
            </el-col>
          </transition>
        </el-row>
      </div>
    </div>
    <position-component
      ref="positionComponent"
      v-show="false"
    ></position-component>
  </section>
</template>

<script>
import { GetBaseInfo } from "../api/myResume";
import BasicInfo from "../components/Personal/BasicInfo";
import ResumeManag from "../components/Personal/ResumeManag";
import { MyInformation } from "../api/candidate";
import MyFavorite from "../components/Personal/MyFavorite"; /*我的收藏*/
import DeliveredRecord from "../components/Personal/DeliveredRecord";
import { mapGetters } from "vuex";
import PositionComponent from "./PositionComponent";

export default {
  name: "PersonalCenter", //个人中心
  components: {
    BasicInfo,
    ResumeManag,
    MyFavorite,
    DeliveredRecord,
    PositionComponent
  },
  computed: {
    ...mapGetters([
      "position_list",
      "favorite_total",
      "delivered_record_total",
      "my_portrait_url"
    ])
  },

  data() {
    return {
      activeName: "second",
      msg: "",
      userInfo: {},
      activeTabs: {
        title: "基本信息",
        titleComp: "basicInfo",
        active: true,
        icon: true
      },
      tabsList: [
        {
          title: "基本信息",
          titleComp: "basicInfo",
          active: true,
          icon: true
        },
        {
          title: "简历管理",
          titleComp: "resumeManag",
          active: false
        },
        {
          title: "我的收藏",
          titleComp: "myFavorite",
          active: false,
          num: 0
        },
        {
          title: "投递记录",
          titleComp: "deliveredRecord",
          active: false,
          num: 0
        }
      ]
    };
  },
  methods: {
    MyInformation() {
      this.$store.dispatch("MyInformation").then(res => {
        if (res.data.Success) {
          let data = res.data.Data;
          this.userInfo = data;
          this.$refs.basicInfo.init(data);
        }
      });
    },
    onTabs(item) {
      for (let items of this.tabsList) {
        items.active = false;
      }
      this.activeTabs = item;
      item.active = true;

      this.$nextTick(() => {
        //DOM现在更新了
        if (item.titleComp == "basicInfo")
          this.$refs.basicInfo.init(this.userInfo);
      });
    },
    editTotal(title, val) {
      for (let item of this.tabsList) {
        if (item.titleComp == title) {
          item.num = val;
        }
      }
    }
  },
  created() {},
  mounted() {
    this.MyInformation();
    this.$refs.positionComponent.getMyPosition();
    this.$refs.positionComponent.GetMyDeliveryList();
    this.editTotal("myFavorite", this.favorite_total);
    this.editTotal("deliveredRecord", this.delivered_record_total);
  },
  watch: {
    favorite_total: function(newVal) {
      this.editTotal("myFavorite", newVal);
    },
    delivered_record_total: function(newVal) {
      this.editTotal("deliveredRecord", newVal);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.userinfo_header_name {
  width: 940px;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  text-align: center;
  padding: 0 97px;
  min-width: 940px;
  overflow: hidden;
  .user_header {
    width: 100px;
    height: 100px;
    border-radius: 50px;
    margin-top: 48px;
  }

  .user_info_name {
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
  }
  .tabs_list {
    margin-top: 52px;
    display: -webkit-flex;
    // justify-content: space-evenly;// ie不支持
    justify-content: space-between;
    > div {
      width: 164px;
      height: 40px;
      line-height: 40px;
      font-family: Microsoft YaHei;
      border: 0;
      padding: 10px;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
      background: rgba(238, 238, 238, 1);
      cursor: pointer;
      display: -webkit-flex;
      align-items: center;
      justify-content: space-around;
      &.tabls_active {
        font-weight: bold;
        color: #44a9e1;
        background: rgba(255, 255, 255, 1);
        border: 2px solid rgba(68, 169, 225, 1);
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      vertical-align: middle;
      fill: rgb(32, 132, 249);
      width: 30px;
      display: inline-block;
    }
  }
  .tabs_content {
    width: 50%;
    text-align: left;
    margin-left: 25%;
    margin-top: 64px;
  }
}

.personal_center_content {
  // display: -webkit-flex;
  // justify-content: space-evenly;
  .userinfo_bg {
    @include wh(100vw, 240px);
    min-width: 1200px;
  }
  .left-content {
    width: 65%;
    // border:1px solid #555;
    height: 40vh;
    .position-progress {
      border: 1px solid #888;
    }
  }

  .right-content {
    width: 30%;
    height: 30vh;
    border: 1px solid #333;
  }

  .userinfo_content {
    margin-top: -216px;
    z-index: 100;
    display: -webkit-flex;
    justify-content: center;
    min-height: 782px;
    width: 100vw;
    margin-bottom: 24px;
    min-width: 1200px;
  }
}
.position-progress {
  padding: 10px;
}
</style>
