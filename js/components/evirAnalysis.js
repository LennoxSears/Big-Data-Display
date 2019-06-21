

Vue.component('evirAnalysis', {
  props: {
    para: String
  },
  data: function data() {
    return {
      panelName: "环境趋势",
      dataObj: {},
      noData: false,
      echartBar: [{
        unit: 'ug/m3',
        dataAxis: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        data: [],
        yMax: 50,
        dataShadow: []
      }, {
        unit: 'dB(A)',
        dataAxis: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        data: [],
        yMax: 50,
        dataShadow: []
      }, {
        unit: 'm/s',
        dataAxis: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        data: [],
        yMax: 50,
        dataShadow: []
      }, {
        unit: 'ug/m3',
        dataAxis: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        data: [],
        yMax: 50,
        dataShadow: []
      }, {
        unit: '32xBO',
        dataAxis: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        data: [],
        yMax: 50,
        dataShadow: []
      }, {
        unit: '%',
        dataAxis: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        data: [],
        yMax: 50,
        dataShadow: []
      }]
    };
  },
  mounted: function mounted() {
    var self = this;

    var linkTag = document.createElement('link');
    linkTag.setAttribute('href', "css/evirAnalysis.css");
    linkTag.setAttribute('rel', "stylesheet");
    document.body.appendChild(linkTag);

    var url = baseURL2 + "/api/environment/environment/get24HourWeaTher";
    axios.get(url, {
      params: {
        projId: projectInfo.projId
      }
    }).then(function (response) {
      self.noData = false;
      console.log('laborSummary res is: ' + JSON.stringify(response));
      if (!isEmpty(response.data.result.latest24Data)) {
        response.data.result.latest24Data.forEach(function (item, index) {
          self.echartBar[0].data.push(item.pm25);
          self.echartBar[1].data.push(item.noise);
          self.echartBar[2].data.push(item.windSpeed);
          self.echartBar[3].data.push(item.pm10);
          self.echartBar[4].data.push(item.humidity);
          self.echartBar[5].data.push(item.temp);
        });
        console.log('Trend data is ' + self.echartBar[0].data + '\n');
        console.log('Trend data is ' + self.echartBar[1].data + '\n');
        console.log('Trend data is ' + self.echartBar[2].data + '\n');
        console.log('Trend data is ' + self.echartBar[3].data + '\n');
        console.log('Trend data is ' + self.echartBar[4].data + '\n');
        console.log('Trend data is ' + self.echartBar[5].data + '\n');

        self.initEcharts('pm2-chart', self.echartBar[0]);
        self.initEcharts('noise-chart', self.echartBar[1]);
        self.initEcharts('windSpeed-chart', self.echartBar[2]);
        self.initEcharts('pm10-chart', self.echartBar[3]);
        self.initEcharts('windDirect-chart', self.echartBar[4]);
        self.initEcharts('wet-chart', self.echartBar[5]);
      } else {
        self.noData = true;
      }
    }).catch(function (error) {
      self.noData = true;
      console.log(error);
    });
  },

  methods: {
    initEcharts: function initEcharts(chartID, dataSet) {
      var self = this;
      var echartDom = document.getElementById(chartID);
      echartDom.style.height = '200px';
      echartDom.style.width = '1300px';
      echartDom.style.border = '0px red solid';
      var myChart = echarts.init(echartDom); // 指定图表的配置项和数据

      var option = {
        grid: {
          left: 40,
          top: 40,
          right: 40,
          bottom: 40
        },
        xAxis: {
          type: 'category',
          name: '日',
          nameLocation: 'end',
          nameTextStyle: {
            color: '#fff'
          },
          data: dataSet.dataAxis,
          axisLabel: {
            inside: false,
            textStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          type: 'value',
          name: dataSet.unit,
          nameLocation: 'end',
          nameTextStyle: {
            color: '#fff'
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        dataZoom: [{
          type: 'inside'
        }],
        series: [{
          type: 'line',
          itemStyle: {
            normal: {
              color: '#67ADD5'
            }
          },
          data: dataSet.data,
          smooth: true
        }]
      }; // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  template: '<div v-if="!noData">\r\n  <div class="panelTitle">{{panelName}}</div>\r\n  <div class="evirAnalysis-card">\r\n    <div class="bigContainer scrollDiv">\r\n      <div class="chartContainer">\r\n        <h4>PM2.5</h4>\r\n        <div id="pm2-chart"></div>\r\n      </div>\r\n      <div class="chartContainer">\r\n        <h4>\u566A\u97F3</h4>\r\n        <div id="noise-chart"></div>\r\n      </div>\r\n      <div class="chartContainer">\r\n        <h4>\u98CE\u901F</h4>\r\n        <div id="windSpeed-chart"></div>\r\n      </div>\r\n      <div class="chartContainer">\r\n        <h4>PM10</h4>\r\n        <div id="pm10-chart"></div>\r\n      </div>\r\n      <div class="chartContainer">\r\n        <h4>\u6E7F\u5EA6</h4>\r\n        <div id="windDirect-chart"></div>\r\n      </div>\r\n      <div class="chartContainer">\r\n        <h4>\u6E29\u5EA6</h4>\r\n        <div id="wet-chart"></div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div v-else class="componentFailed">\r\n  <img src="assets/icons/icon-noData.png"></img>\r\n  <p>{{panelName}}\u6A21\u5757\u5C1A\u65E0\u6570\u636E\u63A5\u5165...</p>\r\n</div>\r\n'
});
