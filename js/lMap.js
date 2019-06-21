

var lMap = new AMap.Map('lMap', {
  mapStyle: 'amap://styles/6b3b88b76abe457a687184ab18774355',
  zoom: 25,
  //级别
  center: [104.918088, 25.112437],
  //中心点坐标
  viewMode: '3D',
  //使用3D视图
  zoomEnable: true
});
var lMapURL = baseURL + "/api/proj/bigDataDisplay/projectMap";
var onMapItems = {};
axios.get(lMapURL, {
  params: {
    projId: projectInfo.projId
  }
}).then(function (response) {
  console.log('summaryMap data is ' + JSON.stringify(response));
  if (!isEmpty(response.data.result)) {
    console.log('summaryMap data is not empty.');
    onMapItems = response.data.result; //console.log('onMapItems is ' + JSON.stringify(onMapItems));

    onMapItems.safetyHat.forEach(function (item, index) {
      if (!isEmpty(item.longitude) && !isEmpty(item.latitude)) {
        addHat(item);
        console.log('one hat added');
      }
    });
    onMapItems.equipment.forEach(function (item, index) {
      if (!isEmpty(item.longitude) && !isEmpty(item.latitude)) {
        //addDevice(item);
        console.log('one device added');
      }
    });
    onMapItems.video.forEach(function (item, index) {
      if (!isEmpty(item.longitude) && !isEmpty(item.latitude)) {
        //addVideo(item);
        console.log('one video added');
      }
    });

    console.log(onMapItems.equipment.length + ' equipments. ' + onMapItems.safetyHat.length + ' hats. ' + onMapItems.video.length + ' videos. ');
    if (onMapItems.safetyHat.length > 0) {
      console.log('got safetyHat.');
      if (!isEmpty(onMapItems.safetyHat[0].longitude) && !isEmpty(onMapItems.safetyHat[0].latitude)) {
        lMap.setCenter([onMapItems.safetyHat[0].longitude, onMapItems.safetyHat[0].latitude]);
      }
    }
    if (onMapItems.equipment.length > 0) {
      if (!isEmpty(onMapItems.equipment[0].longitude) && !isEmpty(onMapItems.equipment[0].latitude)) {
        lMap.setCenter([onMapItems.equipment[0].longitude, onMapItems.equipment[0].latitude]);
      }
    }
    if (onMapItems.video.length > 0) {
      if (!isEmpty(onMapItems.video[0].longitude) && !isEmpty(onMapItems.video[0].latitude)) {
        lMap.setCenter([onMapItems.video[0].longitude, onMapItems.video[0].latitude]);
      }
    }
  }
}).catch(function (error) {
  // handle error
  console.log(error);
});

var addHat = function addHat(oneHat) {
  var cardYellowHat = "\n    <div class=\"yellowHatAlertWrapper\">\n      <img src=\"" + 'http://ryoma.oss-cn-hangzhou.aliyuncs.com/' + oneHat.personPhotoId + "\" class=\"yellowHatPhoto\"></img>\n      <span id=\"yellowHatName\">" + oneHat.name + "</span></br>\n      <span id=\"yellowHatCorp\">" + oneHat.laborCompany + '-' + oneHat.teamsType + "</span>\n    </div>";

  var yellowHatDetail = function yellowHatDetail(e) {
    vm.$alert(cardYellowHat, '', {
      dangerouslyUseHTMLString: true
    });
  };

  var contentYelloHat = '<img src="assets/icon_yellowHat.png" style="width:20px; height:auto;"></div>';
  console.log('oneMapSpot is ' + oneHat.longitude + ';' + oneHat.latitude);

  if (oneHat.longitude != null && oneHat.longitude != undefined && oneHat.longitude != null && oneHat.longitude != undefined) {
    var yellowHatMarker = new AMap.Marker({
      content: contentYelloHat,
      position: [oneHat.longitude, oneHat.latitude] // 基点位置

    });
    yellowHatMarker.on('click', yellowHatDetail);
    lMap.add(yellowHatMarker);
  }
};

