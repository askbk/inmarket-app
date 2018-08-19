let myProfilePic, myNameHeader, myUserTypeHeader, myBio, myFileList, myFileListTemplate;

function myProfile() {
    myProfilePic = document.getElementById("profilePicture");
    myNameHeader = document.getElementById("nameHeader");
    myUserTypeHeader = document.getElementById("userTypeHeader");
    myBio = document.getElementById("bio");
    myFileList = document.getElementById("fileList");
    myFileListTemplate = myFileListTemplate || document.getElementById("fileListTemplate").innerHTML;

    $.ajax({
        url: 'php/getProfile.php',
        beforeSend: function(request) {
            request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
        },
        type: 'POST',
        data: "userId=" + localStorage.id,
        success: function(data) {
            let profileData = JSON.parse(data);
            // console.log(profileData);
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

    $("#publicProfileLink").attr("href", "#/profil/" + localStorage.id);

    $("#bioForm").submit(function(e) {
        e.preventDefault();

        $.ajax({
            url: 'php/updateBio.php',
            beforeSend: function(request) {
                request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
            },
            type: 'POST',
            data: "bio=" + myBio.value,
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
        url: 'php/uploadUserFile.php',
        beforeSend: function(request) {
            request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
        },
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function(fileData) {
            if (isProfilePicture) {
                $.ajax({
                    url: 'php/getUser.php',
                    beforeSend: function(request) {
                        request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                    },
                    type: 'POST',
                    data: "picture=1",
                    success: function(data) {
                        let response = JSON.parse(data);
                        myProfilePic.src = response["picture"]["profilePicture"];
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
                let data = JSON.parse(fileData);
                myFileList.innerHTML += "<li id='li" + data.id + "'><div class='w3-row' id='" + data.id + "'><div class='w3-col s6'><a href='" + data.path + "' target='_blank'>" + data.name + "</a></div><div class='w3-col s6'><button type='button' name='deleteFile' class='red-button w3-card w3-right' onclick='deleteFile(this)'>Slett</button></div></div></li>";
            }
        }
    });
}

function printMyProfile(profileData) {
    myProfilePic.src = profileData[0].profilePicture;
    myNameHeader.innerHTML = profileData[0].name;

    switch (profileData[0].userType) {
        case 0:
            myUserTypeHeader.innerHTML = "Elev";
            break;
        case 1:
            myUserTypeHeader.innerHTML = "Student";
            break;
        default:
            break;
    }

    myBio.value = profileData[0].biography;

    printMyFileList(profileData[1]);
}

function printMyFileList(fileListData) {
    let rendered = Pattern.render(myFileListTemplate, fileListData);
    myFileList.innerHTML += rendered;
}

function deleteFile(el) {
    let fileId = ($(el).closest("li").attr("id")).replace(/^\D+/g, '');

    $.ajax({
        url: 'php/deleteFile.php',
        beforeSend: function(request) {
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
                location.hash = "/innlogging";
            } else {
                console.log("error: " + xhr.status);
            }
        }
    });
}
