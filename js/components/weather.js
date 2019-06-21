

Vue.component('weather', {
  data: function data() {
    return {
      weatherData: {
        week: "N/A",
        city: "N/A",
        windPower: 'N/A',
        weather: 'N/A',
        future7: [{
          "week": "N/A",
          "weatherCode": "N/A",
          "maxDegree": "N/A",
          "time": "N/A",
          "minDegree": "N/A",
          "day_weather": "N/A"
        }, {
          "week": "N/A",
          "weatherCode": "N/A",
          "maxDegree": "N/A",
          "time": "N/A",
          "minDegree": "N/A",
          "day_weather": "N/A"
        }, {
          "week": "N/A",
          "weatherCode": "N/A",
          "maxDegree": "N/A",
          "time": "N/A",
          "minDegree": "N/A",
          "day_weather": "N/A"
        }, {
          "week": "N/A",
          "weatherCode": "N/A",
          "maxDegree": "N/A",
          "time": "N/A",
          "minDegree": "N/A",
          "day_weather": "N/A"
        }, {
          "week": "N/A",
          "weatherCode": "N/A",
          "maxDegree": "N/A",
          "time": "N/A",
          "minDegree": "N/A",
          "day_weather": "N/A"
        }, {
          "week": "N/A",
          "weatherCode": "N/A",
          "maxDegree": "N/A",
          "time": "N/A",
          "minDegree": "N/A",
          "day_weather": "N/A"
        }, {
          "week": "N/A",
          "weatherCode": "N/A",
          "maxDegree": "N/A",
          "time": "N/A",
          "minDegree": "N/A",
          "day_weather": "N/A"
        }]
      },
      smallSrc: './assets/white/',
      bigSrc: '',
      noData: false
    };
  },
  mounted: function mounted() {

    var linkTag = document.createElement('link');
    linkTag.setAttribute('href', "css/weather.css");
    linkTag.setAttribute('rel', "stylesheet");
    document.body.appendChild(linkTag);

    var projId = "7730596820333821952";
    var url = baseURL + "/api/proj/weatherData/realWeather";
    var self = this;

    axios.get(url, {
      params: {
        projId: projectInfo.projId
      }
    }).then(function (response) {
      if (!isEmpty(response.data.result)) {
        self.bigSrc = "./assets/weather-icon/" + response.data.result.weatherCode + '.png';
        self.weatherData = response.data.result;
      }
    }).catch(function (error) {
      // handle error
      console.log(error);
    });
  },
  template: "<div class=\"weatherContent\">\r\n  <h3>{{weatherData.nowDates}} <span>{{weatherData.week}}</span><span class=\"city\">{{weatherData.city}}</span></h3>\r\n  <main class=\"mainTop\">\r\n    <div>\r\n      <p class=\"font28\">{{weatherData.degree}}\u2103</p>\r\n      <p>{{weatherData.minDegree}}~{{weatherData.maxDegree}}\u2103</p>\r\n    </div>\r\n    <div>\r\n      <img :src='bigSrc' width=\"46px\" height=\"46px\"/>\r\n      <p style=\"position:relative; left:16px;\">{{weatherData.weather}}</p>\r\n    </div>\r\n  </main>\r\n  <main class=\"mainBottom\">\r\n    <ul>\r\n      <li v-for=\"item in weatherData.future7\">\r\n        <p>{{item.week}}</p>\r\n        <p><img :src=\"smallSrc+item.weatherCode+'.png'\" width=\"25\" height=\"25\"/></p>\r\n        <p>{{item.maxDegree}}\u2103</p>\r\n        <p>{{item.minDegree}}\u2103</p>\r\n      </li>\r\n    </ul>\r\n  </main>\r\n</div>\r\n"
});
