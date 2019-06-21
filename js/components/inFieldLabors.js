

Vue.component('inFieldLabors', {
  data: function data() {
    return {
      panelName: '今日场内实时人数',
      noData: false,
      PeopleTotal: 0,
      pplTables: [{
        tName: '八十一中建设集团有限公司',
        tData: [{
          depart: '物资部   8人',
          inField: '在场   2人',
          outField: '不在场   6人'
        }, {
          depart: '物资部   8人',
          inField: '在场   2人',
          outField: '不在场   6人'
        }, {
          depart: '物资部   8人',
          inField: '在场   2人',
          outField: '不在场   6人'
        }, {
          depart: '物资部   8人',
          inField: '在场   2人',
          outField: '不在场   6人'
        }, {
          depart: '物资部   8人',
          inField: '在场   2人',
          outField: '不在场   6人'
        }, {
          depart: '物资部   8人',
          inField: '在场   2人',
          outField: '不在场   6人'
        }]
      }, {
        tName: '远大劳务公司',
        tData: [{
          depart: '土建班组   8人',
          inField: '在场   2人',
          outField: '不在场   6人'
        }, {
          depart: '水电班组   8人',
          inField: '在场   2人',
          outField: '不在场   6人'
        }, {
          depart: '木工班组   8人',
          inField: '在场   2人',
          outField: '不在场   6人'
        }]
      }, {
        tName: '天阳劳务公司',
        tData: [{
          depart: '油漆班组   8人',
          inField: '在场   2人',
          outField: '不在场   6人'
        }, {
          depart: '电焊班组   8人',
          inField: '在场   2人',
          outField: '不在场   6人'
        }, {
          depart: '钢筋班组   8人',
          inField: '在场   2人',
          outField: '不在场   6人'
        }, {
          depart: '起重班组   8人',
          inField: '在场   2人',
          outField: '不在场   6人'
        }, {
          depart: '混泥土班组   8人',
          inField: '在场   2人',
          outField: '不在场   6人'
        }, {
          depart: '瓦工班组   8人',
          inField: '在场   2人',
          outField: '不在场   6人'
        }]
      }]
    };
  },
  mounted: function mounted() {
    var self = this;
    var linkTag = document.createElement('link');
    linkTag.setAttribute('href', "css/inFieldLabors.css");
    linkTag.setAttribute('rel', "stylesheet");
    document.body.appendChild(linkTag);

    var url = baseURL2 + "/api/labor/laborStatistics/getLaborTeamPerson";

    self.pplTables.length = 0;
    axios.get(url, {
      params: {
        projId: projectInfo.projId
      }
    }).then(function (response) {
      self.noData = false;
      console.log('inFieldLabors res is: ' + JSON.stringify(response));

      if (!isEmpty(response.data.result.compamnyList)) {
        response.data.result.compamnyList.forEach(function (item, index) {
          var tempObj = {};
          tempObj.tData = new Array();
          tempObj.tName = item.name;
          item.teamList.forEach(function (it, ind) {
            self.PeopleTotal += parseInt(it.count, 10);
            tempObj.tData.push({
              depart: it.teams + '  ' + it.count,
              inField: '在场  ' + it.currentCount,
              outField: '不在场  ' + (it.count - it.currentCount)
            });
          });
          self.pplTables.push(tempObj);
          var tempObj = {};
          tempObj.tData = new Array();
        });
      } else {
        self.noData = true;
      }
    }).catch(function (error) {
      self.noData = true;
      console.log(error);
    });
  },
  template: '<div v-if="!noData">\r\n  <div class="panelTitle">{{panelName}}</div>\r\n  <div class="inFieldLabors-card">\r\n    <div class="logNum">\u603B\u4EBA\u6570: {{PeopleTotal}}\u4EBA</div>\r\n    <div class="logContainer scrollDiv">\r\n      <div v-for="item in pplTables" :key="item" class="logCard">\r\n        <h4>{{item.tName}}</h4>\r\n        <el-table\r\n          :data="item.tData"\r\n          style="width: 100%">\r\n          <el-table-column\r\n            prop="depart"\r\n            label=""\r\n            width="160">\r\n          </el-table-column>\r\n          <el-table-column\r\n            prop="inField"\r\n            label=""\r\n            width="160">\r\n          </el-table-column>\r\n          <el-table-column\r\n            prop="outField"\r\n            label="">\r\n          </el-table-column>\r\n        </el-table>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div v-else class="componentFailed">\r\n  <img src="assets/icons/icon-noData.png"></img>\r\n  <p>{{panelName}}\u6A21\u5757\u5C1A\u65E0\u6570\u636E\u63A5\u5165...</p>\r\n</div>\r\n'
});
