

Vue.component('securityPhoto', {
  data: function data() {
    return {
      panelName: '安全防护',
      noData: false,
      picItems: [],
      floorList: [],
      floorIndex: 0,
      dropOne: [],
      dropTwo: [],
      dropOneTitle: '',
      dropTwoTitle: ''
    };
  },
  mounted: function mounted() {
    var self = this;
    var linkTag = document.createElement('link');
    linkTag.setAttribute('href', "css/securityPhoto.css");
    linkTag.setAttribute('rel', "stylesheet");
    document.body.appendChild(linkTag);

    self.floorList.length = 0;
    var url = baseURL2 + "/api/security/count/selectObjectToCount";
    axios.get(url, {
      params: {
        projId: projectInfo.projId
      }
    }).then(function (response) {
      self.noData = false;
      console.log('Building res is: ' + JSON.stringify(response));
      if (!isEmpty(response.data.result.floorList)) {
        self.dropOneTitle = response.data.result.floorList[0].name;
        self.floorList = response.data.result.floorList.slice(0);
        self.dropOne.length = 0;
        self.floorList.forEach(function (item, index) {
          self.dropOne.push(item.name);
        });
        self.updateFloor(self.floorList[0]);
        self.updatePic(self.floorList[0].children[0]);
      } else {
        self.noData = true;
      }
    }).catch(function (error) {
      self.noData = true;
      console.log(error);
    });
  },
  methods: {
    updatePic: function updatePic(floor) {
      var self = this;
      self.picItems.length = 0;
      url = baseURL2 + "/api/system/fileRelation/queryFileRelation";
      axios.get(url, {
        params: {
          relId: floor.realId
        }
      }).then(function (response) {
        console.log('securityPhoto res is: ' + JSON.stringify(response));
        if (!isEmpty(response.data.result)) {
          response.data.result.forEach(function (item, index) {
            self.picItems.push(baseURL2 + '/api/file/down?fid=' + item.fileId);
          });
        } else {}
      }).catch(function (error) {

        console.log(error);
      });
    },

    updateFloor: function updateFloor(building) {
      var self = this;
      self.dropOneTitle = building.name;
      self.dropTwo.length = 0;
      building.children.forEach(function (item, index) {
        self.dropTwo.push(item.realName);
      });
      self.dropOneTitle = self.dropTwo[0];
    },

    buildingDrop: function buildingDrop(command) {
      var self = this;
      self.floorList.forEach(function (item, index) {
        if (item.name == command) {
          self.floorIndex = index;
          self.dropTwo.length = 0;
          item.children.forEach(function (it, ind) {
            self.dropTwo.push(it.realName);
          });
        }
      });
      self.dropOneTitle = command;
      self.dropTwoTitle = self.dropTwo[0];
      self.updatePic(self.floorList[self.floorIndex].children[0]);
    },

    floorDrop: function floorDrop(command) {
      var self = this;
      self.dropTwoTitle = command;
      self.floorList[self.floorIndex].children.forEach(function (item, index) {
        if (item.realName == command) {
          self.updatePic(self.floorList[self.floorIndex].children[index]);
        }
      });
    }
  },

  template: '<div v-if="!noData">\r\n  <div class="panelTitle">{{panelName}}</div>\r\n  <div class="sPhoto-card">\r\n    <div class="dropDownDiv">\r\n      <el-dropdown @command="buildingDrop">\r\n        <span class="el-dropdown-link">\r\n          {{dropOneTitle}}<i class="el-icon-arrow-down el-icon--right"></i>\r\n        </span>\r\n        <el-dropdown-menu slot="dropdown">\r\n          <el-dropdown-item v-for="item in dropOne" :key="item" :command="item">{{item}}</el-dropdown-item>\r\n        </el-dropdown-menu>\r\n      </el-dropdown>\r\n      <span class="dropText">\u680B</span>\r\n      <el-dropdown @command="floorDrop">\r\n        <span class="el-dropdown-link">\r\n          {{dropTwoTitle}}<i class="el-icon-arrow-down el-icon--right"></i>\r\n        </span>\r\n        <el-dropdown-menu slot="dropdown">\r\n          <el-dropdown-item v-for="item in dropTwo" :key="item" :command="item">{{item}}</el-dropdown-item>\r\n        </el-dropdown-menu>\r\n      </el-dropdown>\r\n      <span class="dropText">\u5C42</span>\r\n    </div>\r\n    <el-carousel height="600px" indicator-position="none">\r\n     <el-carousel-item v-for="item in picItems" :key="item">\r\n       <img class="carouselImg" :src="item"></img>\r\n     </el-carousel-item>\r\n    </el-carousel>\r\n    <div class="horizontal-scroll-wrapper squares">\r\n      <div v-for="item in picItems" :key="item">\r\n        <img :src="item" style="width:100px; height:100px"></img>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div v-else class="componentFailed">\r\n  <img src="assets/icons/icon-noData.png"></img>\r\n  <p>{{panelName}}\u6A21\u5757\u5C1A\u65E0\u6570\u636E\u63A5\u5165...</p>\r\n</div>\r\n'
});
