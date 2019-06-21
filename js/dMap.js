

var dMap = new AMap.Map('dMap', {
  mapStyle: 'amap://styles/6b3b88b76abe457a687184ab18774355',
  zoom: 25,
  //级别
  center: [104.918088, 25.112437],
  //中心点坐标
  viewMode: '3D',
  //使用3D视图
  zoomEnable: true
});
var sMapURL = baseURL + "/api/equipment/towerCrane/elevatorMonitorLocation";
var onMapItems = {};
axios.get(sMapURL, {
  params: {
    projId: projectInfo.projId
  }
}).then(function (response) {
  if (response.data.errmsg == "处理成功") {
    onMapItems = response.data.result; //console.log('onMapItems is ' + JSON.stringify(onMapItems));

    onMapItems.forEach(function (item, index) {
      addDeviceOnDmap(item);
      console.log('one device added');
    });

    if (onMapItems.length > 0) {
      dMap.setCenter([onMapItems[0].longitude, onMapItems[0].latitude]);
    }
  }
}).catch(function (error) {
  // handle error
  console.log(error);
});

var addDeviceOnDmap = function addDeviceOnDmap(oneDevice) {
  var cardDevice = "\n    <div class=\"deviceAlertWrapper\">\n      <el-card class=\"box-card\">\n        <div class=\"deviceAlertHeader darkBlue\">\n          <div id=\"deviceTitle\"><strong style=\"font-size:18px; color:white\">" + oneDevice.name + '</strong></div>\n          <span>\u4F7F\u7528\u65F6\u957F: <span style="color:#409EFF">N/A </span>\u5C0F\u65F6</span>\n        </div>\n        <div class="propertyLine lightBlue">\n            <div class="propertyItem" style="position:absolute; left:20px;"><span>\u8BBE\u5907\u7F16\u53F7\uFF1A<span style="color:#409EFF">' + oneDevice.id + '</span></span></div>\n            <div class="propertyItem" style="position:absolute; left:260px;"><span>\u64CD\u4F5C\u4EBA: <span style="color:#409EFF">N/A </span></span></div>\n        </div>\n        <div class="propertyLine lightWhite">\n            <div class="propertyItem" style="position:absolute; left:20px;"><span>\u5DE5\u4F5C\u72B6\u6001\uFF1A<span style="color:#409EFF">N/A </span></span></div>\n            <div class="propertyItem" style="position:absolute; left:260px;"><span>\u8F7D\u91CD: <span style="color:#409EFF">N/A %</span></span></div>\n        </div>\n        <div class="propertyLine lightBlue">\n            <div class="propertyItem" style="position:absolute; left:20px;"><span>\u9AD8\u5EA6\uFF1A<span style="color:#409EFF">N/A m</span></span></div>\n            <div class="propertyItem" style="position:absolute; left:260px;"><span>\u503E\u89D2: <span style="color:#409EFF">N/A \u5EA6</span></span></div>\n        </div>\n        <div class="propertyLine lightWhite">\n            <div class="propertyItem" style="position:absolute; left:20px;"><span>\u901F\u5EA6\uFF1A<span style="color:#409EFF">N/A m/s</span></span></div>\n            <div class="propertyItem" style="position:absolute; left:260px;"><span>\u697C\u5C42: <span style="color:#409EFF">N/A</span></span></div>\n        </div>\n      </el-card>\n    </div>';

  var deviceDetail = function deviceDetail(e) {
    vm.$alert(cardDevice, '', {
      dangerouslyUseHTMLString: true
    });
  };

  var contentDevice = '<img src="assets/icon_device.png" style="width:20px; height:auto;"></div>';

  if (oneDevice.longitude != null && oneDevice.longitude != undefined && oneDevice.longitude != null && oneDevice.longitude != undefined) {
    var deviceMarker = new AMap.Marker({
      content: contentDevice,
      position: [oneDevice.longitude, oneDevice.latitude] // 基点位置

    });
    deviceMarker.on('click', deviceDetail);
    dMap.add(deviceMarker);
  }
};
