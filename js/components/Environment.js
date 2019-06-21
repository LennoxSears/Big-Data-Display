

Vue.component('environment', {
  data: function data() {
    return {
      panelName: "环境监测",
      dataObj: {
        pm25: 'N/A ',
        noise: 'N/A ',
        windSpeed: 'N/A ',
        pm10: 'N/A ',
        windDirection: 'N/A ',
        humidity: 'N/A '
      },
      noData: false
    };
  },
  mounted: function mounted() {

    var linkTag = document.createElement('link');
    linkTag.setAttribute('href', "css/environment.css");
    linkTag.setAttribute('rel', "stylesheet");
    document.body.appendChild(linkTag);

    var url = baseURL + "/api/environment/environment/getLastData";
    var self = this;

    axios.get(url, {
      params: {
        projId: projectInfo.projId
      }
    }).then(function (response) {
      self.noData = false;
      console.log('environment res is: ' + JSON.stringify(response));
      if (!isEmpty(response.data.result)) {
        self.dataObj = response.data.result;
      } else {
        self.noData = true;
      }
    }).catch(function (error) {
      self.noData = true;
      console.log(error);
    });
  },
  template: '<div v-if="!noData">\r\n  <div class="panelTitle">{{panelName}}</div>\r\n  <div class="environment-card">\r\n      <el-row :gutter="10" style="margin-top:30px;margin-bottom:20px;text-align:center;">\r\n       <el-col :span="8">\r\n        <div class="color1"><img src="assets/icons/icon-pm2.png"></img>PM2.5</div>\r\n        <p><span class="data-text">{{ dataObj.pm25 }}</span><span class="unit">ug/m3</span></p>\r\n       </el-col>\r\n       <el-col :span="8">\r\n        <div class="color1"><img src="assets/icons/icon-noise.png"></img>\u566A\u58F0</div>\r\n        <p><span class="data-text">{{ dataObj.noise }}</span><span class="unit">dB(A)</span></p>\r\n       </el-col>\r\n       <el-col :span="8">\r\n        <div class="color1"><img src="assets/icons/icon-windSpeed.png"></img>\u98CE\u901F</div>\r\n        <p><span class="data-text">{{ dataObj.windSpeed }}</span><span class="unit">m/s</span></p>\r\n       </el-col>\r\n      </el-row>\r\n      <el-row :gutter="10" style="text-align:center;">\r\n      <el-col :span="8">\r\n       <div class="color1"><img src="assets/icons/icon-pm10.png"></img>PM10</div>\r\n       <p><span class="data-text">{{ dataObj.pm10 }}</span><span class="unit">ug/m3</span></p>\r\n      </el-col>\r\n      <el-col :span="8">\r\n       <div class="color1"><img src="assets/icons/icon-wind.png"></img>\u98CE\u5411</div>\r\n       <p><span class="data-text">{{ dataObj.windDirection }}</span><span class="unit">32xB0</span></p>\r\n      </el-col>\r\n      <el-col :span="8">\r\n       <div class="color1"><img src="assets/icons/icon-wet.png"></img>\u6E7F\u5EA6</div>\r\n       <p><span class="data-text">{{ dataObj.humidity }}</span><span class="unit">%</span></p>\r\n      </el-col>\r\n     </el-row>\r\n  </div>\r\n</div>\r\n\r\n<div v-else class="componentFailed">\r\n  <img src="assets/icons/icon-noData.png"></img>\r\n  <p>{{panelName}}\u6A21\u5757\u5C1A\u65E0\u6570\u636E\u63A5\u5165...</p>\r\n</div>'
});
