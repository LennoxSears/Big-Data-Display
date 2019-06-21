

Vue.component('projectStat', {
  data: function data() {
    return {
      panelName: '项目信息',
      projStat: {
        name: '昆明师范大学项目管理平台',
        area: '122212 m2',
        price: '63, 466, 721元',
        buildCompany: '贵阳市某建筑单位',
        designCompany: '贵阳市某设计单位',
        monitorCompany: '贵阳市某监理单位',
        constructCompany: '贵阳市某施工单位',
        superviseCompany: '黔西南州住建局'
      },
      noData: false
    };
  },
  mounted: function mounted() {
    var self = this;
    var linkTag = document.createElement('link');
    linkTag.setAttribute('href', "css/projectStat.css");
    linkTag.setAttribute('rel', "stylesheet");
    document.body.appendChild(linkTag);

    var url = baseURL2 + "/api/proj/bigDataDisplay/getProjInfo";

    axios.get(url, {
      params: {
        projId: projectInfo.projId
      }
    }).then(function (response) {
      self.noData = false;
      console.log('projectInfo res is: ' + JSON.stringify(response));
      if (!isEmpty(response.data.result)) {
        console.log('projectInfo is not empty.');
        self.projStat.name = response.data.result[0].projName;
        self.projStat.area = response.data.result[0].totalArea + 'm2';
        self.projStat.price = response.data.result[0].constructionCost + '万元';
        self.projStat.buildCompany = response.data.result[0].constructionUnit;
        self.projStat.designCompany = response.data.result[0].designUnit;
        self.projStat.monitorCompany = response.data.result[0].supervisorUnit;
        self.projStat.constructCompany = response.data.result[0].builderUnit;
        self.projStat.superviseCompany = response.data.result[0].supervisionUnit;
      } else {
        self.noData = true;
      }
    }).catch(function (error) {
      self.noData = true;
      console.log(error);
    });
  },

  template: '<div v-if="!noData">\r\n  <div class="panelTitle">{{panelName}}</div>\r\n  <el-card class="project-card">\r\n    <div class="projectText projectItem">\r\n      \u9879\u76EE\u540D\u79F0\uFF1A{{projStat.name}}\r\n    </div>\r\n    <div class="projectText projectItem">\r\n      \u603B\u5EFA\u7B51\u9762\u79EF\uFF1A{{projStat.area}}\r\n    </div>\r\n    <div class="projectText projectItem">\r\n      \u5DE5\u7A0B\u9020\u4EF7\uFF1A{{projStat.price}}\r\n    </div>\r\n    <div class="projectText projectItem">\r\n      \u5EFA\u8BBE\u5355\u4F4D\uFF1A{{projStat.buildCompany}}\r\n    </div>\r\n    <div class="projectText projectItem">\r\n      \u8BBE\u8BA1\u5355\u4F4D\uFF1A{{projStat.designCompany}}\r\n    </div>\r\n    <div class="projectText projectItem">\r\n      \u76D1\u7406\u5355\u4F4D\uFF1A{{projStat.monitorCompany}}\r\n    </div>\r\n    <div class="projectText projectItem">\r\n      \u65BD\u5DE5\u5355\u4F4D\uFF1A{{projStat.constructCompany}}\r\n    </div>\r\n    <div class="projectText projectItem">\r\n      \u52D8\u5BDF\u5355\u4F4D\uFF1A{{projStat.superviseCompany}}\r\n    </div>\r\n  </el-card>\r\n</div>\r\n\r\n<div v-else class="componentFailed">\r\n  <img src="assets/icons/icon-noData.png"></img>\r\n  <p>{{panelName}}\u6A21\u5757\u5C1A\u65E0\u6570\u636E\u63A5\u5165...</p>\r\n</div>\r\n'
});
