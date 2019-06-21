

Vue.component('milestone', {
  data: function data() {
    return {
      dataObj: {},
      src: "./../../BIBI/BI/assets/icon_close.png",
      noData: false,
      panelName: '项目里程碑'
    };
  },
  mounted: function mounted() {
    var projId = "7730596820333821952";
    var url = baseURL + "/api/environment/environment/getLastData";
    var self = this;

    axios.get(url, {
      params: {
        projId: projectInfo.projId
      }
    }).then(function (response) {
      console.log('Milestone data is: ' + JSON.stringify(response));
      if (!isEmpty(response.data.result)) {
        self.noData = false;
        console.log('Milestone data not empty.');
        self.dataObj = response.data.result;
      } else {
        self.noData = true;
      }
    }).catch(function (error) {
      self.noData = true;
      console.log(error);
    });
  },
  template: '<div v-if="!noData">\r\n  <div class="panelTitle">{{panelName}}</div>\r\n<div class="milestone-card">\r\n  <div class="milestone-ctn">\r\n    <el-row>\r\n      <el-col :span="12" :offset="12" style="text-align:right;">\r\n        <span style="margin-right:32px;">\u7D2F\u8BA1\u5EF6\u671F\uFF1A<i class="i_text">56</i>\u5929</span>\r\n        <span>\u8DDD\u6C34\u7535\u88C5\u4FEE\uFF1A<i class="i_text">100</i>\u5929</span>\r\n      </el-col>\r\n    </el-row>\r\n    <div class="step-title">\r\n      <span :span="4">\u57FA\u7840\u65BD\u5DE5\u4E00\u6BB5</span>\r\n      <span :span="4">\u57FA\u7840\u65BD\u5DE5\u4E8C\u6BB5</span>\r\n      <span :span="4">\u4E3B\u4F53\u51C6\u5907\u65BD\u5DE5</span>\r\n      <span :span="4">\u4E3B\u4F53\u65BD\u5DE5\u4E00\u6BB5</span>\r\n      <span :span="4">\u4E3B\u4F53\u65BD\u5DE5\u4E8C\u6BB5</span>\r\n      <span :span="4">\u4E3B\u4F53\u65BD\u5DE5\u4E09\u6BB5</span>\r\n    </div>\r\n    <div class="step-img">\r\n      <div>\r\n        <span class="line2"></span><span class="ring"></span>\r\n      </div>\r\n      <div>\r\n        <span class="line"></span><span class="ring"></span>\r\n      </div>\r\n      <div>\r\n        <span class="line"></span><span class="ring"></span>\r\n      </div>\r\n      <div>\r\n        <span class="line"></span><span class="ring"></span>\r\n      </div>\r\n      <div>\r\n        <span class="line"></span><span class="ring"></span>\r\n      </div>\r\n      <div>\r\n        <span class="line"></span><span class="ring"></span><span class="line2"></span>\r\n      </div>\r\n    </div>\r\n    <div class="step-detail">\r\n      <div>\r\n        <p>\u5F00\u59CB\uFF1A2019-9-21</p>\r\n        <p>\u5B9E\u9645\uFF1A2019-9-21</p>\r\n        <p>\u8BA1\u5212\uFF1A2019-9-21</p>\r\n      </div>\r\n      <div>\r\n        <p>\u5F00\u59CB\uFF1A2019-9-21</p>\r\n        <p>\u5B9E\u9645\uFF1A2019-9-21</p>\r\n      </div>\r\n      <div>\r\n        <p>\u5F00\u59CB\uFF1A2019-9-21</p>\r\n      </div>\r\n      <div>\r\n        <p>\u5F00\u59CB\uFF1A2019-9-21</p>\r\n      </div>\r\n      <div>\r\n        <p>\u5F00\u59CB\uFF1A2019-9-21</p>\r\n      </div>\r\n      <div>\r\n        <p>\u5F00\u59CB\uFF1A2019-9-21</p>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n</div>\r\n\r\n<div v-else class="componentFailed">\r\n  <img src="assets/icons/icon-noData.png"></img>\r\n  <p>{{panelName}}\u6A21\u5757\u5C1A\u65E0\u6570\u636E\u63A5\u5165...</p>\r\n</div>'
});
