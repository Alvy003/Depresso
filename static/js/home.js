
const rootElement = document.documentElement;
const menuIcon = document.getElementById("menuIcon");
const dropdownMenu = document.getElementById("dropdownMenu");



// Toggle dropdown menu visibility
menuIcon.addEventListener("click", () => {
    dropdownMenu.classList.toggle("active");
});     



function toggleMenu() {
    const menu = document.querySelector('.menu');
    const hamburger = document.querySelector('.hamburger');

    menu.classList.toggle('open');
    hamburger.classList.toggle('open');
}
