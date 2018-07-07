let user = {
    name        : "",
    email       : "",
    phone       : "",
    password    : "",
    kommunenr   : 0,
    isPupil     : 0,
    isStudent   : 0,
    isEmployee  : 0
};

let kommuner = {};

$.get("php/getKommuner.php", function(data, status) {
    let kommuner = JSON.parse(data);
    console.log(kommuner);
    let template = document.getElementById("kommuneTemplate");
    let rendered = Pattern.render(template.innerHTML, kommuner);
    template.innerHTML = rendered;
});

$(document).ready(function() {
    $(".clientType").click(function() {
        switch (this.value) {
            case "pupil":
                user.isPupil = 1;
                break;
            case "student":
                user.isStudent = 1;
                break;
            case "pupil":
                user.isEmployee = 1;
                break;
        }

        $(".firstPage").hide();
        $(".secondPage").show();
    });

    $("#page2btn").click(function() {
    })
});

/*$("#registration").submit(function(e) {
    e.preventDefault();
    $.post("php/register.php", JSON.stringify(user), function(data) {
            $("#responseText").text(data);
    };
});
*/
