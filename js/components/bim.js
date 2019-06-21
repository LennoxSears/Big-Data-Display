

Vue.component('bim', {
  data: function data() {
    return {};
  },
  mounted: function mounted() {
    var linkTag = document.createElement('link');
    linkTag.setAttribute('href', "css/bim.css");
    linkTag.setAttribute('rel', "stylesheet");
    document.body.appendChild(linkTag);
  },
  template: "<div id=\"bimWrapper\">\r\n  <iframe src=\"http:\/\/139.9.6.82:8082\/bim\" height=\"100%\" width=\"100%\" style=\"background:none; width:100%; height:100%\" frameborder=\"0\"><\/iframe>\r\n<\/div>\r\n"
});
