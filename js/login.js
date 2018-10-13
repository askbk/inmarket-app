function login() {
}
$(document).on("click", "input[name='loginBtn']", e => {
    e.preventDefault();
    LoginModel.login($("#loginForm").serialize())
        .then(JWT => {
            localStorage.clear();
            localStorage.jwt = JWT["jwt"];
            location.hash = "/hjem";})
        .then(() => {return LoginModel.getUser()})
        .then(user => {
            localStorage.name = user["name"];
            localStorage.id = user["id"];
            localStorage.type = user["type"];
            localStorage.adminLevel = user["adminLevel"];
            localStorage.adminGroups = JSON.stringify(user["adminGroups"]);
            ProfileController.updateProfilePic(user["profilePicture"]);

            if (localStorage.adminLevel > 0) {
                document.getElementById("controlpanelLink").classList.remove("w3-hide");
            }

            // $("#navbar-profile-pic").attr("src", localStorage.profilePicture);
        });
});


const LoginModel = {
    getUser() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/getUser.php',
                beforeSend: request => {
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: "name=1&picture=1&id=1&adminLevel=1&adminGroups=1&type=1",
                success: data => {
                    resolve(JSON.parse(data));
                },
                error: () => {
                    reject("error");
                }
            });
        });
    },
    login(credentials) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/login.php',
                type: 'POST',
                data: credentials,
                success: data => {
                    resolve(JSON.parse(data));
                },
                error: () => {
                    console.log("not logged in");
                    $("#responseText").text("Feil brukernavn/passord.");
                    reject("error");
                }
            });
        });
    }
}
