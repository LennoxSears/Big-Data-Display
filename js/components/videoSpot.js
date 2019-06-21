

Vue.component('videoSpot', {
  data: function data() {
    return {
      vCardId: '',
      vSpotId: '',
      videoHeight: '',
      videoWidth: '',
      panelName: '',
      noData: false,
      videoSource: [],
      vSource: {
        name: 'hello',
        src: './assets/demo1.mp4'
      }
    };
  },
  updated: function updated() {
    var self = this;
    //console.log('singleVideo ID is ' + self.vCardId);
    //console.log('singleVideo is ' + document.getElementById(self.vCardId));
    self.videoHeight = document.getElementById(self.vCardId).offsetHeight;
    self.videoWidth = document.getElementById(self.vCardId).offsetWidth;
    //console.log('singleVideo width is ' + self.videoWidth);
    //console.log('singleVideo height is ' + self.videoHeight);
    console.log('video Src is ' + self.vSource.src);

    var player = videojs(self.vSpotId);
    player.play();
  },

  mounted: function mounted() {
    var self = this;
    self.vCardId = self.ID();
    self.vSpotId = self.ID();
    var linkTag = document.createElement('link');
    linkTag.setAttribute('href', "css/videoSpot.css");
    linkTag.setAttribute('rel', "stylesheet");
    document.body.appendChild(linkTag);

    //data fetching
    var url = baseURL2 + "/api/video/videoMonitor/queryAll";
    console.log('video fetching...' + url);
    axios.get(url, {
      params: {
        projId: projectInfo.projId
      }
    }).then(function (response) {
      self.noData = false;
      console.log('video res is: ' + JSON.stringify(response));
      if (!isEmpty(response.data.result)) {
        var tempObj = {};
        console.log('video res is not empty.');
        response.data.result.forEach(function (item, index) {
          item.children.forEach(function (value, key) {
            tempObj = {};
            tempObj.name = value.name;
            tempObj.src = value.sourceUrl;
            console.log('tempObj is ' + JSON.stringify(tempObj));
            self.videoSource.push(tempObj);
            console.log('videoSource length is ' + self.videoSource.length);
          });
        });

        self.vSource = self.videoSource[0];
        self.panelName = self.vSource.name;
      } else {
        self.noData = true;
      }
    }).catch(function (error) {
      self.noData = true;
      console.log(error);
    });
  },

  methods: {
    handleCommand: function handleCommand(command) {
      console.log('Handling Command.');
      var self = this;
      self.panelName = command;
      self.vSource.name = command;
      self.videoSource.forEach(function (item, index) {
        if (command == item.name) {
          document.getElementById(self.vSpotId + '_html5_api').setAttribute('src', item.src);
        }
      });
    },
    ID: function ID() {
      // Math.random should be unique because of its seeding algorithm.
      // Convert it to base 36 (numbers + letters), and grab the first 9 characters
      // after the decimal.
      return '_' + Math.random().toString(36).substr(2, 9);
    }
  },
  template: '<div v-if="!noData">\r\n  <div class="panelTitle">{{panelName}}</div>\r\n  <div class="videoSpot-card">\r\n    <div class="singleVideo" :id="vCardId">\r\n      <div class="dropDownDiv">\r\n        <span class="dropText">\u9009\u62E9\u89C6\u9891\u6E90</span>\r\n        <el-dropdown @command="handleCommand">\r\n          <span class="el-dropdown-link">\r\n            {{vSource.name}}<i class="el-icon-arrow-down el-icon--right"></i>\r\n          </span>\r\n          <el-dropdown-menu slot="dropdown">\r\n            <el-dropdown-item  v-for="item in videoSource" :key="item" :command="item.name">{{item.name}}</el-dropdown-item>\r\n          </el-dropdown-menu>\r\n        </el-dropdown>\r\n      </div>\r\n      <video-js :id="vSpotId" class="vjs-default-skin vjs-big-play-centered vjs-fill" controls preload="auto" width="100%" height="100%" loop>\r\n          <source :src="vSource.src" type="video/mp4">\r\n      </video-js>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div v-else class="componentFailed">\r\n  <img src="assets/icons/icon-noData.png"></img>\r\n  <p>{{panelName}}\u6A21\u5757\u5C1A\u65E0\u6570\u636E\u63A5\u5165...</p>\r\n</div>\r\n'
});
