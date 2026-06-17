(function() {
  var topHero = document.getElementById('ndsTopHero');
  var topImg = document.getElementById('ndsTopImg');
  if (!topHero || !topImg) return;
  topHero.addEventListener('mousemove', function(e) {
    var r = topHero.getBoundingClientRect();
    var x = e.clientX - r.left - (topImg.offsetWidth / 2);
    var y = e.clientY - r.top - (topImg.offsetHeight / 2);
    topImg.style.left = x + 'px';
    topImg.style.top = y + 'px';
  });
})();
