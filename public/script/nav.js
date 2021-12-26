$(document).ready(() => {
    $(".navbar-brand").click((e) => { 
        e.preventDefault();
        window.location.href = "/"
    });

    $(".navbar-menu").click((e) => { 
        e.preventDefault();
        $(".navbar-container").toggleClass("active");
        $(".container").toggleClass("nav-active");
    });
});