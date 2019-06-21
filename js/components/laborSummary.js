

Vue.component('laborSummary', {
  data: function data() {
    return {
      laborStat: {
        register: '5772',
        realtime: '158',
        attend: '221'
      },
      noData: false
    };
  },
  mounted: function mounted() {
    var self = this;
    var linkTag = document.createElement('link');
    linkTag.setAttribute('href', "css/laborSummary.css");
    linkTag.setAttribute('rel', "stylesheet");
    document.body.appendChild(linkTag);

    var url = baseURL2 + "/api/labor/laborStatistics/getLaborTeamPerson";

    axios.get(url, {
      params: {
        projId: projectInfo.projId
      }
    }).then(function (response) {
      self.noData = false;
      console.log('laborSummary res is: ' + JSON.stringify(response));
      if (!isEmpty(response.data.result)) {
        self.laborStat.register = response.data.result.registeredCount;
        self.laborStat.realtime = response.data.result.actualCount;
        self.laborStat.attend = response.data.result.attenceNum;
      } else {
        self.noData = true;
      }
    }).catch(function (error) {
      self.noData = true;
      console.log(error);
    });
  },
  template: '<div class="laborSummary-card">\r\n  <div class="lsCard">\r\n    <el-card shadow="always">\r\n     <span class="lsTitle">\u9879\u76EE\u5728\u518C\u4EBA\u6570 :</span><span class="lsNum">{{laborStat.register}}</span>\r\n    </el-card>\r\n  </div>\r\n  <div class="lsCard">\r\n    <el-card shadow="always">\r\n     <span class="lsTitle">\u73B0\u573A\u5B9E\u65F6\u4EBA\u6570 :</span><span class="lsNum">{{laborStat.realtime}}</span>\r\n    </el-card>\r\n  </div>\r\n  <div class="lsCard">\r\n    <el-card shadow="always">\r\n     <span class="lsTitle">\u4ECA\u65E5\u51FA\u52E4\u4EBA\u6570 :</span><span class="lsNum">{{laborStat.attend}}</span>\r\n    </el-card>\r\n  </div>\r\n</div>\r\n'
});
