export class GroupService {
    constructor(authService) {
        this.subscribers = [];
        this.content = {};
        this.authService = authService;
        this.contentRetrieval = setInterval(
            () => {
                this.getNewContent(
                    1,
                    0,
                    [],
                    0
                )
                    .then(
                        result => {
                            this.push(result);
                        }
                    );
            },
            1000
        );
    }

    getPosts(groupId) {
        return fetch('php/getGroupPosts.php', {
            method: 'post',
            headers: {
                "Authorization": "Bearer " + localStorage.jwt
            },
            body: "groupId=" + groupId
        }).then(result => {return JSON.parse(result)});
    }

    getNewContent(groupId, prevPostId, postIds, prevCommId) {
        const postParams = {
            "groupId"       : groupId,
            "prevPostId"    : prevPostId,
            "postIds"       : postIds,
            "prevCommId"    : prevCommId
        };
        return new Promise(
            (resolve, reject) => {
                $.ajax({
                    url: 'php/getGroupPosts.php',
                    beforeSend: request=> {
                        request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                    },
                    type: 'POST',
                    data: postParams,
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
            }
        );
    }

    createNewPost(post) {
        post = post.trim();

        if (post == "") {
            return false;
        }

        const data = {
            groupId : Router.getParameters()[2],
            content : post
        };
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/createGroupPost.php',
                beforeSend: request=> {
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: data,
                success: () => {
                    resolve("success");
                },
                error: () => {
                    console.log("not logged in");
                    location.hash = "/innlogging";
                    resolve("error");
                }
            });
        });
    }

    createNewComment(comment, postId) {
        comment = comment.trim();

        if (comment == "") {
            return false;
        }

        const data = {
            postId : postId,
            content : comment
        };
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/createGroupComment.php',
                beforeSend: request=> {
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: data,
                success: () => {
                    resolve("success");
                },
                error: () => {
                    console.log("not logged in");
                    location.hash = "/innlogging";
                    reject("error");
                }
            });
        });
    }

    subscribe(subscriber) {
        this.subscribers.push(subscriber);
    }

    unsubscribe(subscriber) {
        for (let i = 0; i < this.subscribers.length; ++i) {
            if (this.subscribers[i] === sub) {
                this.subscribers.splice(i, 1);
                return true;
            }
        }
    }

    push(content) {
        for (subscriber of this.subscribers) {
            subscriber.receiveGroupContent(content);
        }
    }
}
