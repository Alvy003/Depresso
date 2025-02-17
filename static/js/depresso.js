document.addEventListener("DOMContentLoaded", () => {
    const videoGrid = document.querySelector(".video-grid");
    const nextButton = document.getElementById("next-btn");
    const prevButton = document.getElementById("prev-btn");
    const rootElement = document.documentElement;
    const menuIcon = document.getElementById("menuIcon");
    const dropdownMenu = document.getElementById("dropdownMenu");

    let hoverTimeout; // For hover functionality
    let currentPage = 0;
    const videosPerPage = 5;
    const totalVideos = videoGrid.children.length;
    const totalPages = Math.ceil(totalVideos / videosPerPage);
    
    


    


    


    // Toggle dropdown menu visibility
    menuIcon.addEventListener("click", () => {
        dropdownMenu.classList.toggle("active");
    });

    // Update button visibility based on the current page
    const updateButtons = () => {
        nextButton.style.display = currentPage === totalPages - 1 ? "none" : "block";
        prevButton.style.display = currentPage === 0 ? "none" : "block";
    };

    // Slide videos when next/previous buttons are clicked
    const slideVideos = (direction) => {
        const allVideos = Array.from(videoGrid.children);

        // Animation out
        allVideos.forEach((video, index) => {
            if (index >= currentPage * videosPerPage && index < (currentPage + 1) * videosPerPage) {
                video.style.animation = direction === "next" ? "slideOutLeft 0.5s forwards" : "slideOutRight 0.5s forwards";
            }
        });

        setTimeout(() => {
            allVideos.forEach((video, index) => (video.style.display = "none"));

            currentPage = direction === "next" ? currentPage + 1 : currentPage - 1;
            if (currentPage < 0) currentPage = 0;
            if (currentPage >= totalPages) currentPage = totalPages - 1;

            allVideos.forEach((video, index) => {
                if (index >= currentPage * videosPerPage && index < (currentPage + 1) * videosPerPage) {
                    video.style.display = "block";
                    video.style.animation = direction === "next" ? "slideInRight 0.5s forwards" : "slideInLeft 0.5s forwards";
                }
            });

            updateButtons();
        }, 500);
    };

    const hoverAction = (direction) => {
        hoverTimeout = setTimeout(() => slideVideos(direction), 200);
    };

    const cancelHoverAction = () => clearTimeout(hoverTimeout);

    nextButton.addEventListener("mouseover", () => hoverAction("next"));
    nextButton.addEventListener("mouseleave", cancelHoverAction);
    prevButton.addEventListener("mouseover", () => hoverAction("prev"));
    prevButton.addEventListener("mouseleave", cancelHoverAction);

    updateButtons();

});



function selectButton(button) {
    // Get the parent button group
    const buttonGroup = button.parentNode;

    // Remove 'selected' class from all buttons in the group
    buttonGroup.querySelectorAll('.button').forEach(btn => {
        btn.classList.remove('selected');
    });

    // Add 'selected' class to the clicked button
    button.classList.add('selected');
}










function selectOption(field, value, button) {
    document.getElementById(field).value = value;
    // Remove 'selected' class from all buttons in the same group
    const buttons = button.parentNode.querySelectorAll('button');
    buttons.forEach(btn => btn.classList.remove('selected'));
    // Add 'selected' class to the clicked button
    button.classList.add('selected');
}



function toggleMenu() {
    const menu = document.querySelector('.menu');
    const hamburger = document.querySelector('.hamburger');

    menu.classList.toggle('open');
    hamburger.classList.toggle('open');
}






