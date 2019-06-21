

Vue.component('summaryMap', {
  data: function data() {
    return {
      //video
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
      },

      activeName: 'second'
    };
  },
  mounted: function mounted() {
    //map
    var scriptTag = document.createElement('script');
    scriptTag.setAttribute('src', "js/sMap.js");
    document.body.appendChild(scriptTag);
    var linkTag = document.createElement('link');
    linkTag.setAttribute('href', "css/summaryMap.css");
    linkTag.setAttribute('rel', "stylesheet");
    document.body.appendChild(linkTag);

    //bim
    var linkTag = document.createElement('link');
    linkTag.setAttribute('href', "css/bim.css");
    linkTag.setAttribute('rel', "stylesheet");
    document.body.appendChild(linkTag);

    //Vidoe
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
  updated: function updated() {
    //video
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

  methods: {
    //video
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
  template: '<div class=summaryMap-card>\r\n  <el-tabs v-model=\"activeName\">\r\n      <el-tab-pane label=\"\u5DE5\u7A0B\u6307\u6325\u5E73\u9762\u56FE\" name=\"first\">\r\n        <div id=\"mapWrapper\">\r\n          <el-row style=\"background-color:rgba(2, 23, 58, 0.65)\">\r\n            <el-col :span=\"12\"><div class=\"mapTitle\"><span>\u5DE5\u7A0B\u6307\u6325\u5E73\u9762\u56FE<\/span><\/div><\/el-col>\r\n            <el-col :span=\"4\"><div class=\"mapIcon\"><img class=\"mapItem\" src=\"assets\/icon_yellowHat.png\"><\/img><span>\u5B89\u5168\u5E3D<span><\/div><\/el-col>\r\n            <el-col :span=\"4\"><div class=\"mapIcon\"><img class=\"mapItem\" src=\"assets\/icon_device.png\"><\/img><span>\u667A\u80FD\u8BBE\u5907<span><\/div><\/el-col>\r\n            <el-col :span=\"4\"><div class=\"mapIcon\"><img class=\"mapItem\" src=\"assets\/icon_video.png\"><\/img><span>\u89C6\u9891\u76D1\u63A7<span><\/div><\/el-col>\r\n          <\/el-row>\r\n          <div id=\"map\" style=\"height:93%\"><\/div>\r\n        <\/div>\r\n      <\/el-tab-pane>\r\n      <el-tab-pane label=\"\u89C6\u9891\u76D1\u63A7\" name=\"second\">\r\n        <div class=\"videoSpot-card\">\r\n          <div class=\"singleVideo\" :id=\"vCardId\">\r\n            <div class=\"dropDownDiv\">\r\n              <span class=\"dropText\">\u9009\u62E9\u89C6\u9891\u6E90<\/span>\r\n              <el-dropdown @command=\"handleCommand\">\r\n                <span class=\"el-dropdown-link\">\r\n                  {{vSource.name}}<i class=\"el-icon-arrow-down el-icon--right\"><\/i>\r\n                <\/span>\r\n                <el-dropdown-menu slot=\"dropdown\">\r\n                  <el-dropdown-item  v-for=\"item in videoSource\" :key=\"item\" :command=\"item.name\">{{item.name}}<\/el-dropdown-item>\r\n                <\/el-dropdown-menu>\r\n              <\/el-dropdown>\r\n            <\/div>\r\n            <video-js :id=\"vSpotId\" class=\"vjs-default-skin vjs-big-play-centered vjs-fill\" muted controls preload=\"auto\" width=\"100%\" height=\"100%\" loop>\r\n                <source :src=\"vSource.src\" type=\"video\/mp4\">\r\n            <\/video-js>\r\n          <\/div>\r\n        <\/div>\r\n      <\/el-tab-pane>\r\n      <el-tab-pane label=\"bim\" name=\"third\">\r\n        <div id=\"bimWrapper\">\r\n          <iframe src=\"http:\/\/139.9.6.82:8082\/bim\" height=\"100%\" width=\"100%\" style=\"background:none; width:100%; height:100%\" frameborder=\"0\"><\/iframe>\r\n        <\/div>\r\n      <\/el-tab-pane>\r\n    <\/el-tabs>\r\n  <\/div>\r\n'
});
