

Vue.component('securityLog', {
  data: function data() {
    return {
      panelName: '安全日志',
      noData: false,
      logs: [{
        logName: '日志名称',
        recorder: '张三 安全员',
        date: '2019-1-23'
      }, {
        logName: '日志名称',
        recorder: '张三 安全员',
        date: '2019-1-23'
      }, {
        logName: '日志名称',
        recorder: '张三 安全员',
        date: '2019-1-23'
      }, {
        logName: '日志名称',
        recorder: '张三 安全员',
        date: '2019-1-23'
      }, {
        logName: '日志名称',
        recorder: '张三 安全员',
        date: '2019-1-23'
      }, {
        logName: '日志名称',
        recorder: '张三 安全员',
        date: '2019-1-23'
      }, {
        logName: '日志名称',
        recorder: '张三 安全员',
        date: '2019-1-23'
      }, {
        logName: '日志名称',
        recorder: '张三 安全员',
        date: '2019-1-23'
      }, {
        logName: '日志名称',
        recorder: '张三 安全员',
        date: '2019-1-23'
      }, {
        logName: '日志名称',
        recorder: '张三 安全员',
        date: '2019-1-23'
      }, {
        logName: '日志名称',
        recorder: '张三 安全员',
        date: '2019-1-23'
      }, {
        logName: '日志名称',
        recorder: '张三 安全员',
        date: '2019-1-23'
      }, {
        logName: '日志名称',
        recorder: '张三 安全员',
        date: '2019-1-23'
      }, {
        logName: '日志名称',
        recorder: '张三 安全员',
        date: '2019-1-23'
      }],
      logTotal: 105
    };
  },
  mounted: function mounted() {
    var self = this;
    var linkTag = document.createElement('link');
    linkTag.setAttribute('href', "css/securityLog.css");
    linkTag.setAttribute('rel', "stylesheet");
    document.body.appendChild(linkTag);
    self.logs.length = 0;
    var url = baseURL2 + "/api/security/securityLog/listMonth";
    axios.post(url, {

      pageNum: 1,
      pageSize: 60,
      projId: projectInfo.projId

    }).then(function (response) {
      self.noData = false;
      console.log('securityLog res is: ' + JSON.stringify(response));
      if (!isEmpty(response.data.result.list)) {
        self.logTotal = response.data.result.list.length;
        var tempObj = {};
        response.data.result.list.forEach(function (item, index) {
          tempObj.logName = item.securityProblem;
          tempObj.recorder = item.createUsername;
          tempObj.date = item.recordDate;
          self.logs.push(tempObj);
        });
      } else {
        self.noData = true;
      }
    }).catch(function (error) {
      self.noData = true;
      console.log(error);
    });
  },
  template: '<div v-if="!noData">\r\n  <div class="panelTitle">{{panelName}}</div>\r\n  <div class="securityLog-card">\r\n    <div class="logNum">\u672C\u6708{{logTotal}}\u7BC7</div>\r\n    <div class="logContainer scrollDiv">\r\n      <div v-for="item in logs" :key="item" class="logCard">\r\n            <el-card :body-style="{ padding: \'0px\' }">\r\n              <div style="padding: 14px;">\r\n                <span class="nameSpan">{{item.logName}}</span>\r\n                <div class="bottom clearfix">\r\n                  <span class="recorderSpan">\u8BB0\u5F55\u4EBA\uFF1A{{item.recorder}}</span>\r\n                  <time class="time">{{ item.date }}</time>\r\n                </div>\r\n              </div>\r\n            </el-card>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div v-else class="componentFailed">\r\n  <img src="assets/icons/icon-noData.png"></img>\r\n  <p>{{panelName}}\u6A21\u5757\u5C1A\u65E0\u6570\u636E\u63A5\u5165...</p>\r\n</div>\r\n'
});
