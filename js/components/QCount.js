

Vue.component('qcount', {
  data: function data() {
    return {
      panelName: "质量巡检累计",
      noData: false,
      safeData: {
        checkPsaaRate: {
          totalCount: 0,
          qualifiedCount: 0,
          unqualifiedCount: 0
        },
        teamList: []
      },
      qualityData: {}
    };
  },
  mounted: function mounted() {
    var linkTag = document.createElement('link');
    linkTag.setAttribute('href', "css/sqcount.css");
    linkTag.setAttribute('rel', "stylesheet");
    document.body.appendChild(linkTag);

    this.getQualityData();
  },
  methods: {
    getSafeData: function getSafeData() {
      var url = baseURL + "/api/security/count/selectObjectToCount"; // let url = "http://10.2.100.240:8060/api/security/count/selectObjectToCount?projId=7730596820333821952";

      var self = this;

      axios.get(url, {
        params: {
          projId: projectInfo.projId
        }
      }).then(function (response) {
        self.noData = false;
        console.log('Safe data is ' + JSON.stringify(response));
        if (!isEmpty(response.data.result)) {
          console.log('Safe data is not empty');
          self.safeData = response.data.result;
          var checkPsaaRate = response.data.result.checkPsaaRate;
          var psaaRatesum = checkPsaaRate.qualifiedCount;
          var noPassRate = checkPsaaRate.unqualifiedCount;
          var rate = checkPsaaRate.passRate;
          self.initEcharts(psaaRatesum, noPassRate, rate);
        } else {
          self.noData = true;
        }
      }).catch(function (error) {
        self.noData = true;
        console.log(error);
      });
    },
    getQualityData: function getQualityData() {
      var url = baseURL + "/api/quality/count/selectObjectToCount"; // let url = "http://10.2.100.240:8060/api/quality/count/selectObjectToCount?projId=7730596820333821952";

      var self = this;

      axios.get(url, {
        params: {
          projId: projectInfo.projId
        }
      }).then(function (response) {
        self.noData = false;
        console.log('Quality data is ' + JSON.stringify(response));
        if (!isEmpty(response.data.result)) {
          console.log('Quality data is not empty.');
          self.safeData = response.data.result;
          var checkPsaaRate = response.data.result.checkPsaaRate;
          var psaaRate2 = checkPsaaRate.qualifiedCount;
          var noPassRate = checkPsaaRate.unqualifiedCount;
          var rate = checkPsaaRate.passRate;
          self.initEcharts(psaaRate2, noPassRate, rate);
        } else {
          self.noData = true;
        }
      }).catch(function (error) {
        self.noData = true;
        console.log(error);
      });
    },
    initEcharts: function initEcharts(psaaRatesum, noPassRate, rate) {
      var val = rate || 0;
      var noPass = noPassRate || 0;
      var psaaRatesum2 = psaaRatesum || 0; // 基于准备好的dom，初始化echarts实例

      var myChart = echarts.init(document.getElementById('sqEcharts'));
      var data = [{
        value: val,
        name: '整改率'
      }, {
        value: 100 - val,
        name: '未整改'
      }];
      var a = 0;

      for (var i = 0; i < data.length; i++) {
        a += data[i].value;
      } //添加新的元素到data中，并设置其颜色样式为白色


      data.push({
        value: a,
        name: '__other',
        itemStyle: {
          normal: {
            color: 'rgba(0,0,0,0)'
          }
        }
      }); // 指定图表的配置项和数据

      var option = {
        tooltip: {
          trigger: 'item',
          formatter: "{b}: ({c}%)"
        },
        graphic: {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: val + '%\n整改率',
            textAlign: 'center',
            fill: '#fff',
            fontSize: 24
          }
        },
        series: [{
          name: '',
          type: 'pie',
          startAngle: 180,
          radius: ['60%', '70%'],
          color: ['#248bfe', "transparent"],
          avoidLabelOverlap: false,
          hoverAnimation: false,
          label: {
            show: false,
            position: 'center',
            fontSize: '40'
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          tooltip: {
            show: false
          },
          data: data
        }, {
          name: '',
          type: 'pie',
          startAngle: 180,
          radius: ['57%', '58%'],
          color: ['#fff', "transparent"],
          avoidLabelOverlap: false,
          hoverAnimation: false,
          label: {
            show: false,
            position: 'center',
            fontSize: '40'
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          tooltip: {
            show: false
          },
          data: [{
            value: 100
          }, {
            value: 100
          }]
        }, {
          name: '',
          type: 'pie',
          startAngle: 180,
          radius: ['55%', '56%'],
          avoidLabelOverlap: false,
          hoverAnimation: false,
          label: {
            show: false,
            position: 'center',
            fontSize: '40'
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          tooltip: {
            show: false
          },
          data: [{
            value: 100
          }, {
            value: 100
          }]
        }, {
          name: '',
          type: 'pie',
          startAngle: 180,
          radius: ['53%', '54%'],
          avoidLabelOverlap: false,
          hoverAnimation: false,
          label: {
            show: false,
            position: 'center',
            fontSize: '40'
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          tooltip: {
            show: false
          },
          data: [{
            value: 100
          }, {
            value: 100
          }]
        }, {
          name: '',
          type: 'pie',
          startAngle: 180,
          radius: ['75%', '77%'],
          color: ["#1C3C6B", 'transparent'],
          avoidLabelOverlap: false,
          hoverAnimation: false,
          label: {
            show: false,
            position: 'center',
            fontSize: '40'
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          tooltip: {
            show: false
          },
          data: [{
            value: 100
          }, {
            value: 100
          }]
        }]
      }; // 使用刚指定的配置项和数据显示图表。

      myChart.setOption(option);
    }
  },
  template: '<div v-if="!noData">\r\n  <div class="panelTitle">{{panelName}}</div>\r\n  <div class="sqcount-div">\r\n\r\n    <div class="echarts">\r\n      <div id="sqEcharts" style="width: 380px;height:260px;"></div>\r\n    </div>\r\n\r\n    <div class="check">\r\n     <el-row style="text-align:center;">\r\n      <el-col :span="8">\r\n        <p class="data-tite color1">\u68C0\u67E5\u603B\u9879\u76EE</p>\r\n        <p class="data-text color2">{{ safeData.checkPsaaRate.totalCount }}</p>\r\n      </el-col>\r\n      <el-col :span="8">\r\n        <p class="data-tite color1">\u5DF2\u6574\u6539</p>\r\n        <p class="data-text color2">{{ safeData.checkPsaaRate.qualifiedCount }}</p>\r\n      </el-col>\r\n      <el-col :span="8">\r\n        <p class="data-tite color1">\u6574\u6539\u4E2D</p>\r\n        <p class="data-text color2">{{ safeData.checkPsaaRate.unqualifiedCount }}</p>\r\n      </el-col>\r\n     </el-row>\r\n    </div>\r\n    <div class="company">\r\n      <div class="company-hd">\r\n        <p class="hd-text color2">\u6309\u52B3\u52A1\u516C\u53F8\u5212\u5206</p>\r\n        <el-row>\r\n          <el-col :span="6">\r\n            <span class="square bgcolor3"></span>\r\n            <span class="type-name color1">\u4E00\u822C\u4E8B\u6545</span>\r\n          </el-col>\r\n          <el-col :span="6">\r\n            <span class="square bgcolor4"></span>\r\n            <span class="type-name color1">\u91CD\u5927\u4E8B\u6545</span>\r\n          </el-col>\r\n          <el-col :span="6">\r\n            <span class="square bgcolor5"></span>\r\n            <span class="type-name color1">\u7279\u5927\u4E8B\u6545</span>\r\n          </el-col>\r\n          <el-col :span="6">\r\n            <span class="square bgcolor6"></span>\r\n            <span class="type-name color1">\u7279\u522B\u91CD\u5927\u4E8B\u6545</span>\r\n          </el-col>\r\n        </el-row>\r\n      </div>\r\n      <div class="company-bd">\r\n        <div class="company-item" v-for="(item,key) in safeData.teamList" :key="key">\r\n          <div class="item-hd">\r\n            <span class="company-name color1">{{ item.laborCompany }}: {{ item.totalCount }}\u6B21</span>\r\n            <span class="company-name color1">\u7279\u522B\u91CD\u5927\u4E8B\u6545\uFF1A{{ item.fourthLevelCount }}</span>\r\n          </div>\r\n          <div class="item-content">\r\n            <span class="process-line line1" :style="{width:item.firstLevelRate + \'%\'}"></span>\r\n            <span class="process-line line2" :style="{width:item.secondLevelRate + \'%\'}"></span>\r\n            <span class="process-line line3" :style="{width:item.thirdLevelRate + \'%\'}"></span>\r\n            <span class="process-line line4" :style="{width:item.fourthLevelRate + \'%\'}"></span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  </div>\r\n\r\n  <div v-else class="componentFailed">\r\n    <img src="assets/icons/icon-noData.png"></img>\r\n    <p>{{panelName}}\u6A21\u5757\u5C1A\u65E0\u6570\u636E\u63A5\u5165...</p>\r\n  </div>\r\n'
});
