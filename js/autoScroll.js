

setTimeout(function () {
  console.log('scrollDiv number is ' + document.getElementsByClassName('scrollDiv').length);
  if (document.getElementsByClassName('scrollDiv').length > 0) {
    var scrollArray = Array.from(document.getElementsByClassName('scrollDiv'));
    scrollArray.forEach(function (item, index) {
      var scrollLabel = 0;
      var scrollDown = true;
      setInterval(function () {
        if (item.scrollTop == scrollLabel) {
          //console.log('change scroll direction.');
          scrollDown = !scrollDown;
          if (scrollDown) {
            item.scrollBy({ top: 1, left: 0, behavior: 'smooth' });
          } else {
            item.scrollBy({ top: -1, left: 0, behavior: 'smooth' });
          }
        }
        if (item.scrollTop < item.offsetHeight) {
          scrollLabel = item.scrollTop;
          if (scrollDown) {
            item.scrollBy({ top: 1, left: 0, behavior: 'smooth' });
          } else {
            item.scrollBy({ top: -1, left: 0, behavior: 'smooth' });
          }
          //console.log('scroll to ' + item.scrollTop);
          //console.log('scrollLabel is  ' + scrollLabel);
        }
      }, 100);
    });
  }
}, 5000);
