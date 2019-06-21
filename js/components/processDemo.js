

Vue.component('processDemo', {
  data: function data() {
    return {};
  },
  mounted: function mounted() {
    var linkTag = document.createElement('link');
    linkTag.setAttribute('href', "css/processDemo.css");
    linkTag.setAttribute('rel', "stylesheet");
    document.body.appendChild(linkTag);
  },
  template: "<div id=\"processDemoWrapper\">\r\n  \r\n<\/div>"
});
