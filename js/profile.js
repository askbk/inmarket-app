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

const ProfileModel = {
    getProfile      : id => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/getUser.php',
                beforeSend: request => {
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: "userId=" + id + "&profile=1",
                success: data => {
                    resolve(JSON.parse(data));
                },
                error: (xhr, textStatus, errorThrown) => {
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
    updateBio       : bio => {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: 'php/updateBio.php',
                beforeSend: request => {
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: "bio=" + bio,
                success: data => {
                    resolve(true);
                },
                error: (xhr, textStatus, errorThrown) => {
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
    uploadFile      : (file, isProfilePicture = false) => {
        return new Promise((resolve, reject) => {
            let form_data = new FormData();
            form_data.append('file', file);
            if (isProfilePicture) {
                form_data.append('profilePicture', 1);
            }

            $.ajax({
                url: 'php/uploadUserFile.php',
                beforeSend: request => {
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                dataType: 'text',
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'post',
                success: fileData => {
                    resolve(fileData);
                }
            });
        });
    },
    deleteFile      : id => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/deleteFile.php',
                beforeSend: request => {
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: "userFile_id=" + id,
                success: data => {
                    resolve(id);
                },
                error: (xhr, textStatus, errorThrown) => {
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
    getFileList     : id => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/getUser.php',
                beforeSend: request => {
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: "userId=" + id + "&fileList=1",
                success: data => {
                    resolve(JSON.parse(data));
                },
                error: (xhr, textStatus, errorThrown) => {
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
    getProfilePic   : id => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/getUser.php',
                beforeSend: request => {
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: "userId=" + id + "&picture=1",
                success: data => {
                    resolve(JSON.parse(data)[0].profilePicture);
                },
                error: (xhr, textStatus, errorThrown) => {
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

const ProfileController = {
    printProfile    : profileData => {
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
    printFileList   : fileData => {
        fileList.innerHTML = Pattern.render(fileListTemplate, fileData);
    },
    showProfile     : () => {
        document.getElementById("profilePage").classList.remove("w3-hide");
    },
    getBio          : () => {
        return bio.value;
    },
    removeFile      : fileId => {
        $("#li" + fileId).remove();
        console.log("success");
    },
    updateProfilePic: src => {
        profilePic.src = src;
    }
}
