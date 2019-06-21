

Vue.component('materialStock', {
  data: function data() {
    return {
      panelName: '材料库存汇总',
      noData: false,
      logs: [{
        logName: '电缆',
        logItem: [{
          itemId: 'C30',
          itemValue: '251吨'
        }, {
          itemId: 'C30',
          itemValue: '1吨'
        }, {
          itemId: 'C30',
          itemValue: '25吨'
        }]
      }, {
        logName: '电缆',
        logItem: [{
          itemId: 'C30',
          itemValue: '251吨'
        }, {
          itemId: 'C30',
          itemValue: '251吨'
        }, {
          itemId: 'C30',
          itemValue: '251吨'
        }]
      }, {
        logName: '电缆',
        logItem: [{
          itemId: 'C30',
          itemValue: '251吨'
        }, {
          itemId: 'C30',
          itemValue: '251吨'
        }, {
          itemId: 'C30',
          itemValue: '251吨'
        }]
      }, {
        logName: '电缆',
        logItem: [{
          itemId: 'C30',
          itemValue: '21吨'
        }, {
          itemId: 'C30',
          itemValue: '251m2'
        }, {
          itemId: 'C30',
          itemValue: '1m2'
        }]
      }, {
        logName: '电缆',
        logItem: [{
          itemId: 'C30',
          itemValue: '51m2'
        }, {
          itemId: 'C30',
          itemValue: '251m2'
        }, {
          itemId: 'C30',
          itemValue: '2m2'
        }]
      }, {
        logName: '电缆',
        logItem: [{
          itemId: 'C30',
          itemValue: '251吨'
        }, {
          itemId: 'C30',
          itemValue: '251吨'
        }, {
          itemId: 'C30',
          itemValue: '251吨'
        }]
      }, {
        logName: '电缆',
        logItem: [{
          itemId: 'C30',
          itemValue: '2551吨'
        }, {
          itemId: 'C30',
          itemValue: '251吨'
        }, {
          itemId: 'C30',
          itemValue: '251吨'
        }]
      }, {
        logName: '电缆',
        logItem: [{
          itemId: 'C30',
          itemValue: '251吨'
        }, {
          itemId: 'C30',
          itemValue: '251吨'
        }, {
          itemId: 'C30',
          itemValue: '251吨'
        }]
      }, {
        logName: '电缆',
        logItem: [{
          itemId: 'C30',
          itemValue: '251m2'
        }, {
          itemId: 'C30',
          itemValue: '251m2'
        }, {
          itemId: 'C30',
          itemValue: '251吨'
        }]
      }, {
        logName: '电缆',
        logItem: [{
          itemId: 'C30',
          itemValue: '251吨'
        }, {
          itemId: 'C30',
          itemValue: '251吨'
        }, {
          itemId: 'C30',
          itemValue: '251吨'
        }]
      }, {
        logName: '电缆',
        logItem: [{
          itemId: 'C30',
          itemValue: '251吨'
        }, {
          itemId: 'C30',
          itemValue: '251吨'
        }, {
          itemId: 'C30',
          itemValue: '251吨'
        }]
      }]
    };
  },
  mounted: function mounted() {
    var self = this;
    self.logs.length = 0;
    var linkTag = document.createElement('link');
    linkTag.setAttribute('href', "css/materialStock.css");
    linkTag.setAttribute('rel', "stylesheet");
    document.body.appendChild(linkTag);

    var url = baseURL2 + "/api/stuff/stuffCook/cookSummary" + "?projId=" + projectInfo.projId;
    axios.post(url).then(function (response) {
      self.noData = false;
      console.log('materialStock res is: ' + JSON.stringify(response));
      self.logs.length = 0;
      var tempObj = {};
      tempObj.logItem = new Array();
      if (!isEmpty(response.data.result)) {
        response.data.result.forEach(function (item, index) {
          for (var i = 0; i < item.voList.length; i += 3) {
            tempObj.logName = item.categoryName;
            if (!isEmpty(item.voList[i])) {
              tempObj.logItem.push({
                itemId: item.voList[i].stuffName,
                itemValue: item.voList[i].cookNum + item.voList[i].unit
              });
            }
            if (!isEmpty(item.voList[i + 1])) {
              tempObj.logItem.push({
                itemId: item.voList[i + 1].stuffName,
                itemValue: item.voList[i + 1].cookNum + item.voList[i + 1].unit
              });
            }
            if (!isEmpty(item.voList[i + 2])) {
              tempObj.logItem.push({
                itemId: item.voList[i + 2].stuffName,
                itemValue: item.voList[i + 2].cookNum + item.voList[i + 2].unit
              });
            }
            console.log('tempObj is ' + JSON.stringify(tempObj));
            self.logs.push(tempObj);
            tempObj = {};
            tempObj.logItem = new Array();
          }
        });
      } else {
        self.noData = true;
      }
    }).catch(function (error) {
      self.noData = true;
      console.log(error);
    });
  },
  template: '<div v-if="!noData">\r\n    <div class="panelTitle">{{panelName}}</div>\r\n    <div class="materialStock-card">\r\n      <div class="logContainer scrollDiv">\r\n        <div v-for="item in logs" :key="item" class="logCard">\r\n            <div class="stockItem">{{item.logName}}</div>\r\n            <div class="stockItem">\r\n              <div class="iconDiv" v-if="item.logItem[0] != undefined">\r\n                <img class="itemIcon" src="assets/icons/icon-pm10.png"></img>\r\n                <span :class="item.logItem[0].itemId.length > 4 ? \'codeText\' : \'codeText2\'" >{{item.logItem[0].itemId}}</span>\r\n                <span class="stockText">{{item.logItem[0].itemValue}}</span>\r\n              </div>\r\n            </div>\r\n            <div class="stockItem">\r\n              <div class="iconDiv" v-if="item.logItem[1] != undefined">\r\n                <img class="itemIcon" src="assets/icons/icon-pm10.png"></img>\r\n                <span :class="item.logItem[0].itemId.length > 4 ? \'codeText\' : \'codeText2\'">{{item.logItem[1].itemId}}</span>\r\n                <span class="stockText">{{item.logItem[1].itemValue}}</span>\r\n              </div>\r\n            </div>\r\n            <div class="stockItem">\r\n              <div class="iconDiv" v-if="item.logItem[2] != undefined">\r\n                <img class="itemIcon" src="assets/icons/icon-pm10.png"></img>\r\n                <span :class="item.logItem[0].itemId.length > 4 ? \'codeText\' : \'codeText2\'">{{item.logItem[2].itemId}}</span>\r\n                <span class="stockText">{{item.logItem[2].itemValue}}</span>\r\n              </div>\r\n            </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div v-else class="componentFailed">\r\n    <img src="assets/icons/icon-noData.png"></img>\r\n    <p>{{panelName}}\u6A21\u5757\u5C1A\u65E0\u6570\u636E\u63A5\u5165...</p>\r\n  </div>\r\n'
});
