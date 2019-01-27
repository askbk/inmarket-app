import { Component } from '../component.js';
import { template } from './my-profile.template.js';

export class MyProfileComponent extends Component {
    constructor(DEBUG_MODE, profileService, pattern) {
        super(DEBUG_MODE, { //  templates
            undefined: true,
            fileList: "#myFileListTemplate"
        }, {    //  elements
            undefined: true,
            profilePicture: "#profilePicture",
            nameHeader: "#nameHeader",
            userTypeHeader: "#userTypeHeader",
            bio: "#bio",
            fileList: "#fileList",
            fileInput: "#fileInput",
            profilePage: "#profilePage"
        },
        undefined, template
        );

        this.pattern = pattern;
        this.profileService = profileService;
        this.profile = {};
        this.fileList = [];
    }

    init() {
        super.initDOM();

        this.profileService.getMyProfile().then(profile => {
            this.profile = profile[0];
            this.fileList = profile[1];
        }).then(() => {
            if (this.DEBUG_MODE) {
                console.log(this.profile);
                console.log(this.fileList);
            }

            this.displayProfile();
        });

        document.getElementById("publicProfileLink").href = "#/profil/" + localStorage.myId;

        document.getElementById("saveBio").addEventListener("click", () => {
            this.profileService.updateBio(this.elements.bio.value);
        });

        this.elements.fileInput.addEventListener('change', () => {
            this.profileService.uploadFile(this.elements.fileInput.files[0])
            .then(() => {
                return this.profileService.getFileList(localStorage.myId)
            }).then(files => {
                this.printFileList(files);
            });
        });

        return true;
    }

    destroy() {

    }

    displayProfile() {
        this.printFileList(this.fileList);
        this.elements.profilePicture.src = this.profile.profilePicture;
        this.elements.nameHeader.innerHTML = this.profile.name;
        document.title = this.profile.name;

        switch (this.profile.userType) {
            case 0:
                this.elements.userTypeHeader.innerHTML = "Elev";
                break;
            case 1:
                this.elements.userTypeHeader.innerHTML = "Student";
                break;
            default:
            break;
        }

        this.elements.bio.value = this.profile.biography;

        document.querySelectorAll("button[name='deleteFile']").forEach(e => {
            e.addEventListener("click", ev => {
                let fileId = ev.currentTarget.dataset.fileId;
                this.profileService.deleteFile(fileId)
                .then(() => {
                    return fileId
                }).then(() => {
                    console.log("he");
                    this.elements.fileList.removeChild(document.getElementById("li" + fileId));
                });
            });
        });

        this.elements.profilePage.classList.remove("w3-hide");
    }

    printFileList(files) {
        this.elements.fileList.innerHTML += this.pattern.render(this.templates.fileList, files);
    }
}
