

Vue.component('elevator', {
  props: {
    para: String
  },
  data: function data() {
    return {
      elevatorURL: baseURL + "/api/equipment/elevator/elevatorList",
      id: "N/A ",
      useDuration: "N/A ",
      staffName: "N/A ",
      deviceCode: "N/A ",
      loadd: 'N/A ',
      heigh: 'N/A ',
      dipAngle: 'N/A ',
      speed: 'N/A ',
      floor: 'N/A ',
      windSpeed: 'N/A ',
      windGrade: 'N/A ',
      innerDoorStatus: "N/A ",
      outerDoorStatus: "N/A ",
      isOnline: 'N/A ',
      elevatorList:[],
      elevatorName:'1号施工电梯',
      panelName:'施工电梯详情',
      noData:false,
    };
  },
  mounted: function mounted() {
    var that = this;
    console.log('para is ' + that.para);
    axios.get(that.elevatorURL, {
      params: {
        projId: projectInfo.projId
      }
    }).then(function (response) {
      console.log('elevator data is: ' + JSON.stringify(response.data.result));

      if (!isEmpty(response.data.result[0])) {
        that.noData = false;
        //console.log('elevator ' + that.para + 'data is not empty.');

        response.data.result.forEach((item, index) => {
          that.elevatorList.push({item:item, index:index});
        });

        that.id = response.data.result[0].id;
        that.deviceCode = response.data.result[0].deviceCode;
        that.useDuration = response.data.result[0].useDuration;
        that.staffName = response.data.result[0].staffName;
        that.loadd = response.data.result[0].loadd;
        that.heigh = response.data.result[0].heigh;
        that.dipAngle = response.data.result[0].dipAngle;
        that.speed = response.data.result[0].speed;
        that.floor = response.data.result[0].floor;
        that.windSpeed = response.data.result[0].windSpeed;
        that.windGrade = response.data.result[0].windGrade;
        that.innerDoorStatus = response.data.result[0].innerDoorStatus;
        that.outerDoorStatus = response.data.result[0].outerDoorStatus;
        that.isOnline = response.data.result[0].isOnline;
      }
      else {
        that.noData = true;
      }
    }).catch(function (error) {
      // handle error
      that.noData = true;
      console.log(error);
    });
  },
  methods: {
    eleCommand:function eleCommand(command) {
      var self = this;
      self.elevatorName = (command + 1) + '号施工电梯';

      that.id = self.elevatorList[command].item.id;
      that.deviceCode = self.elevatorList[command].item.deviceCode;
      that.useDuration = self.elevatorList[command].item.useDuration;
      that.staffName = self.elevatorList[command].item.staffName;
      that.loads = self.elevatorList[command].item.loads;
      that.heights = self.elevatorList[command].item.heights;
      that.dipAngle = self.elevatorList[command].item.dipAngle;
      that.windSpeed = self.elevatorList[command].item.windSpeed;
      that.isOnline = self.elevatorList[command].item.isOnline;
      that.moments = self.elevatorList[command].item.moments;
      that.ranges = self.elevatorList[command].item.ranges;
      that.rotation = self.elevatorList[command].item.rotation;
    }
  },
  template: "<div v-if=\"!noData\">\r\n<div class=\"deviceAlertWrapper scrollDiv\" style=\"height:100%;\">\r\n  <el-card class=\"box-card\" style=\"background:none;border:none;\">\r\n    <div class=\"deviceAlertHeader\">\r\n      <div id=\"deviceTitle\" style=\"margin-bottom:0px\">\r\n        <el-dropdown @command=\"eleCommand\">\r\n            <span class=\"el-dropdown-link\" style=\"font-size:18px\">\r\n              {{elevatorName}}<i class=\"el-icon-arrow-down el-icon--right\" style=\"font-size:18px\"><\/i>\r\n            <\/span>\r\n            <el-dropdown-menu slot=\"dropdown\">\r\n              <el-dropdown-item v-for=\"item in elevatorList\" :key=\"item\" :command=\"item.index\">{{item.index + 1}}\u53F7\u5854\u540A<\/el-dropdown-item>\r\n            <\/el-dropdown-menu>\r\n        <\/el-dropdown>\r\n      <\/div>\r\n      <span>\u4F7F\u7528\u65F6\u957F: <span style=\"color:#409EFF\">{{useDuration}}<\/span>\u5C0F\u65F6<\/span>\r\n    <\/div>\r\n    <div class=\"propertyLine lightBlue\" style=\"color:white\">\r\n        <div class=\"propertyItem\" style=\"position:absolute; left:20px;\"><span>\u8BBE\u5907\u7F16\u53F7\uFF1A<span style=\"color:#409EFF\">{{deviceCode}}<\/span><\/span><\/div>\r\n        <div class=\"propertyItem\" style=\"position:absolute; left:260px;\"><span>\u64CD\u4F5C\u4EBA: <span style=\"color:#409EFF\">{{staffName}}<\/span><\/span><\/div>\r\n    <\/div>\r\n    <div class=\"propertyLine\" style=\"color:white\">\r\n        <div class=\"propertyItem\" style=\"position:absolute; left:20px;\"><span>\u5DE5\u4F5C\u72B6\u6001\uFF1A<span style=\"color:#409EFF\">{{isOnline}}<\/span><\/span><\/div>\r\n        <div class=\"propertyItem\" style=\"position:absolute; left:260px;\"><span>\u8F7D\u91CD: <span style=\"color:#409EFF\">{{loadd}}\u5428<\/span><\/span><\/div>\r\n    <\/div>\r\n    <div class=\"propertyLine lightBlue\" style=\"color:white\">\r\n        <div class=\"propertyItem\" style=\"position:absolute; left:20px;\"><span>\u9AD8\u5EA6\uFF1A<span style=\"color:#409EFF\">{{heigh}}m<\/span><\/span><\/div>\r\n        <div class=\"propertyItem\" style=\"position:absolute; left:260px;\"><span>\u503E\u89D2: <span style=\"color:#409EFF\">{{dipAngle}}\u5EA6<\/span><\/span><\/div>\r\n    <\/div>\r\n    <div class=\"propertyLine\" style=\"color:white\">\r\n        <div class=\"propertyItem\" style=\"position:absolute; left:20px;\"><span>\u901F\u5EA6\uFF1A<span style=\"color:#409EFF\">{{speed}}m\/s<\/span><\/span><\/div>\r\n        <div class=\"propertyItem\" style=\"position:absolute; left:260px;\"><span>\u697C\u5C42: <span style=\"color:#409EFF\">{{floor}}<\/span><\/span><\/div>\r\n    <\/div>\r\n    <div class=\"propertyLine lightBlue\" style=\"color:white\">\r\n        <div class=\"propertyItem\" style=\"position:absolute; left:20px;\"><span>\u98CE\u901F\uFF1A<span style=\"color:#409EFF\">{{windSpeed}}m\/s<\/span><\/span><\/div>\r\n        <div class=\"propertyItem\" style=\"position:absolute; left:260px;\"><span>\u98CE\u5411: <span style=\"color:#409EFF\">{{windGrade}}\u500D<\/span><\/span><\/div>\r\n    <\/div>\r\n    <div class=\"propertyLine\" style=\"color:white\">\r\n        <div class=\"propertyItem\" style=\"position:absolute; left:20px;\"><span>\u5185\u7B3C\u95E8\uFF1A<span style=\"color:#409EFF\">{{innerDoorStatus}}<\/span><\/span><\/div>\r\n        <div class=\"propertyItem\" style=\"position:absolute; left:260px;\"><span>\u5916\u7B3C\u95E8: <span style=\"color:#409EFF\">{{outerDoorStatus}}<\/span><\/span><\/div>\r\n    <\/div>\r\n  <\/el-card>\r\n<\/div>\r\n<\/div>\r\n\r\n<div v-else class=\"componentFailed\">\r\n  <img src=\"assets\/icons\/icon-noData.png\"><\/img>\r\n  <p>{{panelName}}\u6A21\u5757\u5C1A\u65E0\u6570\u636E\u63A5\u5165...<\/p>\r\n<\/div>"
});
