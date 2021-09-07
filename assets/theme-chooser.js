function setTheme(theme) {
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
}


function toggleTheme() {
  if (localStorage.getItem('theme') === 'dark') {
    setTheme('light');
  } else {
    setTheme('dark');
  }
  rotateSky(currentDegRotated)
}


// Immediately invoked function to set the theme on initial load
(function () {
 if (localStorage.getItem('theme') === 'dark') {
     setTheme('dark');
     rotateSky(-180);
 } else {
     setTheme('light');
     rotateSky(0);
 }
})();