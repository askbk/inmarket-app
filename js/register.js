function register() {
    let user = {
        name            : "",
        email           : "",
        phone           : "",
        password        : "",
        kommuneNr       : 0,
        isPupil         : 0,
        isStudent       : 0,
        isNEET          : 0,
        emailVerified   : 0
    };

    document.title = "Registrering | InMarket App";

    $.get("php/getKommuner.php?kommuneNr=-1", function(data, status) {
        let kommuner = JSON.parse(data);
        let template = document.getElementById("kommuneTemplate");
        let rendered = Pattern.render(template.innerHTML, kommuner);
        template.innerHTML = rendered;
    });
    $('#registration').on('keyup keypress', function(e) {
        let keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            e.preventDefault();
            return false;
        }
    });

    let firstPage = document.getElementsByClassName("firstPage");
    let secondPage = document.getElementsByClassName("secondPage");
    let thirdPage = document.getElementsByClassName("thirdPage");
    let pupilPage = document.getElementsByClassName("pupilPage");
    let studentPage = document.getElementsByClassName("studentPage");
    let employeePage = document.getElementsByClassName("employeePage");

    //  when the user has selected what they are
    $(".clientType").click(function() {
        switch (this.value) {
            case "pupil":
                user.isPupil = 1;
                pupilPage[0].classList.remove("w3-hide");
                break;
            case "student":
                user.isStudent = 1;
                studentPage[0].classList.remove("w3-hide");
                break;
            case "employee":
                user.isEmployee = 1;
                employeePage[0].classList.remove("w3-hide");
                break;
        }

        firstPage[0].classList.add("w3-hide");
        secondPage[0].classList.remove("w3-hide");
    });

    //  Input name, email, phone, password
    $("#page2btn").click(function() {

        user.name = $("input[name='name']").val();
        user.email = $("input[name='email']").val();
        user.phone = $("input[name='phone']").val();
        user.password = $("input[name='password']").val();

        secondPage[0].classList.add("w3-hide");
        thirdPage[0].classList.remove("w3-hide");
    })

    // User submits form
    $("#registration").submit(function(e) {
        e.preventDefault();

        user.kommuneNr = $("select").val();

        if (user.isPupil) {
            user.school = $("input[name='schoolPupil']").val();
            user.schoolYear = $("input[name='schoolYearPupil']").val();
            user.program = $("input[name='programPupil']").val();
        } else if (user.isStudent) {
            user.school = $("input[name='schoolStudent']").val();
            user.schoolYear = $("input[name='schoolYearStudent']").val();
            user.program = $("input[name='programStudent']").val();
        } else if (user.isEmployee) {
            user.companyName = $("input[name='companyName']").val();
            user.position = $("input[name='position']").val();
            user.education = $("input[name='education']").val();
        }

        $.post(
            "php/register.php", user, function(data) {
                $("#responseText").text(data);

            }
        );

        user = null;
        location.hash = "/innlogging";
    });
}
