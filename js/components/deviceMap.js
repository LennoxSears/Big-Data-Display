

Vue.component('deviceMap', {
  data: function data() {
    return {};
  },
  mounted: function mounted() {
    var scriptTag = document.createElement('script');
    scriptTag.setAttribute('src', "js/dMap.js");
    document.body.appendChild(scriptTag);
    var linkTag = document.createElement('link');
    linkTag.setAttribute('id', "linkTest");
    linkTag.setAttribute('href', "css/deviceMap.css");
    linkTag.setAttribute('rel', "stylesheet");
    document.body.appendChild(linkTag);
  },
  template: '\n    <div id="mapWrapper">\n      <el-row style="background-color:rgba(2, 23, 58, 0.65); border:0px solid red">\n        <el-col :span="12"><div class="mapTitle" style="border:0px solid blue"><span>\u8BBE\u5907\u5730\u56FE</span></div></el-col>\n        <el-col :span="6"><div class="mapIcon" style="border:0px solid blue"><img class="mapItem" src="assets/icon_tower.png"></img><span>\u5854\u540A<span></div></el-col>\n        <el-col :span="6"><div class="mapIcon" style="border:0px solid blue"><img class="mapItem" src="assets/icon_elevator.png"></img><span>\u65BD\u5DE5\u7535\u68AF<span></div></el-col>\n      </el-row>\n      <div id="dMap"></div>\n    </div>\n  '
});
