import { Service } from '../service.js';

export class ProfileService extends Service {
    constructor(DEBUG_MODE) {
        super(DEBUG_MODE);
    }

    getProfile(id) {
        return fetch('php/users/getUser.php', {
            method: 'post',
            headers: Service.stdHeaders(),
            body: JSON.stringify({"userId": id, "profile": 1})
        }).then(response => {
            if (!response.ok) {
                if (this.DEBUG_MODE) {
                    console.error("get user profile: " + response.statusText);
                }
            }
            return response.json();
        }).then(profile => {
            return profile;
        });
    }

    getMyProfile() {
        return new Promise((resolve, reject) => {
            if (this.myProfile) {
                resolve(this.myProfile);
            } else {
                resolve(
                    this.getProfile(localStorage.myId)
                );
            }
        }).then(profile => {
            this.myProfile = profile;
            console.log(this.myProfile);
            return profile
        });
    }

    updateBio(bio) {
        return fetch('php/updateBio.php', {
            method: 'post',
            headers: Service.stdHeaders(),
            body: JSON.stringify({"bio": bio})
        }).then(response => {
            if (!response.ok) {
                if (this.DEBUG_MODE) {
                    console.error("update user bio: " + response.statusText);
                }
            }
        });
    }

    uploadFile(file, isProfilePicture = false) {
        let form_data = new FormData();
        form_data.append('file', file);

        if (isProfilePicture) {
            form_data.append('profilePicture', 1);
        }

        return fetch('php/uploadUserFile.php', {
            method: 'post',
            headers: Service.stdHeaders(),
            body: form_data
        }).then(response => {
            if (!response.ok) {
                if (this.DEBUG_MODE) {
                    console.error("upload user file: " + response.statusText);
                }
            }
        });
    }

    getFileList(id) {
        return fetch('php/users/getUser.php', {
            method: 'post',
            headers: Service.stdHeaders(),
            body: JSON.stringify({"userId": id})
        }).then(response => {
            if (!response.ok) {
                if (this.DEBUG_MODE) {
                    console.error("get file list: " + response.statusText);
                }
            }
        }).then(files => {
            return files.json();
        });
    }

    getProfilePic(id) {
        return fetch('php/users/getUser.php', {
            method: 'post',
            headers: Service.stdHeaders(),
            body: JSON.stringify({"userId": id, "picture": 1})
        }).then(response => {
            if (!response.ok) {
                if (this.DEBUG_MODE) {
                    console.error("get profile pic: " + response.statusText);
                }
            }
        }).then(files => {
            return files.json().profilePicture;
        });
    }
}
