export class ProfileService {
    constructor(DEBUG_MODE) {
        this.DEBUG_MODE = DEBUG_MODE;
    }

    getProfile(id) {
        return fetch('php/getUser.php', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                "Authorization": "Bearer " + localStorage.jwt,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"userId": id})
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

    updateBio(bio) {
        return fetch('php/updateBio.php', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                "Authorization": "Bearer " + localStorage.jwt,
                'Content-Type': 'application/json'
            },
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
            headers: {
                'Accept': 'application/json, text/plain, */*',
                "Authorization": "Bearer " + localStorage.jwt,
                'Content-Type': 'application/json'
            },
            body: form_data
        }).then(response => {
            if (!response.ok) {
                if (this.DEBUG_MODE) {
                    console.error("upload user file: " + response.statusText);
                }
            }
        });
    }
}
