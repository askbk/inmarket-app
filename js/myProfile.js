let profilePic, nameHeader, userTypeHeader, bio, fileList, fileListTemplate;

function myProfile() {
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
        data: "userId=" + localStorage.id,
        success: function(data) {
            let profileData = JSON.parse(data);
            console.log(profileData);
            printMyProfile(profileData);
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

    $("#bioForm").submit(function (e) {
        e.preventDefault();

        $.ajax({
            url: 'php/updateBio.php',
            beforeSend: function(request){
                request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
            },
            type: 'POST',
            data: "bio=" + bio.value,
            success: function(data) {
                console.log("bio updated");
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
    });
}

function upload(file, isProfilePicture = false) {
    var form_data = new FormData();
    form_data.append('file', file);
    if (isProfilePicture) {
        form_data.append('profilePicture', 1);
    }

    $.ajax({
        url: 'php/uploadUserFile.php', // point to server-side PHP script
        beforeSend: function(request){
            request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
        },
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function(userFile_id){
            if (isProfilePicture) {
                $.ajax({
                    url: 'php/getUser.php',
                    beforeSend: function(request){
                        request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                    },
                    type: 'POST',
                    data: "picture=1",
                    success: function(data) {
                        let response = JSON.parse(data);
                        profilePic.src = response["picture"]["profilePicture"];
                    },
                    error: function(xhr, textStatus, errorThrown) {
                        if (xhr.status == 401) {
                            console.log("not logged in");
                            // location.hash = "/innlogging";
                        } else {
                            console.log("error: " + xhr.status);
                        }
                    }
                });
            } else {
                console.log(userFile_id);
            }
        }
     });
}

function printMyProfile(profileData) {
    console.log("hello");
    profilePic.src = profileData[0].profilePicture;
    nameHeader.innerHTML = profileData[0].name;

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

    bio.value = profileData[0].biography;

    printMyFileList(profileData[1])
}

function printMyFileList(fileListData) {
    let rendered = Pattern.render(fileListTemplate.innerHTML, fileListData);
    //console.log(fileListData);
    fileList.innerHTML += rendered;
}

function deleteFile(el) {
    let fileId = ($(el).closest("li").attr("id")).replace( /^\D+/g, '');
    console.log(fileId);

    $.ajax({
        url: 'php/deleteFile.php',
        beforeSend: function(request){
            request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
        },
        type: 'POST',
        data: "userFile_id=" + fileId,
        success: function(data) {
            $("#li" + fileId).remove();
        },
        error: function(xhr, textStatus, errorThrown) {
            if (xhr.status == 401) {
                console.log("not logged in");
                // location.hash = "/innlogging";
            } else {
                console.log("error: " + xhr.status);
            }
        }
    });
}
