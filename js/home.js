/* HOME PAGE JS */

// Actions tabs
document.querySelectorAll('.act-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.act-tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.actions-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.getElementById('act-' + btn.dataset.panel);
    if (panel) panel.classList.add('active');
  });
});
