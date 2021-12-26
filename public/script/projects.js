var href = document.location.href;

const scroll_to_elemt = () => {
    if (!href.includes("#")) return;
    let target_elemt = href.split("#")[1];
    document.querySelector(`#${target_elemt}`).scrollIntoView({block: 'start', behavior: 'smooth'});
}

$(document).ready(() => {
    scroll_to_elemt();
    
    window.addEventListener('hashchange', () => {
        href = window.location.href;
        scroll_to_elemt();
    }, false);

    $(".select-element").click((e) => { 
        e.preventDefault();
        window.history.replaceState('projects', 'Projects', `/projects#${e.currentTarget.innerHTML}`);
        $(".select-element").removeClass("active");
        $(`.select-element[data-select-value="${e.currentTarget.innerHTML}"]`).addClass("active");
        $(".select-textbox .icon").trigger("click");
        href = window.location.href;
        scroll_to_elemt();
    });

    $(".select-textbox .icon").click((e) => { 
        e.preventDefault();
        if ($("#project-type").hasClass("active")) {
            $(".select-dropdown").toggleClass("active");
            setTimeout(() => {
                $(".select-container").toggleClass("active");
            }, 50);
        } else {
            $(".select-container").toggleClass("active");
            setTimeout(() => {
                $(".select-dropdown").toggleClass("active");
            }, 50);
        }
    });
});