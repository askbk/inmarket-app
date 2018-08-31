function myProfile() {
    profilePic = document.getElementById("profilePicture");
    nameHeader = document.getElementById("nameHeader");
    userTypeHeader = document.getElementById("userTypeHeader");
    bio = document.getElementById("bio");
    fileList = document.getElementById("fileList");
    fileListTemplate = fileListTemplate || document.getElementById("fileListTemplate").innerHTML;

    (function () {
        ProfileModel.getProfile(localStorage.id)
            .then(
                result => {
                    ProfileController.printProfile(result[0]);
                    ProfileController.printFileList(result[1]);
                    ProfileController.showProfile();
                }
            );
    })();

    $("#publicProfileLink").attr("href", "#/profil/" + localStorage.id);
    $("#bioForm").submit(function(e) {
        e.preventDefault();
        ProfileModel.updateBio(ProfileController.getBio());
    });
    $("#fileList").on("click", "button[name='deleteFile']", function (ev) {
        let fileId = ($(this).closest("li").attr("id")).replace(/^\D+/g, '');
        ProfileModel.deleteFile(fileId)
            .then(
                (id) => {
                    ProfileController.removeFile(id);
                }
            );
    });
    $("#fileInput").change(function (ev) {
        ProfileModel.uploadFile(ev.currentTarget.files[0])
            .then(
                (result) => {
                    console.log(result);
                    ProfileController.printFileList([result]);
                }
            );
    });
}
