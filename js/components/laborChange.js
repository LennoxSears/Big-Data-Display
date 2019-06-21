

Vue.component('laborChange', {
    props: {
        para: String
    },
    data: function data() {
        return {
            panelName: "现场人数变化趋势",
            dataObj: {},
            noData: false,
            echartBar: {
                dataAxis: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
                data: [[]],
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

        var url = baseURL2 + "/api/labor/laborStatistics/projRealAttend";

        axios.get(url, {
            params: {
                projId: projectInfo.projId
            }
        }).then(function (response) {
            self.noData = false;
            console.log('laborChange res is: ' + JSON.stringify(response));
            if (!isEmpty(response.data.result)) {
                self.echartBar.data[0].length = 0;
                response.data.result.forEach(function (item, index) {
                    self.echartBar.data[0].push(item.peoJobCount);
                });
                self.initEcharts('laborChange-chart');
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
                    type: 'category',
                    name: '时刻',
                    nameLocation: 'end',
                    nameTextStyle: {
                        color: '#fff'
                    },
                    data: self.echartBar.dataAxis,
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
                    name: '人数',
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
                    type: 'line',
                    itemStyle: {
                        normal: { color: 'rgba(75,137,225,0.3)' }
                    },
                    data: self.echartBar.data[0],
                    smooth: true,
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#4B89E1'
                            }, {
                                offset: 1,
                                color: '#6CB3DB'
                            }])
                        }
                    }
                }]
            }; // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }
    },
    template: '<div v-if="!noData">\r\n  <div class="panelTitle">{{panelName}}</div>\r\n  <div class="laborChange-card">\r\n    <div id="laborChange-chart"></div>\r\n  </div>\r\n</div>\r\n\r\n<div v-else class="componentFailed">\r\n  <img src="assets/icons/icon-noData.png"></img>\r\n  <p>{{panelName}}\u6A21\u5757\u5C1A\u65E0\u6570\u636E\u63A5\u5165...</p>\r\n</div>\r\n'
});
