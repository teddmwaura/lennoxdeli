export function handleToggleButton() {
  const menuBar = document.querySelector('.div-open-html');
  const navBar = document.querySelector('.div-nav-html');

  // set initial position
  if (!navBar.style.left) {
    navBar.style.left = "-300px";
  }

  // OPEN MENU
  menuBar.addEventListener('click', (e) => {
    e.stopPropagation(); // 🔥 prevent immediate closing
    navBar.style.left = "0";
  });

  // 🔥 CLICK OUTSIDE TO CLOSE
  document.addEventListener('click', (e) => {
    const isClickInsideMenu = navBar.contains(e.target);
    const isMenuButton = menuBar.contains(e.target);

    if (!isClickInsideMenu && !isMenuButton) {
      navBar.style.left = "-300px";
    }
  });
}