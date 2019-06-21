

Vue.component('tower', {
  props: {
    para: String
  },
  data: function data() {
    return {
      towerURL: baseURL + "/api/equipment/towerCrane/towerList",
      id: "N/A ",
      useDuration: "N/A ",
      staffName: "N/A ",
      deviceCode: "N/A ",
      moments: 'N/A ',
      loads: 'N/A ',
      ranges: 'N/A ',
      windSpeed: 'N/A ',
      dipAngle: 'N/A ',
      heights: 'N/A ',
      rotation: 'N/A ',
      isOnline: "N/A ",
      towerList:[],
      towerName:'1号塔吊',
      noData:false,
      panelName:'塔吊详情'
    };
  },
  mounted: function mounted() {
    var that = this;
    console.log('para is ' + that.para);
    axios.get(that.towerURL, {
      params: {
        projId: projectInfo.projId
      }
    }).then(function (response) {
      console.log('tower data is ' + JSON.stringify(response));

      if (!isEmpty(response.data.result)) {
        //console.log('tower ' + that.para + ' data is not empty.');
        response.data.result.forEach((item, index) => {
          that.towerList.push({item:item, index:index});
        });
        console.log('towerList is ' + JSON.stringify(that.towerList));
        that.id = response.data.result[0].id;
        that.deviceCode = response.data.result[0].deviceCode;
        that.useDuration = response.data.result[0].useDuration;
        that.staffName = response.data.result[0].staffName;
        that.loads = response.data.result[0].loads;
        that.heights = response.data.result[0].heights;
        that.dipAngle = response.data.result[0].dipAngle;
        that.windSpeed = response.data.result[0].windSpeed;
        that.isOnline = response.data.result[0].isOnline;
        that.moments = response.data.result[0].moments;
        that.ranges = response.data.result[0].ranges;
        that.rotation = response.data.result[0].rotation;
      }
    }).catch(function (error) {
      // handle error
      console.log(error);
    });
  },

  methods: {
    towerCommand:function towerCommand(command) {
      var that = this;
      that.towerName = (command + 1) + '号塔吊';
      console.log('command is ' + that.towerList[command]);
      that.id = that.towerList[command].item.id;
      that.deviceCode = that.towerList[command].item.deviceCode;
      that.useDuration = that.towerList[command].item.useDuration;
      that.staffName = that.towerList[command].item.staffName;
      that.loads = that.towerList[command].item.loads;
      that.heights = that.towerList[command].item.heights;
      that.dipAngle = that.towerList[command].item.dipAngle;
      that.windSpeed = that.towerList[command].item.windSpeed;
      that.isOnline = that.towerList[command].item.isOnline;
      that.moments = that.towerList[command].item.moments;
      that.ranges = that.towerList[command].item.ranges;
      that.rotation = that.towerList[command].item.rotation;
    }
  },
  template: "<div v-if=\"!noData\">\r\n<div class=\"deviceAlertWrapper scrollDiv\" style=\"height:100%;\">\r\n  <el-card class=\"box-card\" style=\"background:none;border:none;\">\r\n    <div class=\"deviceAlertHeader\">\r\n      <div id=\"deviceTitle\" style=\"margin-bottom:0px\">\r\n        <el-dropdown @command=\"towerCommand\">\r\n            <span class=\"el-dropdown-link\" style=\"font-size:18px\">\r\n              {{towerName}}<i class=\"el-icon-arrow-down el-icon--right\" style=\"font-size:18px\"><\/i>\r\n            <\/span>\r\n            <el-dropdown-menu slot=\"dropdown\">\r\n              <el-dropdown-item v-for=\"item in towerList\" :key=\"item\" :command=\"item.index\">{{item.index + 1}}\u53F7\u5854\u540A<\/el-dropdown-item>\r\n            <\/el-dropdown-menu>\r\n        <\/el-dropdown>\r\n      <\/div>\r\n      <span>\u4F7F\u7528\u65F6\u957F: <span style=\"color:#409EFF\">{{useDuration}}<\/span>\u5C0F\u65F6<\/span>\r\n    <\/div>\r\n    <div class=\"propertyLine lightBlue\" style=\"color:white\">\r\n        <div class=\"propertyItem\" style=\"position:absolute; left:20px;\"><span>\u8BBE\u5907\u7F16\u53F7\uFF1A<span style=\"color:#409EFF\">{{deviceCode}}<\/span><\/span><\/div>\r\n        <div class=\"propertyItem\" style=\"position:absolute; left:260px;\"><span>\u64CD\u4F5C\u4EBA: <span style=\"color:#409EFF\">{{staffName}}<\/span><\/span><\/div>\r\n    <\/div>\r\n    <div class=\"propertyLine\" style=\"color:white\">\r\n        <div class=\"propertyItem\" style=\"position:absolute; left:20px;\"><span>\u5DE5\u4F5C\u72B6\u6001\uFF1A<span style=\"color:#409EFF\">{{isOnline}}<\/span><\/span><\/div>\r\n        <div class=\"propertyItem\" style=\"position:absolute; left:260px;\"><span>\u529B\u77E9: <span style=\"color:#409EFF\">{{moments}}%<\/span><\/span><\/div>\r\n    <\/div>\r\n    <div class=\"propertyLine lightBlue\" style=\"color:white\">\r\n        <div class=\"propertyItem\" style=\"position:absolute; left:20px;\"><span>\u8F7D\u91CD\uFF1A<span style=\"color:#409EFF\">{{loads}}m<\/span><\/span><\/div>\r\n        <div class=\"propertyItem\" style=\"position:absolute; left:260px;\"><span>\u5E45\u5EA6: <span style=\"color:#409EFF\">{{ranges}}\u5EA6<\/span><\/span><\/div>\r\n    <\/div>\r\n    <div class=\"propertyLine\" style=\"color:white\">\r\n        <div class=\"propertyItem\" style=\"position:absolute; left:20px;\"><span>\u98CE\u901F\uFF1A<span style=\"color:#409EFF\">{{windSpeed}}m\/s<\/span><\/span><\/div>\r\n        <div class=\"propertyItem\" style=\"position:absolute; left:260px;\"><span>\u503E\u5EA6: <span style=\"color:#409EFF\">{{dipAngle}}\u5EA6<\/span><\/span><\/div>\r\n    <\/div>\r\n    <div class=\"propertyLine lightBlue\" style=\"color:white\">\r\n        <div class=\"propertyItem\" style=\"position:absolute; left:20px;\"><span>\u9AD8\u5EA6\uFF1A<span style=\"color:#409EFF\">{{heights}}m<\/span><\/span><\/div>\r\n        <div class=\"propertyItem\" style=\"position:absolute; left:260px;\"><span>\u89D2\u5EA6: <span style=\"color:#409EFF\">{{rotation}}\u500D<\/span><\/span><\/div>\r\n    <\/div>\r\n  <\/el-card>\r\n<\/div>\r\n\r\n<\/div>\r\n\r\n<div v-else class=\"componentFailed\">\r\n  <img src=\"assets\/icons\/icon-noData.png\"><\/img>\r\n  <p>{{panelName}}\u6A21\u5757\u5C1A\u65E0\u6570\u636E\u63A5\u5165...<\/p>\r\n<\/div>"
});
