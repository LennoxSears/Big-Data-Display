

Vue.component('purchaseExp', {
    props: {
        para: String
    },
    data: function data() {
        return {
            panelName: "采购/结算金额统计",
            dataObj: {},
            noData: false,
            echartBar: {
                dataAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                data: [[], []],
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

        var url = baseURL2 + "/api/stuff/stat/amount";
        axios.get(url, {
            params: {
                projId: projectInfo.projId
            }
        }).then(function (response) {
            self.noData = false;
            console.log('purchaseExp res is: ' + JSON.stringify(response));
            if (!isEmpty(response.data.result)) {
                response.data.result.forEach(function (item, index) {
                    self.echartBar.data[0].push(item.payAmount);
                    self.echartBar.data[1].push(item.orderAmount);
                });
                self.initEcharts('purchaseExp-chart');
                //console.log('echartBar data is ' + self.echartBar.data[0] + '...' + self.echartBar.data[1]);
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
                    name: '月份',
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
                    name: '万元',
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
                        normal: { color: 'rgba(211,177,85,1)' }
                    },
                    data: self.echartBar.data[0],
                    smooth: true
                }, {
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: 'rgba(2,208,231,1)'
                        }
                    },
                    data: self.echartBar.data[1],
                    smooth: true
                }]
            }; // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }
    },
    template: '<div v-if="!noData">\r\n  <div class="panelTitle">{{panelName}}</div>\r\n  <div class="purchaseExp-card">\r\n    <div id="purchaseExp-chart"></div>\r\n  </div>\r\n</div>\r\n\r\n<div v-else class="componentFailed">\r\n  <img src="assets/icons/icon-noData.png"></img>\r\n  <p>{{panelName}}\u6A21\u5757\u5C1A\u65E0\u6570\u636E\u63A5\u5165...</p>\r\n</div>'
});
