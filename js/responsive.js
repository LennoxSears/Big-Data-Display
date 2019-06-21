

var baseURL = "http://120.78.162.216:8060";
var baseURL2 = "http://120.78.162.216:8060";
var configURL = baseURL + '/api/proj/bigDataDisplay/getProjectUserAccountConfig';
var postConfigURL = baseURL + '/api/proj/bigDataDisplay/updateProjectUserAccountConfig';
var getProjectNameURL = baseURL + '/api/proj/bigDataDisplay/getProjNameUnitName';
var initLayout = new Promise(function (resolve, reject) {
  resolve();
}); //Get parameters from url

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });
  return vars;
}

function getUrlParam(parameter, defaultvalue) {
  var urlparameter = defaultvalue;

  if (window.location.href.indexOf(parameter) > -1) {
    urlparameter = getUrlVars()[parameter];
  }

  return urlparameter;
}

var projectInfo = {};
projectInfo.projId = getUrlParam('projId', '');
projectInfo.userAccount = getUrlParam('userAccount', ''); //Showing Clock on page

function showTime() {
  var date = new Date();
  var h = date.getHours(); // 0 - 23

  var m = date.getMinutes(); // 0 - 59

  var s = date.getSeconds(); // 0 - 59

  var session = "AM";

  if (h == 0) {
    h = 12;
  }

  if (h > 12) {
    h = h - 12;
    session = "PM";
  }

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  var time = h + ":" + m + ":" + s + " " + session;
  document.getElementById("clockDisplay").innerText = time;
  document.getElementById("clockDisplay").textContent = time;
  setTimeout(showTime, 1000);
}

showTime();
var vm;

