

Vue.component('qualityPhoto', {
  data: function data() {
    return {
      panelName: '质量巡检问题照片',
      noData: false,
      picItems: ['assets/carouselPics/1.png', 'assets/carouselPics/2.png', 'assets/carouselPics/3.png', 'assets/carouselPics/4.png', 'assets/carouselPics/5.png', 'assets/carouselPics/6.png', 'assets/carouselPics/6.png', 'assets/carouselPics/6.png', 'assets/carouselPics/6.png', 'assets/carouselPics/6.png', 'assets/carouselPics/6.png']
    };
  },
  mounted: function mounted() {
    var self = this;
    var linkTag = document.createElement('link');
    linkTag.setAttribute('href', "css/qualityPhoto.css");
    linkTag.setAttribute('rel', "stylesheet");
    document.body.appendChild(linkTag);

    var url = baseURL2 + "/api/quality/count/selectObjectToCount";
    axios.get(url, {
      params: {
        projId: projectInfo.projId
      }
    }).then(function (response) {
      self.noData = false;
      console.log('qualityPhoto res is: ' + JSON.stringify(response));
      if (!isEmpty(response.data.result.imageList)) {
        self.picItems.length = 0;
        response.data.result.imageList.forEach(function (item, index) {
          self.picItems.push(baseURL2 + '/api/file/down?fid=' + item.fileId);
        });
      } else {
        self.noData = true;
      }
    }).catch(function (error) {
      self.noData = true;
      console.log(error);
    });
  },

  template: '<div v-if="!noData">\r\n  <div class="panelTitle">{{panelName}}</div>\r\n  <div class="carousel-card">\r\n    <el-carousel height="600px" indicator-position="none">\r\n     <el-carousel-item v-for="item in picItems" :key="item">\r\n       <img class="carouselImg" :src="item"></img>\r\n     </el-carousel-item>\r\n    </el-carousel>\r\n    <div class="horizontal-scroll-wrapper squares">\r\n      <div v-for="item in picItems" :key="item">\r\n        <img :src="item" style="width:100px; height:100px"></img>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div v-else class="componentFailed">\r\n  <img src="assets/icons/icon-noData.png"></img>\r\n  <p>{{panelName}}\u6A21\u5757\u5C1A\u65E0\u6570\u636E\u63A5\u5165...</p>\r\n</div>\r\n'
});
