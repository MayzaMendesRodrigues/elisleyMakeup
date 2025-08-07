
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("nav");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

const booking = document.querySelector(".intro__booking")
if (booking){
booking.innerHTML += booking.innerHTML
}


const menuIcon = document.getElementById("menu-icon");
console.log(menuIcon)
const menu = document.querySelector(".nav__menu")

if (menuIcon && menu){

menuIcon.addEventListener("click", function () {
  console.log("Menu icon clicked");
  menu.classList.toggle("active")

   if (menu.classList.contains("active")) {
            menuIcon.textContent = "close";
        } else {
            menuIcon.textContent = "menu";
        }
})

}

    const headers = document.querySelectorAll('.accordion-header');

    headers.forEach(header => {
      header.addEventListener('click', () => {

        const content = header.nextElementSibling;
        const arrow = header.querySelector('.arrow');

        if (content.style.display === 'block') {
          content.style.display = 'none';
          arrow.textContent = '▼';
        } else {
          content.style.display = 'block';
          arrow.textContent = '▲';

        }
      });
    });






