let profilePic, nameHeader, userTypeHeader, bio, fileList, fileListTemplate;

function profile() {
    profilePic = profilePic || document.getElementById("profilePicture");
    nameHeader = nameHeader || document.getElementById("nameHeader");
    userTypeHeader = userTypeHeader || document.getElementById("userTypeHeader");
    bio = bio || document.getElementById("bio");
    fileList = fileList || document.getElementById("fileList");
    fileListTemplate = fileListTemplate || document.getElementById("fileListTemplate");

    $.ajax({
        url: 'php/getProfile.php',
        beforeSend: function(request){
            request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
        },
        type: 'POST',
        data: "userId=" + Router.getParameters()[2],
        success: function(data) {
            let profileData = JSON.parse(data);
            printProfile(profileData);
            document.getElementById("profilePage").classList.remove("w3-hide");
        },
        error: function(xhr, textStatus, errorThrown) {
            if (xhr.status == 401) {
                console.log("not logged in");
                location.hash = "/innlogging";
            } else {
                console.log("error: " + xhr.status);
            }
        }
    });
}

function printProfile(profileData) {
    profilePic.src = profileData[0].profilePicture;
    nameHeader.innerHTML = profileData[0].name;
    document.title = profileData[0].name;
    console.log(profileData);

    switch (profileData[0].userType) {
        case 0:
            userTypeHeader.innerHTML = "Elev";
            break;
        case 1:
            userTypeHeader.innerHTML = "Student";
            break;
        default:
        break;
    }

    bio.innerHTML = profileData[0].biography;

    printFileList(profileData[1]);
}

function printFileList(fileListData) {
    let rendered = Pattern.render(fileListTemplate.innerHTML, fileListData);
    fileList.innerHTML += rendered;
}
