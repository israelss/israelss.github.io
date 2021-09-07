let currentDegRotated = 0;
function rotateSky(deg) {
  const cycle = document.getElementById('day_night_cycle');
  deg += 180;
  cycle.style.transform = 'rotate(' + deg + 'deg)';
  currentDegRotated = deg;
}

// Immediately invoked function to set the theme on initial load
(function () {
 if (localStorage.getItem('theme') === 'dark') {
     rotateSky(-180);
 } else {
     rotateSky(0);
 }
})();