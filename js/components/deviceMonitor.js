

Vue.component('deviceMonitor', {
  props: {
    para: String
  },
  data: function data() {
    return {
      monitorURL: baseURL + "/api/equipment/elevator/elevatorMonitorInfo",
      runNum: 'N/A',
      faultNum: 'N/A',
      title: '设备监控'
    };
  },
  mounted: function mounted() {
    var that = this;
    var linkTag = document.createElement('link');
    linkTag.setAttribute('id', "linkTest");
    linkTag.setAttribute('href', "css/deviceMonitor.css");
    linkTag.setAttribute('rel', "stylesheet");
    document.body.appendChild(linkTag);
    console.log('para is ' + that.para);

    if (that.para == 'towerMonitor') {
      that.title = '塔吊监控';
    }

    if (that.para == 'elevatorMonitor') {
      that.title = '升降机监控';
    }

    axios.get(that.monitorURL, {
      params: {
        projId: projectInfo.projId
      }
    }).then(function (response) {
      console.log('deviceMonitor data is ' + JSON.stringify(response));
      if (!isEmpty(response.data.result)) {
        console.log('deviceMonitor data is not empty.');
        that.runNum = response.data.result[that.para].runNum;
        that.faultNum = response.data.result[that.para].faultNum; //console.log(response.data)
        //console.log('monitorData is ' + that.runNum + ": " + that.faultNum);
      }
    }).catch(function (error) {
      // handle error
      console.log(error);
    });
  },
  template: '\n      <el-card class="box-card" style="background:none;border:none;">\n        <el-row>\n          <el-col :span="24" style="border:0px red solid"><div class="dmTitle"><h3>{{title}}</h3></div></el-col>\n        </el-row>\n        <el-row style="padding:5px 0px;">\n          <el-col :span="12" style="border:0px red solid"><div class="dmFunctionNum">\n            <span class="numTitle">\u8FD0\u884C\u4E2D</span>\n          </div></el-col>\n          <el-col :span="12" style="border:0px red solid"><div class="dmErrorNum">\n            <span class="numTitle">\u7D2F\u8BA1\u6545\u969C</span>\n          </div></el-col>\n        </el-row>\n        <el-row style="padding:9px 0px;">\n          <el-col :span="12" style="border:0px red solid"><div class="dmFunctionNum"><img id="functionIcon" src="assets/function.png"></img>\n          </div></el-col>\n          <el-col :span="12" style="border:0px red solid"><div class="dmErrorNum"><img id="errorIcon" src="assets/error.png"></img></div></el-col>\n        </el-row>\n        <el-row style="padding-top:14px;">\n          <el-col :span="12" style="border:0px red solid"><div class="dmFunctionNum">\n            <span class="numSign">{{runNum}}</span>\n          </div></el-col>\n          <el-col :span="12" style="border:0px red solid"><div class="dmErrorNum">\n            <span class="numSign">{{faultNum}}</span>\n          </div></el-col>\n        </el-row>\n      </el-card>\n      '
});
