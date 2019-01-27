import { Component } from '../component.js';
import { template } from './requests.template.js';

export class RequestsComponent extends Component {
    constructor(DEBUG_MODE, networkService, appRouter, pattern) {
        super(DEBUG_MODE, {
            userListItem: "#user-list-item-template"
        }, {
            requestList: "#request-list"
        }, undefined, template);

        this.pattern = pattern;
        this.networkService = networkService;
        this.appRouter = appRouter;
        this.requests = undefined;
    }

    init() {
        super.initDOM();

        this.networkService.getRequests().then(requests => {
            this.requests = requests;
            if (this.DEBUG_MODE) {
                console.log(this.requests);
            }

            document.getElementsByClassName("button-accept-requst").forEach(e => {
                e.addEventListener("click", ev => {
                    let user_id = ev.currentTarget.dataset.userId;
                    this.networkService.acceptRequest(user_id)
                    .then(() => {
                        this.elements.requestList.removeChild(document.getElementById("li-user-" + user_id));
                    });
                })
            });

            document.getElementsByClassName("button-reject-requst").forEach(e => {
                e.addEventListener("click", ev => {
                    let user_id = ev.currentTarget.dataset.userId;
                    this.networkService.rejectRequest(user_id)
                    .then(() => {
                        this.elements.requestList.removeChild(document.getElementById("li-user-" + user_id));
                    });
                })
            });
        });
    }
}
