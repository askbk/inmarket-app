let profilePic, nameHeader, userTypeHeader, bio, fileList, fileListTemplate;

function profile() {
    profilePic = document.getElementById("profilePicture");
    nameHeader = document.getElementById("nameHeader");
    userTypeHeader = document.getElementById("userTypeHeader");
    bio = document.getElementById("bio");
    fileList = document.getElementById("fileList");
    fileListTemplate = fileListTemplate || document.getElementById("fileListTemplate").innerHTML;
    Profile.getProfile(true);
}

let Profile = {
    getProfile: function (printProfile) {
        $.ajax({
            url: 'php/getUser.php',
            beforeSend: function(request){
                request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
            },
            type: 'POST',
            data: "userId=" + Router.getParameters()[2] + "&profile=1",
            success: function(data) {
                let profileData = JSON.parse(data);
                if (printProfile) {
                    Profile.printProfile(profileData)
                    document.getElementById("profilePage").classList.remove("w3-hide");
                } else {
                    return profileData;
                }
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
    },
    printProfile:   function (profileData) {
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

        Profile.printFileList(profileData[1]);
    },
    printFileList:  function (fileListData) {
        let rendered = Pattern.render(fileListTemplate, fileListData);
        fileList.innerHTML += rendered;
    }
}
