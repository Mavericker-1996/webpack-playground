const show = content => {
  window.document.getElementById('app').innerText = `Helxlo${Math.random()}, ${content}`;
}

module.exports = show;