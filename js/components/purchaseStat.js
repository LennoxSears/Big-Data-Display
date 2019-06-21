

Vue.component('purchaseStat', {
  props: {
    para: String
  },
  data: function data() {
    return {
      panelName: "本月采购统计",
      dataObj: {},
      noData: false
    };
  },
  mounted: function mounted() {

    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var monthStr = year + '-' + (month < 10 ? "0" + month : month);
    var url = baseURL2 + "/api/stuff/orderPlan/listStuffs"; // var url = "http://10.2.100.240:8060/api/stuff/stat/stuffStatisticsPutOut?projId=7784644783492177920"+"&month="+monthStr;

    var self = this;

    axios.get(url, {
      params: {
        projId: projectInfo.projId,
        month: monthStr
      }
    }).then(function (response) {
      console.log("phurchaseStat res is: " + JSON.stringify(response));
      var materialNames = [];
      var inLibs = [];
      var outLibs = [];
      if (!isEmpty(response.data.result)) {
        self.noData = false;
        //console.log('MaterialStat data not empty.');
        self.dataObj = response.data.result;
        response.data.result.forEach(function (item, index) {
          materialNames.push(item.name);
          inLibs.push(item.num);
        });
        var height = response.data.result.length * 30 || 0;
        self.initEcharts(materialNames, inLibs, outLibs, height + 30);
      } else {
        self.noData = true;
      }
    }).catch(function (error) {
      self.noData = true;
      console.log(error);
    });
  },
  methods: {
    initEcharts: function initEcharts(materialNames, inLibs, outLibs, height) {
      var self = this;
      var echartDom = document.getElementById('purchaseEcharts');
      echartDom.style.height = height + 'px';
      echartDom.style.width = JSON.parse(self.para).chartWidth;
      echartDom.style.marginTop = '4px';
      echartDom.style.marginBottom = "0px"; // 基于准备好的dom，初始化echarts实例

      var echartDom2 = document.getElementById('purchaseStatScroll');
      echartDom2.style.height = JSON.parse(self.para).scrollDivHeight;

      var myChart = echarts.init(echartDom); // 指定图表的配置项和数据

      var option = {
        color: ['#6CB3DB', '#006699'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          top: 10,
          data: ['入库', '出库'],
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          top: 64,
          left: '3%',
          right: '7%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          show: false,
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          data: materialNames
        },
        series: [{
          name: '入库',
          type: 'bar',
          barGap: '40%',
          barCategoryGap: '40%',
          label: {
            show: true,
            position: 'right',
            fontSize: '9',
            color: '#fff',
            formatter: '{c} 吨'
          },
          data: inLibs
        }]
      }; // 使用刚指定的配置项和数据显示图表。

      myChart.setOption(option);
    }
  },
  template: '<div v-if="!noData">\r\n    <div class="panelTitle">{{panelName}}</div>\r\n  <div class="environment-card">\r\n    <div class="scrollDiv" style="width: 100%;margin-left:20px;" id="purchaseStatScroll">\r\n      <div id="purchaseEcharts"></div>\r\n    </div>\r\n  </div>\r\n  </div>\r\n\r\n  <div v-else class="componentFailed">\r\n    <img src="assets/icons/icon-noData.png"></img>\r\n    <p>{{panelName}}\u6A21\u5757\u5C1A\u65E0\u6570\u636E\u63A5\u5165...</p>\r\n  </div>'
});
