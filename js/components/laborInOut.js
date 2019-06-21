

Vue.component('laborInOut', {
  data: function data() {
    return {
      panelName: '劳务人员进出状态',
      noData: false,
      tHead: [],
      tData: [{
        name: '刘二翔',
        catogory: '木工班组',
        position: '木工',
        inOutTime: '22:25:53',
        status: '进场'
      }, {
        name: '刘二翔',
        catogory: '木工班组',
        position: '木工',
        inOutTime: '22:25:53',
        status: '进场'
      }, {
        name: '刘二翔',
        catogory: '木工班组',
        position: '木工',
        inOutTime: '22:25:53',
        status: '进场'
      }, {
        name: '刘二翔',
        catogory: '木工班组',
        position: '木工',
        inOutTime: '22:25:53',
        status: '进场'
      }, {
        name: '刘二翔',
        catogory: '木工班组',
        position: '木工',
        inOutTime: '22:25:53',
        status: '进场'
      }, {
        name: '刘二翔',
        catogory: '木工班组',
        position: '木工',
        inOutTime: '22:25:53',
        status: '进场'
      }, {
        name: '刘二翔',
        catogory: '木工班组',
        position: '木工',
        inOutTime: '22:25:53',
        status: '进场'
      }, {
        name: '刘二翔',
        catogory: '木工班组',
        position: '木工',
        inOutTime: '22:25:53',
        status: '进场'
      }, {
        name: '刘二翔',
        catogory: '木工班组',
        position: '木工',
        inOutTime: '22:25:53',
        status: '进场'
      }, {
        name: '刘二翔',
        catogory: '木工班组',
        position: '木工',
        inOutTime: '22:25:53',
        status: '进场'
      }, {
        name: '刘二翔',
        catogory: '木工班组',
        position: '木工',
        inOutTime: '22:25:53',
        status: '进场'
      }]
    };
  },
  mounted: function mounted() {
    var self = this;
    var linkTag = document.createElement('link');
    linkTag.setAttribute('href', "css/laborInOut.css");
    linkTag.setAttribute('rel', "stylesheet");
    document.body.appendChild(linkTag);

    var url = baseURL2 + "/api/labor/laborAttendance/getPersonAttenceStatus";

    axios.get(url, {
      params: {
        projId: projectInfo.projId
      }
    }).then(function (response) {
      self.noData = false;
      console.log('laborInOut res is: ' + JSON.stringify(response));
      if (!isEmpty(response.data.result)) {
        self.tData.length = 0;
        response.data.result.forEach(function (item, index) {
          self.tData.push({
            name: item.name,
            catogory: item.teamName,
            position: item.workName,
            inOutTime: item.clockTime.split(' ')[1],
            status: item.typeName
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
  template: '<div v-if="!noData">\r\n  <div class="panelTitle">{{panelName}}</div>\r\n  <div class="laborInOut-card">\r\n      <div class="logNum">\r\n        <el-table\r\n          :data="tHead"\r\n          style="width: 100%">\r\n          <el-table-column\r\n            prop="name"\r\n            label="\u540D\u79F0"\r\n            width="80">\r\n          </el-table-column>\r\n          <el-table-column\r\n            prop="catogory"\r\n            label="\u90E8\u95E8\u73ED\u7EC4"\r\n            width="80">\r\n          </el-table-column>\r\n          <el-table-column\r\n            prop="position"\r\n            label="\u804C\u4F4D"\r\n            width="80">\r\n          </el-table-column>\r\n          <el-table-column\r\n            prop="inOutTime"\r\n            label="\u8FDB\u51FA\u573A\u65F6\u95F4"\r\n            width="120">\r\n          </el-table-column>\r\n          <el-table-column\r\n            prop="status"\r\n            label="\u72B6\u6001">\r\n          </el-table-column>\r\n        </el-table>\r\n      </div>\r\n    <div class="logContainer scrollDiv">\r\n      <div class="logCard">\r\n        <el-table\r\n          :data="tData"\r\n          style="width: 100%">\r\n          <el-table-column\r\n            prop="name"\r\n            label="\u540D\u79F0"\r\n            width="80">\r\n          </el-table-column>\r\n          <el-table-column\r\n            prop="catogory"\r\n            label="\u90E8\u95E8\u73ED\u7EC4"\r\n            width="80">\r\n          </el-table-column>\r\n          <el-table-column\r\n            prop="position"\r\n            label="\u804C\u4F4D"\r\n            width="80">\r\n          </el-table-column>\r\n          <el-table-column\r\n            prop="inOutTime"\r\n            label="\u8FDB\u51FA\u573A\u65F6\u95F4"\r\n            width="120">\r\n          </el-table-column>\r\n          <el-table-column\r\n            prop="status"\r\n            label="\u72B6\u6001">\r\n          </el-table-column>\r\n        </el-table>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div v-else class="componentFailed">\r\n  <img src="assets/icons/icon-noData.png"></img>\r\n  <p>{{panelName}}\u6A21\u5757\u5C1A\u65E0\u6570\u636E\u63A5\u5165...</p>\r\n</div>\r\n'
});
