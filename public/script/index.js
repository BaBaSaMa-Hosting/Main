const intro_text = [
    {main_text: "a Developer,", sub_text: "I Make Apps and Website that suits your needs."}, 
    {main_text: "an UI/UX Designer,", sub_text: "I Create Designs that Guarantees Customer Satisfaction."}, 
    {main_text: "a Solo Freelancer,", sub_text: "I Can Manage Multiple Task and Hit Target on Demand."}];

const navigation_url_background = [
    {url: "/projects", text: 'Take a look at some of my projects', image: "/images/ydotbakery:jiujigongforall.png", background_color: "#2c9f6a"},
    {url: "/about_me", text: 'Know more about me', image: "/images/pic_of_me_1.png", background_color: "#fdaf4c"}
    // {url: "/learn", text: 'Learn about the existing APIs I did and know how to use them', image: "", background_color: "#4c93fe"}
]

var count_text = 1
var count_navigation = 1
var printing_text = false

var timer = 0

const start_type = () => {
    console.log("type start")
    count_text++;
    $("#main-text").html("");
    $("#sub-text").html("");
    let count = 0;
    printing_text = true
    loop_display_main_text(count, intro_text[count_text % intro_text.length].main_text)
}

const loop_display_main_text = (count, text) => {
    setTimeout(() => {
        $(`#main-text`).append(text[count]);
        count ++;
        if (count < text.length) {
            printing_text = true
            loop_display_main_text(count, text)
        } else 
            loop_display_sub_text(0, intro_text[count_text % intro_text.length].sub_text)
    }, 150);
}

const loop_display_sub_text = (count, text) => {
    setTimeout(() => {
        $(`#sub-text`).append(text[count]);
        count ++;
        if (count < text.length) {
            printing_text = true
            loop_display_sub_text(count, text)
        } else
            printing_text = false;
    }, 150);
}

const background_navigation_change = () => {
    let selected_data = navigation_url_background[count_navigation % navigation_url_background.length];
    let original_bg_color = $(".background-overlay svg path").attr("fill");
    let scale = chroma.scale([original_bg_color, selected_data.background_color]).mode('lch').colors(30);
    background_change_color(scale);
    $("#visit").html(selected_data.text);
    $("#visit").attr("href", selected_data.url);
    $(".image").attr("src", selected_data.image);

    count_navigation++;
}

const background_change_color = (list_color) => {
    if (list_color.length === 0) return;
    $(".background-overlay svg path").attr("fill", list_color[0]);
    setTimeout(() => {
        list_color.splice(0, 1);
        background_change_color(list_color);
    }, 20);
}

const schedule_change = () => {
    setTimeout(() => {
        console.log(timer);
        if (timer % 15 === 0) {
            timer++;
            start_type();
            background_navigation_change();
            schedule_change();
        } else {
            timer++;
            schedule_change();
        }
    }, 1000);
}

$(document).ready(() => {
    schedule_change();

    $(".col:nth-child(1)").click((e) => {
        e.preventDefault();
        timer = 1;
        if (printing_text) return;
        start_type();
    });

    $(".col:nth-child(2)").mouseleave(() => { 
        timer = 1;
        background_navigation_change();
    });

    $(".image-frame").click(() => { 
        window.location.href = navigation_url_background[(count_navigation - 1) % navigation_url_background.length].url
    });

    $(".col:nth-child(2) button").click((e) => {
        e.preventDefault();
        timer = 1;
        $(".col:nth-child(2)").trigger("mouseleave");
    });
});