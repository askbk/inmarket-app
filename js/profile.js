let profilePic, nameHeader, userTypeHeader, bio, fileList, fileListTemplate;

function profile() {
    profilePic = document.getElementById("profilePicture");
    nameHeader = document.getElementById("nameHeader");
    userTypeHeader = document.getElementById("userTypeHeader");
    bio = document.getElementById("bio");
    fileList = document.getElementById("fileList");
    fileListTemplate = fileListTemplate || document.getElementById("fileListTemplate").innerHTML;

    ProfileModel.getProfile(Router.getParameters()[2])
            .then(
                result => {
                    ProfileController.printProfile(result[0]);
                    ProfileController.printFileList(result[1]);
                    ProfileController.showProfile();
                }
            );
}

let ProfileModel = {
    getProfile      : function (id) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/getUser.php',
                beforeSend: function(request){
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: "userId=" + id + "&profile=1",
                success: function(data) {
                    resolve(JSON.parse(data));
                },
                error: function(xhr, textStatus, errorThrown) {
                    if (xhr.status == 401) {
                        console.log("not logged in");
                        location.hash = "/innlogging";
                    } else {
                        console.log("error: " + xhr.status);
                    }
                    reject("error");
                }
            });
        });
    },
    updateBio       : function (bio) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: 'php/updateBio.php',
                beforeSend: function(request) {
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: "bio=" + bio,
                success: function(data) {
                    resolve(true);
                },
                error: function(xhr, textStatus, errorThrown) {
                    if (xhr.status == 401) {
                        console.log("not logged in");
                        location.hash = "/innlogging";
                    } else {
                        console.log("error: " + xhr.status);
                    }
                    reject("error");
                }
            });
        });
    },
    uploadFile      : function (file, isProfilePicture = false) {
        return new Promise(function(resolve, reject) {
            let form_data = new FormData();
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
                    resolve(fileData);
                }
            });
        });
    },
    deleteFile      : function (id) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: 'php/deleteFile.php',
                beforeSend: function(request) {
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: "userFile_id=" + id,
                success: function(data) {
                    resolve(id);
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
    },
    getFileList     : function (id) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/getUser.php',
                beforeSend: function(request){
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: "userId=" + id + "&fileList=1",
                success: function(data) {
                    resolve(JSON.parse(data));
                },
                error: function(xhr, textStatus, errorThrown) {
                    if (xhr.status == 401) {
                        console.log("not logged in");
                        location.hash = "/innlogging";
                    } else {
                        console.log("error: " + xhr.status);
                    }
                    reject("error");
                }
            });
        });
    },
    getProfilePic   : function (id) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/getUser.php',
                beforeSend: function(request){
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: "userId=" + id + "&picture=1",
                success: function(data) {
                    resolve(JSON.parse(data)[0].profilePicture);
                },
                error: function(xhr, textStatus, errorThrown) {
                    if (xhr.status == 401) {
                        console.log("not logged in");
                        location.hash = "/innlogging";
                    } else {
                        console.log("error: " + xhr.status);
                    }
                    reject("error");
                }
            });
        });
    }
}

let ProfileController = {
    printProfile    : function (profileData) {
        profilePic.src = profileData.profilePicture;
        nameHeader.innerHTML = profileData.name;
        document.title = profileData.name;

        switch (profileData.userType) {
            case 0:
                userTypeHeader.innerHTML = "Elev";
                break;
            case 1:
                userTypeHeader.innerHTML = "Student";
                break;
            default:
            break;
        }

        bio.innerHTML = profileData.biography;
    },
    printFileList   : function (fileData) {
        console.log(fileData);
        let rendered = Pattern.render(fileListTemplate, fileData);
        console.log(fileListTemplate);
        fileList.innerHTML = rendered;
    },
    showProfile     : function () {
        document.getElementById("profilePage").classList.remove("w3-hide");
    },
    getBio          : function () {
        return bio.value;
    },
    removeFile      : function (fileId) {
        $("#li" + fileId).remove();
        console.log("success");
    },
    updateProfilePic: function (src) {
        profilePic.src = src;
    }
}