var addVideo = function addVideo(oneVideo) {
  var cardVideo = "<div class=\"popup\">\n <img @click=\"removeVideo\" class=\"gridItemClose\" src=\"assets/icon_close.png\"></img>\n<video-js id=\"my_video_1\" class=\"vjs-default-skin\" controls preload=\"auto\" width=\"720\" height=\"480\">\n    <source src=\"https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8\" type=\"application/x-mpegURL\">\n    </video-js>\n</div>\n";

  var videoDetail = function videoDetail(e) {

    var divTag = document.createElement('div');
    divTag.setAttribute('class', "overlay");
    divTag.setAttribute('id', "popOne");
    divTag.innerHTML = cardVideo;
    document.body.appendChild(divTag);

    var scriptTag = document.createElement('script');
    scriptTag.innerHTML = "var player = videojs('my_video_1')";
    scriptTag.setAttribute('id', 'popScript');
    document.body.appendChild(scriptTag);

    window.location = "#popOne";

    /*vm.$alert('', '视频尚未接入。', {
      dangerouslyUseHTMLString: true
    });*/
  };

  var contentVideo = '<img src="assets/icon_video.png" style="width:20px; height:auto;"></div>';
  console.log('oneMapSpot is ' + oneVideo.longitude + ';' + oneVideo.latitude);

  if (oneVideo.longitude != null && oneVideo.longitude != undefined && oneVideo.longitude != null && oneVideo.longitude != undefined) {
    var videoMarker = new AMap.Marker({
      content: contentVideo,
      position: [oneVideo.longitude, oneVideo.latitude] // 基点位置

    });
    videoMarker.on('click', videoDetail);
    lMap.add(videoMarker);
  }
};

var addDevice = function addDevice(oneDevice) {
  var cardDevice = "\n    <div class=\"deviceAlertWrapper\">\n      <el-card class=\"box-card\">\n        <div class=\"deviceAlertHeader darkBlue\">\n          <div id=\"deviceTitle\"><strong style=\"font-size:18px; color:white\">" + oneDevice.name + '</strong></div>\n          <span>\u4F7F\u7528\u65F6\u957F: <span style="color:#409EFF">N/A </span>\u5C0F\u65F6</span>\n        </div>\n        <div class="propertyLine lightBlue">\n            <div class="propertyItem" style="position:absolute; left:20px;"><span>\u8BBE\u5907\u7F16\u53F7\uFF1A<span style="color:#409EFF">' + oneDevice.id + '</span></span></div>\n            <div class="propertyItem" style="position:absolute; left:260px;"><span>\u64CD\u4F5C\u4EBA: <span style="color:#409EFF">N/A </span></span></div>\n        </div>\n        <div class="propertyLine lightWhite">\n            <div class="propertyItem" style="position:absolute; left:20px;"><span>\u5DE5\u4F5C\u72B6\u6001\uFF1A<span style="color:#409EFF">N/A </span></span></div>\n            <div class="propertyItem" style="position:absolute; left:260px;"><span>\u8F7D\u91CD: <span style="color:#409EFF">N/A %</span></span></div>\n        </div>\n        <div class="propertyLine lightBlue">\n            <div class="propertyItem" style="position:absolute; left:20px;"><span>\u9AD8\u5EA6\uFF1A<span style="color:#409EFF">N/A m</span></span></div>\n            <div class="propertyItem" style="position:absolute; left:260px;"><span>\u503E\u89D2: <span style="color:#409EFF">N/A \u5EA6</span></span></div>\n        </div>\n        <div class="propertyLine lightWhite">\n            <div class="propertyItem" style="position:absolute; left:20px;"><span>\u901F\u5EA6\uFF1A<span style="color:#409EFF">N/A m/s</span></span></div>\n            <div class="propertyItem" style="position:absolute; left:260px;"><span>\u697C\u5C42: <span style="color:#409EFF">N/A </span></span></div>\n        </div>\n      </el-card>\n    </div>';

  var deviceDetail = function deviceDetail(e) {
    vm.$alert(cardDevice, '', {
      dangerouslyUseHTMLString: true
    });
  };

  var contentDevice = '<img src="assets/icon_device.png" style="width:20px; height:auto;"></div>';
  console.log('oneMapSpot is ' + oneDevice.longitude + ';' + oneDevice.latitude);

  if (oneDevice.longitude != null && oneDevice.longitude != undefined && oneDevice.longitude != null && oneDevice.longitude != undefined) {
    var deviceMarker = new AMap.Marker({
      content: contentDevice,
      position: [oneDevice.longitude, oneDevice.latitude] // 基点位置

    });
    deviceMarker.on('click', deviceDetail);
    lMap.add(deviceMarker);
  }
};
