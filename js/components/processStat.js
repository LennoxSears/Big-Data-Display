

Vue.component('processStat', {
  data: function data() {
    return {};
  },
  mounted: function mounted() {
    var myChart = echarts.init(document.getElementById('main'));
    var option = {
      tooltip: {
        trigger: 'item',
        formatter: "{b}{c} ({d}%)"
      },
      graphic: {
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
          text: '58\n工序数量',
          textAlign: 'center',
          fill: '#fff',
          fontSize: 17
        }
      },
      series: [{
        name: '',
        position: 'inner',
        hoverAnimation: false,
        selectedOffset: 0,
        hoverOffset: 0,
        color: ['#fff', 'transparent'],
        type: 'pie',
        radius: ['67%', '70%'],
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [{
          value: 68
        }, {
          value: 100 - 68
        }]
      }, {
        name: '',
        hoverAnimation: false,
        color: ['#5A99BF'],
        type: 'pie',
        radius: ['43%', '60%'],
        position: 'inner',
        label: {
          normal: {
            textStyle: {
              fontSize: 12
            },
            formatter: '{a|{a}}{abg|}{per|{d}%} \n{hr|}\n  {b|{b}：}{c} 个 ',
            padding: [100, 0],
            rich: {
              a: {
                color: '#5A99BF',
                lineHeight: 22,
                align: 'right'
              },
              hr: {
                width: '100%',
                borderWidth: 0.5,
                height: 0
              },
              b: {
                fontSize: 12,
                lineHeight: 22
              }
            }
          }
        },
        itemStyle: {
          borderWidth: 5,
          //设置border的宽度有多大
          borderColor: '#0F325D'
        },
        data: [{
          value: 335,
          name: '延时开始：'
        }, {
          value: 310,
          name: '正常完成：'
        }, {
          value: 234,
          name: '未开始：'
        }, {
          value: 135,
          name: '延时完成：'
        }]
      }]
    };
    myChart.setOption(option);
  },
  template: '\n    <div class="processContent">\n    \t<p>\u5DE5\u5E8F\u7EDF\u8BA1</p>\n    \t<div id="main" style="width:425px;height:200px"></div>\n    \t<h5>\u4EFB\u52A1\u5B8C\u6210\u7387 <span>65%<span></h5>\n    </div>'
});
