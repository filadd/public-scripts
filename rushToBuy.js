(function () {
  // Format "YYYY/MM/DD HH:ss"
  var deadline = "2022/10/23 13:05";

  function pad(num, size) {
    var s = "0" + num;
    return s.substr(s.length - size);
  }

  // fixes "Date.parse(date)" on safari
  function parseDate(date) {
    const parsed = Date.parse(date);
    if (!isNaN(parsed)) return parsed;
    return Date.parse(date.replace(/-/g, "/").replace(/[a-z]+/gi, " "));
  }

  function getTimeRemaining(endtime) {
    let total = parseDate(endtime) - Date.parse(new Date());
    let seconds = Math.floor((total / 1000) % 60);
    let minutes = Math.floor((total / 1000 / 60) % 60);
    let hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    let days = Math.floor(total / (1000 * 60 * 60 * 24));

    return { total, days, hours, minutes, seconds };
  }

  function clock(id, endtime) {
    const rushToBuy = document.getElementById("rush-to-buy");

    let days = document.getElementById(id + "-days");
    let hours = document.getElementById(id + "-hours");
    let minutes = document.getElementById(id + "-minutes");
    let seconds = document.getElementById(id + "-seconds");

    var timeinterval = setInterval(function () {
      var time = getTimeRemaining(endtime);

      if (time.total <= 0) {
        rushToBuy.style.display = "none";
        clearInterval(timeinterval);
      } else {
        days.innerHTML = pad(time.days, 2);
        hours.innerHTML = pad(time.hours, 2);
        minutes.innerHTML = pad(time.minutes, 2);
        seconds.innerHTML = pad(time.seconds, 2);
      }
    }, 1000);
  }

  clock("js-timer", deadline);
})();
