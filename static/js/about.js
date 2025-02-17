
const rootElement = document.documentElement;
const menuIcon = document.getElementById("menuIcon");
const dropdownMenu = document.getElementById("dropdownMenu");






function toggleMenu() {
    const menu = document.querySelector('.menu');
    const hamburger = document.querySelector('.hamburger');

    menu.classList.toggle('open');
    hamburger.classList.toggle('open');
}
