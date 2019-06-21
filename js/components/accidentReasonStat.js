

Vue.component('accidentReasonStat', {
    props: {
        para: String
    },
    data: function data() {
        return {
            panelName: "事故原因统计",
            dataObj: {},
            noData: false,
            echartBar: {
                dataAxis: [],
                data: [],
                yMax: 50,
                dataShadow: []
            }
        };
    },
    mounted: function mounted() {
        var self = this;
        for (var i = 0; i < self.echartBar.data.length; i++) {
            self.echartBar.dataShadow.push(self.echartBar.yMax);
        }

        var url = baseURL2 + "/api/quality/qualityStatistics/findWhy";

        axios.post(url, {

            projId: projectInfo.projId

        }).then(function (response) {
            self.noData = false;
            console.log('accidentReasonStat res is: ' + JSON.stringify(response));
            if (!isEmpty(response.data.result)) {
                self.echartBar.dataAxis.length = 0;
                self.echartBar.data.length = 0;
                response.data.result.forEach(function (item, index) {
                    self.echartBar.dataAxis.push(item.name);
                    self.echartBar.data.push(item.num);
                });
                self.initEcharts('accidentReasonStat-chart');
            } else {
                self.noData = true;
            }
        }).catch(function (error) {
            self.noData = true;
            console.log(error);
        });
    },

    methods: {
        initEcharts: function initEcharts(chartID) {
            var self = this;
            var echartDom = document.getElementById(chartID);
            echartDom.style.height = '250px';
            echartDom.style.width = self.para;
            echartDom.style.border = '0px red solid';
            var myChart = echarts.init(echartDom); // 指定图表的配置项和数据

            var option = {
                grid: {
                    left: 60,
                    top: 60,
                    right: 60,
                    bottom: 60
                },
                xAxis: {
                    name: '原因',
                    nameLocation: 'end',
                    nameTextStyle: {
                        color: '#fff'
                    },
                    data: self.echartBar.dataAxis,
                    axisLabel: {
                        inside: false,
                        textStyle: {
                            color: '#fff',
                            fontSize: 10
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
                    name: '次数',
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
                series: [{ // For shadow
                    type: 'bar',
                    itemStyle: {
                        normal: { color: 'rgba(75,137,225,0.3)' }
                    },
                    barGap: '-100%',
                    barCategoryGap: '40%',
                    data: self.echartBar.dataShadow,
                    animation: false
                }, {
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: 'rgba(2,208,231,1)'
                        }
                    },
                    data: self.echartBar.data
                }]
            }; // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }
    },
    template: "<div v-if=\"!noData\">\r\n  <div class=\"panelTitle\">{{panelName}}</div>\r\n  <div class=\"accidentReasonStat-card\">\r\n    <div id=\"accidentReasonStat-chart\"></div>\r\n  </div>\r\n</div>\r\n\r\n<div v-else class=\"componentFailed\">\r\n  <img src=\"assets/icons/icon-noData.png\"></img>\r\n  <p>{{panelName}}\u6A21\u5757\u5C1A\u65E0\u6570\u636E\u63A5\u5165...</p>\r\n</div>"
});
