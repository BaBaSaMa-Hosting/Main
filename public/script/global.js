$(document).ready(() => {
    $(window).scroll(() => { 
        let location = $(window).scrollTop();
        $(".background-overlay").css("top", location);
    });
});