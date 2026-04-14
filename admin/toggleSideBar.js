export function handleToggleButton(){
    const menuBar = document.querySelector('.div-open-html')
    const navBar = document.querySelector('.div-nav-html')
    const closeBar = document.querySelector('.div-close-html')
    
     if (!navBar.style.left) {
        navBar.style.left = "-300px";
      }
    
      menuBar.addEventListener('click', () => {
        navBar.style.left = (navBar.style.left === "-300px") ? "0" : "-300px";
      });
    
      closeBar.addEventListener('click', () => {
        navBar.style.left = (navBar.style.left === "0px" || navBar.style.left === "0") 
          ? "-300px" 
          : "0";
      });
    }