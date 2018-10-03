let firstPage,
    secondPage,
    thirdPage,
    pupilPage,
    studentPage,
    employeePage,
    kommuneTemplate,
    kommuneList,
    user = {
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

function register() {
    registrationPages = document.getElementsByClassName("registrationPage");
    pupilPage = document.getElementsByClassName("pupilPage");
    studentPage = document.getElementsByClassName("studentPage");
    employeePage = document.getElementsByClassName("employeePage");
    kommuneTemplate = kommuneTemplate || document.getElementById("kommuneTemplate").innerHTML;
    kommuneList = document.getElementById("kommuneList");

    document.title = "Registrering | InMarket App";

    RegisterModel.getKommuner()
        .then(
            kommuner => {RegisterController.printKommuneList(kommuner);}
        );
}

//  Prevents submission if the user hits enter
$('#registration').on('keyup keypress', function(e) {
    let keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
        e.preventDefault();
        return false;
    }
});

//  when the user has selected what they are
$(document).on("click", ".clientType", function () {
    switch (this.value) {
        case "pupil":
            user.isPupil = 1;
            RegisterController.showPupilPage();
            break;
        case "student":
            user.isStudent = 1;
            RegisterController.showPupilPage();
            break;
        case "employee":
            user.isEmployee = 1;
            RegisterController.showPupilPage();
            break;
    }

    RegisterController.showPage(1);
});

//  Input name, email, phone, password
$(document).on("click", "#page2btn", function () {
    user.name = $("input[name='name']").val();
    user.email = $("input[name='email']").val();
    user.phone = $("input[name='phone']").val();
    user.password = $("input[name='password']").val();

    RegisterController.showPage(2);
});

// User submits form
$("#registration").submit(function(e) {
    e.preventDefault();

    user = RegisterModel.generateUserObject(user);
    console.log(user);
    RegisterModel.register(user)
        .then(
            response => {
                user = null;
                location.hash = "/innlogging";
            }
        )
        .catch(
            response => {
                console.log("noe gikk galt");
            }
        );
});

let RegisterController = {
    showPage            : function (n) {
        for (page of registrationPages) {
            page.classList.add("w3-hide");
        }

        registrationPages[n].classList.remove("w3-hide");
    },
    showPupilPage       : function () {
        $("#pupilPage").removeClass("w3-hide");
    },
    showStudentPage     : function () {
        $("#studentPage").removeClass("w3-hide");
    },
    showNeetPage        : function () {
        $("#neetPage").removeClass("w3-hide");
    },
    printKommuneList    : function (kommuner) {
        kommuneList.innerHTML = Pattern.render(kommuneTemplate, kommuner);
    }
}

let RegisterModel = {
    getKommuner         : function () {
        return new Promise((resolve, reject) => {
            $.get("php/getKommuner.php", function(data, status) {
                resolve(JSON.parse(data));
            });
        });
    },
    generateUserObject  : function (user) {
        console.log(user);
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

        return user;
    },
    register            : function (user) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/register.php',
                type: 'POST',
                data: user,
                success: function(data) {
                    resolve(data);
                },
                error: function(xhr, textStatus, errorThrown) {
                    reject("Feil");
                }
            });
        });
    }
}
