function myProfile() {
    profilePic = document.getElementById("profilePicture");
    nameHeader = document.getElementById("nameHeader");
    userTypeHeader = document.getElementById("userTypeHeader");
    bio = document.getElementById("bio");
    fileList = document.getElementById("fileList");
    fileListTemplate = fileListTemplate || document.getElementById("fileListTemplate").innerHTML;

    ProfileModel.getProfile(localStorage.id)
            .then(
                result => {
                    ProfileController.printProfile(result[0]);
                    ProfileController.printFileList(result[1]);
                    ProfileController.showProfile();
                }
            );

    $("#publicProfileLink").attr("href", "#/profil/" + localStorage.id);
}

$(document).on("submit", "#bioForm", (e) => {
    e.preventDefault();
    ProfileModel.updateBio(ProfileController.getBio());
});

$(document).on("click", "button[name='deleteFile']", (ev) => {
    let fileId = ($(this).closest("li").attr("id")).replace(/^\D+/g, '');
    ProfileModel.deleteFile(fileId)
        .then(
            (id) => {
                ProfileController.removeFile(id);
            }
        );
});

$(document).on("change", "#fileInput", (ev) => {
    ProfileModel.uploadFile(ev.currentTarget.files[0])
        .then(
            (result) => {
                console.log(result);
                ProfileController.printFileList([result]);
            }
        );
});

$(document).on("change", "#pictureSelect", (ev) => {
    ProfileModel.uploadFile(ev.currentTarget.files[0], true)
        .then(
            () => {
                return ProfileModel.getProfilePic(localStorage.id);
            }
        )
        .then(
            (result) => {
                ProfileController.updateProfilePic(result);
            }
        )
});
