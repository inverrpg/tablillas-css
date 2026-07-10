function ntbTab(el) {
  document.querySelectorAll('.ntb-tab').forEach(function(t) {
    t.classList.remove('activo');
  });
  document.querySelectorAll('.ntb-panel').forEach(function(p) {
    p.classList.remove('activo');
  });
  el.classList.add('activo');
  document.getElementById('ntb-' + el.getAttribute('data-panel')).classList.add('activo');
}