var vueConstruct = function vueConstruct() {
  vm = new Vue({
    el: '#app',
    data: {
      allPanels:[],
      chosenPanel:'选择面板',
      addItem:{},
      currentPanel: '',
      layoutOption: {
        layout: [],
        is_draggable: false,
        is_resizable: false,
        responsive: true
      },
      index: 0,
      editing: false,
      menu: {
        projectSummary: 1,
        videoSurveillance: 1,
        qualityManagement: 1,
        securityManagement: 1,
        progressManagement: 1,
        bim: 1,
        materialManagement: 1,
        labors: 1,
        greenConstruction: 1,
        intelligentDevice: 1
      },
      project: {
        name: 'N/A',
        companyName: 'N/A'
      }
    },
    created: function created() {
      var that = this; //get user's layout config

      console.log('configURL is ' + configURL);
      //Fetch AllPanels
      axios.get(configURL, {
        params: {
          projId: '0',
          userAccount: 'default'
        }
      }).then(function(res) {
        that.allPanels = JSON.parse(res.data.result.content).panelList.slice(0);
      }).catch(function(err) {
        console.log(err);
      });

      axios.get(configURL, {
        params: {
          projId: projectInfo.projId,
          userAccount: projectInfo.userAccount
        }
      }).then(function (response) {

        //collectAllPanels


        // handle success
        //console.log('user layout res is ' + JSON.stringify(response.data));

        if (response.data.result == null || response.data.result.content == null) {
          axios.get(configURL, {
            params: {
              projId: '0',
              userAccount: 'default'
            }
          }).then(function (res) {
            //console.log('default layout res is ' + JSON.stringify(res.data));

            console.log(res.data);
            that.currentPanel = JSON.parse(res.data.result.content).defaultLayoutSetting.currentPanel;
            that.layoutOption.layout = JSON.parse(res.data.result.content).defaultLayoutSetting[that.currentPanel].slice(0);
          });
        } else {
          that.currentPanel = JSON.parse(response.data.result.content).userLayoutSetting.currentPanel;
          that.layoutOption.layout = JSON.parse(response.data.result.content).userLayoutSetting[that.currentPanel].slice(0);
        }
      }).catch(function (error) {
        // handle error
        console.log(error);
      }); //get projectName and companyName

      axios.get(getProjectNameURL, {
        params: {
          projId: projectInfo.projId
        }
      }).then(function (response) {
        // handle success
        console.log(response.data);

        if (response.data.result == null) {} else {
          that.project.name = response.data.result.projName;
          that.project.companyName = response.data.result.unitName;
        }
      }).catch(function (error) {
        // handle error
        console.log(error);
      });
    },
    mounted: function mounted() {
      this.index = this.layoutOption.layout.length;
    },
    methods: {
      addLayoutPanel: function addLayoutPanel() {
        var self = this;
        document.getElementById('panelPop').style.display = 'block';
      },
      addGridItem: function addGridItem() {
        var self = this; //console.log("### LENGTH: " + this.layout.length);
        self.index++;
        self.layoutOption.layout.push(self.addItem);
        document.getElementById('panelPop').style.display = 'none';
      },
      intoLayoutSetting: function intoLayoutSetting() {
        var that = this;
        this.editing = true; //that.layoutOption.is_resizable = true;

        this.layoutOption.is_draggable = true;
      },
      saveLayoutSetting: function saveLayoutSetting() {
        var that = this;
        var temp; //get userLayoutSetting first

        axios.get(configURL, {
          params: {
            projId: projectInfo.projId,
            userAccount: projectInfo.userAccount
          }
        }).then(function (response) {
          // handle success
          console.log(response.data);

          if (response.data.result == null || response.data.result.content == null) {
            axios.get(configURL, {
              params: {
                projId: '0',
                userAccount: 'default'
              }
            }).then(function (res) {
              console.log(res.data.result);
              temp = JSON.parse(res.data.result.content);
              temp.userLayoutSetting.currentPanel = that.currentPanel;
              temp.userLayoutSetting[that.currentPanel] = [];
              temp.userLayoutSetting[that.currentPanel] = that.layoutOption.layout.slice(0);
              console.log('temp is ' + JSON.stringify(temp));
              axios({
                method: 'post',
                url: postConfigURL,
                data: {
                  projId: projectInfo.projId,
                  userAccount: projectInfo.userAccount,
                  content: JSON.stringify(temp)
                }
              });
            });
          } else {
            temp = JSON.parse(response.data.result.content);
            temp.userLayoutSetting.currentPanel = that.currentPanel;
            temp.userLayoutSetting[that.currentPanel] = [];
            temp.userLayoutSetting[that.currentPanel] = that.layoutOption.layout.slice(0);
            console.log('temp is ' + JSON.stringify(temp));
            axios({
              method: 'post',
              url: postConfigURL,
              data: {
                projId: projectInfo.projId,
                userAccount: projectInfo.userAccount,
                content: JSON.stringify(temp)
              }
            });
          }
        }).catch(function (error) {
          // handle error
          console.log(error);
        });
        this.editing = false; //that.layoutOption.is_resizable = false;

        that.layoutOption.is_draggable = false;
      },
      restoreDefaultLayoutSetting: function restoreDefaultLayoutSetting() {
        var that = this;
        this.layoutOption.layout = [];
        axios.get(configURL, {
          params: {
            projId: '0',
            userAccount: 'default'
          }
        }).then(function (res) {
          that.layoutOption.layout = JSON.parse(res.data.result.content).defaultLayoutSetting[that.currentPanel].slice(0);
        });
      },
      cancelLayoutSetting: function cancelLayoutSetting() {
        var that = this;
        this.layoutOption.layout = [];
        axios.get(configURL, {
          params: {
            projId: projectInfo.projId,
            userAccount: projectInfo.userAccount
          }
        }).then(function (response) {
          // handle success
          console.log(response.data);

          if (response.data.result == null || response.data.result.content == null) {
            axios.get(configURL, {
              params: {
                projId: '0',
                userAccount: 'default'
              }
            }).then(function (res) {
              console.log(res.data);
              that.layoutOption.layout = JSON.parse(res.data.result.content).defaultLayoutSetting[that.currentPanel].slice(0);
            });
          } else {
            that.layoutOption.layout = JSON.parse(response.data.result.content).userLayoutSetting[that.currentPanel].slice(0);
          }
        }).catch(function (error) {
          // handle error
          console.log(error);
        });
        this.editing = false; //that.layoutOption.is_resizable = false;

        that.layoutOption.is_draggable = false;
      },
      menuProcess: function menuProcess(e) {
        var that = this;
        Object.keys(that.menu).forEach(function (key, index) {
          that.menu[key] = 1;
        });
        that.menu[e.target.dataset.menuname] = 0;
        that.currentPanel = e.target.dataset.menuname;
        that.layoutOption.layout = [];
        axios.get(configURL, {
          params: {
            projId: projectInfo.projId,
            userAccount: projectInfo.userAccount
          }
        }).then(function (response) {
          // handle success
          console.log(response.data);

          if (response.data.result == null || response.data.result.content == null) {
            axios.get(configURL, {
              params: {
                projId: '0',
                userAccount: 'default'
              }
            }).then(function (res) {
              //console.log(JSON.stringify(JSON.parse(res.data.result.content).defaultLayoutSetting));
              that.layoutOption.layout = JSON.parse(res.data.result.content).defaultLayoutSetting[that.currentPanel].slice(0);
            });
          } else {
            //console.log(JSON.stringify(JSON.parse(response.data.result.content).userLayoutSetting));
            that.layoutOption.layout = JSON.parse(response.data.result.content).userLayoutSetting[that.currentPanel].slice(0);
          }
        }).catch(function (error) {
          // handle error
          console.log(error);
        });
      },
      panelCommand: function panelCommand(command) {
        var self = this;
        self.chosenPanel = command.n;
        self.addItem = command;
      }
    }
  });
};

initLayout.then(function () {
  vueConstruct();
});
/*
function generateLayout() {
    return _.map(_.range(0, 25), function (item, i) {
        var y = Math.ceil(Math.random() * 4) + 1;
        return {
            x: _.random(0, 5) * 2 % 12,
            y: Math.floor(i / 6) * y,
            w: 2,
            h: y,
            i: i.toString(),
            static: Math.random() < 0.05
        };
    });
}*/
