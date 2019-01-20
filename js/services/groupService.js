export class GroupService {
    constructor(DEBUG_MODE) {
        this.DEBUG_MODE = DEBUG_MODE;
        this.subscribers = [];
        this.content = {};
        this.active = false;
        this.groupId = 0;
        this.prevPostId = 0;
        this.prevCommId = 0;
        this.contentRetrieval = setInterval(
            () => {
                if (this.active) {
                    this.getNewContent()
                    .then(
                        result => {
                            this.push(result);
                        }
                    );
                }
            },
            1000
        );
    }

    getPosts() {
        return fetch('php/getGroupPosts.php', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                "Authorization": "Bearer " + localStorage.jwt,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"groupId": groupId})
        }).then(response => {
            return response.json()
        }).then(posts => {
            console.log(posts);
            return posts;
        });
    }

    getNewContent() {
        const postParams = {
            "groupId"       : this.groupId,
            "prevPostId"    : this.prevPostId,
            "prevCommId"    : this.prevCommId
        };

        return fetch("php/getGroupPosts.php", {
            method: "post",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                "Authorization": "Bearer " + localStorage.jwt,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postParams)
        }).then(response => {
            return response.json();
        }).then(result => {
            return result;
        });
    }

    createNewPost(post) {
        post = post.trim();
        if (post == "") { return false; }

        const data = {
            groupId : this.groupId,
            content : post
        };

        return fetch("php/createGroupPost.php", {
            method: 'post',
            headers: {
                "authorization": "Bearer " + localStorage.jwt
            },
            body: data
        });
    }

    createNewComment(comment, postId) {
        comment = comment.trim();
        if (comment == "") { return false; }

        const data = {
            postId : postId,
            content : comment
        };

        return fetch("php/createGroupComment.php", {
            method: "post",
            headers: {
                "authorization": "Bearer " + localStorage.jwt
            },
            body: data
        });
    }

    getGroupList() {
        return fetch("php/getGroup.php", {
            method: 'post',
            headers: {
                "Authorization": "Bearer " + localStorage.jwt
            }
        })
        .then(response => {
            return response.json();
        })
        .then(groups => {
            console.log(groups);
            return groups;
        });
    }

    subscribe(subscriber) {
        this.subscribers.push(subscriber);
        this.active = true;
    }

    unsubscribe(subscriber) {
        for (let i = 0; i < this.subscribers.length; ++i) {
            if (this.subscribers[i] === sub) {
                this.subscribers.splice(i, 1);
                if (this.subscribers.length == 0) {
                    this.active = false;
                }
                return true;
            }
        }

        return false;
    }

    push(content) {
        for (let subscriber of this.subscribers) {
            subscriber.receiveGroupContent(content);
        }
    }

    setGroupId(groupId) {
        this.groupId = groupId;
    }
}
