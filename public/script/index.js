const intro_text = [
    {main_text: "a Developer,", sub_text: "I Make Apps and Website that suits your needs."}, 
    {main_text: "an UI/UX Designer,", sub_text: "I Create Designs that Guarantees Customer Satisfiaction."}, 
    {main_text: "a Solo Freelancer,", sub_text: "I Can Manage Multiple Task and Hit Target on Demand."}];

var count_text = 1
var printing_text = false
// TODO: make function check for printing text disable click.

const start_type = () => {
    console.log("type start")
    $("#main-text").html("");
    $("#sub-text").html("");
    let count = 0;
    printing_text = true
    loop_display_main_text(count, intro_text[count_text % intro_text.length].main_text)
    loop_display_sub_text(count, intro_text[count_text % intro_text.length].sub_text)

}

const loop_display_main_text = (count, text) => {
    setTimeout(() => {
        $(`#main-text`).append(text[count]);
        count ++;
        if (count < text.length) {
            printing_text = true
            loop_display_main_text(count, text)
        } else 
            printing_text = false
    }, 300);
}

const loop_display_sub_text = (count, text) => {
    setTimeout(() => {
        $(`#sub-text`).append(text[count]);
        count ++;
        if (count < text.length) {
            printing_text = true
            loop_display_sub_text(count, text)
        } else
            printing_text = false
    }, 100);
}

$(document).ready(() => {
    start_type()

    $(".col:nth-child(1)").click((e) => {
        e.preventDefault();
        if (printing_text) return;
        count_text++;
        start_type()
    });
});