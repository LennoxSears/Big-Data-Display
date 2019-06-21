

Vue.component('personStat', {
  data: function data() {
    return {
      panelName: "人员统计",
      listData: [],
      personNum: '',
      noData: false
    };
  },
  mounted: function mounted() {

    var linkTag = document.createElement('link');
    linkTag.setAttribute('href', "css/personStat.css");
    linkTag.setAttribute('rel', "stylesheet");
    document.body.appendChild(linkTag);

    this.getCharts();
    this.getPerson();
  },
  methods: {
    getCharts: function getCharts() {
      var projId = "7730596820333821952";
      var url = baseURL + "/api/labor/laborStatistics/laborTeamCount";
      var self = this;

      axios.get(url, {
        params: {
          projId: projectInfo.projId
        }
      }).then(function (response) {
        //console.log("personStat res is : ", JSON.stringify(response));
        self.noData = false;
        if (!isEmpty(response.data.result)) {
          var dataList = response.data.result.slice(0, 12);
          self.listData = response.data.result;
          var chartsData = new Array();
          dataList.forEach(function (item) {
            var ob = {
              name: item.teamName,
              value: item.teamCount
            };
            chartsData.push(ob);
          });
          var option = {
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            visualMap: {
              show: false,
              min: 80,
              max: 600,
              inRange: {
                colorLightness: [0, 1]
              }
            },
            series: [{
              name: '访问来源',
              type: 'pie',
              radius: '60%',
              center: ['50%', '50%'],
              labelLine: {
                normal: {
                  lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                  },
                  smooth: 0.2,
                  length: 8,
                  length2: 10
                }
              },
              data: chartsData.sort(function (a, b) {
                return a.value - b.value;
              }),
              roseType: 'radius',
              itemStyle: {
                normal: {
                  color: '#6cb3db'
                }
              }
            }]
          };
          var myChart = echarts.init(document.getElementById('personTeam'));
          myChart.setOption(option);
        } else {
          self.noData = true;
        }
      }).catch(function (error) {
        self.noData = true;
        console.log(error);
      });
    },
    getPerson: function getPerson() {
      var projId = "7730596820333821952";
      var url = baseURL + "/api/labor/laborStatistics/projActualPerson";
      var self = this;

      axios.get(url, {
        params: {
          projId: projectInfo.projId
        }
      }).then(function (response) {
        self.noData = false;
        if (!isEmpty(response.data.result)) {
          self.personNum = response.data.result;
          console.log(self.personNum);
        } else {
          self.noData = true;
        }
      }).catch(function (error) {
        self.noData = true;
        console.log(error);
      });
    }
  },
  template: '<div v-if="!noData">\r\n<div class="panelTitle">{{panelName}}</div>\r\n<div class="personContent">\r\n  <p>\u9879\u76EE\u5B9E\u65F6\u5728\u573A<span>{{personNum}}</span>\u4EBA</p>\r\n    <div id="personTeam" style="width:320px;height:320px"></div>\r\n  <div class="teamList scrollDiv">\r\n    <ul>\r\n      <li v-for="item in listData">\r\n        <span>{{item.teamName}}</span>\r\n        <span>{{item.teamCount}}\u4EBA</span>\r\n      </li>\r\n    </ul>\r\n  </div>\r\n</div>\r\n</div>\r\n\r\n<div v-else class="componentFailed">\r\n  <img src="assets/icons/icon-noData.png"></img>\r\n  <p>{{panelName}}\u6A21\u5757\u5C1A\u65E0\u6570\u636E\u63A5\u5165...</p>\r\n</div>'
});
