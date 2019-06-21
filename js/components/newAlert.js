

Vue.component('newAlert', {
  data: function data() {
    return {
      panelName: '最新预警',
      noData: false,
      logs: [{
        code: 'YC180003',
        value: '213 ug/m3',
        exceed: '超出120 ug/m3',
        type: 'PM2',
        date: '2012-5-6 20:48'
      }, {
        code: 'YC180003',
        value: '213 ug/m3',
        exceed: '超出120 ug/m3',
        type: 'PM2',
        date: '2012-5-6 20:48'
      }, {
        code: 'YC180003',
        value: '213 ug/m3',
        exceed: '超出120 ug/m3',
        type: 'PM2',
        date: '2012-5-6 20:48'
      }, {
        code: 'YC180003',
        value: '213 ug/m3',
        exceed: '超出120 ug/m3',
        type: 'PM2',
        date: '2012-5-6 20:48'
      }, {
        code: 'YC180003',
        value: '213 ug/m3',
        exceed: '超出120 ug/m3',
        type: 'PM2',
        date: '2012-5-6 20:48'
      }, {
        code: 'YC180003',
        value: '213 ug/m3',
        exceed: '超出120 ug/m3',
        type: 'PM2',
        date: '2012-5-6 20:48'
      }, {
        code: 'YC180003',
        value: '213 ug/m3',
        exceed: '超出120 ug/m3',
        type: 'PM2',
        date: '2012-5-6 20:48'
      }, {
        code: 'YC180003',
        value: '213 ug/m3',
        exceed: '超出120 ug/m3',
        type: 'PM2',
        date: '2012-5-6 20:48'
      }, {
        code: 'YC180003',
        value: '213 ug/m3',
        exceed: '超出120 ug/m3',
        type: 'PM2',
        date: '2012-5-6 20:48'
      }, {
        code: 'YC180003',
        value: '213 ug/m3',
        exceed: '超出120 ug/m3',
        type: 'PM2',
        date: '2012-5-6 20:48'
      }, {
        code: 'YC180003',
        value: '213 ug/m3',
        exceed: '超出120 ug/m3',
        type: 'PM2',
        date: '2012-5-6 20:48'
      }]
    };
  },
  mounted: function mounted() {
    var self = this;
    var linkTag = document.createElement('link');
    linkTag.setAttribute('href', "css/newAlert.css");
    linkTag.setAttribute('rel', "stylesheet");
    document.body.appendChild(linkTag);

    var url = baseURL2 + "/api/environment/environmentCount/selectAllDataByProId24";

    axios.get(url, {
      params: {
        projId: projectInfo.projId
      }
    }).then(function (response) {
      self.noData = false;
      console.log('newAlert res is: ' + JSON.stringify(response));
      if (!isEmpty(response.data.result)) {
        self.logs.length = 0;
        response.data.result.forEach(function (item, index) {
          self.logs.push({
            code: item.projCode,
            value: item.value + 'ug/m3',
            exceed: '超出' + (item.value - item.alarmValue) + 'ug/m3',
            type: item.name,
            date: item.startTime
          });
        });
      } else {
        self.noData = true;
      }
    }).catch(function (error) {
      self.noData = true;
      console.log(error);
    });
  },
  template: '<div v-if="!noData">\r\n  <div class="panelTitle">{{panelName}}</div>\r\n  <div class="newAlert-card">\r\n    <div class="logContainer scrollDiv">\r\n      <div v-for="item in logs" :key="item" class="logCard">\r\n            <el-card :body-style="{ padding: \'0px\' }">\r\n              <div style="padding: 14px;">\r\n                <span class="codeSpan">{{item.code}}</span>\r\n                <time class="time">{{ item.date }}</time>\r\n                <div class="bottom clearfix">\r\n                  <span class="typeSpan">{{item.type}}</span>\r\n                  <span class="valueSpan">{{item.value}}</span>\r\n                  <span class="exceedSpan">{{item.exceed}}</span>\r\n                </div>\r\n              </div>\r\n            </el-card>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div v-else class="componentFailed">\r\n  <img src="assets/icons/icon-noData.png"></img>\r\n  <p>{{panelName}}\u6A21\u5757\u5C1A\u65E0\u6570\u636E\u63A5\u5165...</p>\r\n</div>\r\n'
});
