

Vue.component('laborMap', {
  data: function data() {
    return {};
  },
  mounted: function mounted() {
    var scriptTag = document.createElement('script');
    scriptTag.setAttribute('src', "js/lMap.js");
    document.body.appendChild(scriptTag);
    var linkTag = document.createElement('link');
    linkTag.setAttribute('href', "css/deviceMap.css");
    linkTag.setAttribute('rel', "stylesheet");
    document.body.appendChild(linkTag);
  },
  template: '<div id="mapWrapper">\r\n  <el-row style="background-color:rgba(2, 23, 58, 0.65)">\r\n    <el-col :span="20"><div class="mapTitle"><span>\u73B0\u573A\u52B3\u52A1\u5DE5\u4EBA\u5B9A\u4F4D</span></div></el-col>\r\n    <el-col :span="4"><div class="mapIcon"><img class="mapItem" src="assets/icon_yellowHat.png"></img><span>\u52B3\u52A1\u5DE5\u4EBA<span></div></el-col>\r\n  </el-row>\r\n  <div id="lMap" style="height:93%"></div>\r\n</div>\r\n'
});
