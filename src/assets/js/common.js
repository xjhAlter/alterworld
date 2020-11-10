window.$aw = {};

(function ($) {
  $.isPc = function () {
    return (!navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))
  }
})(window.$aw)
