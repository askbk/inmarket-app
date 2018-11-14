export class GroupService {
    constructor(authService) {
        this.subscribers = [];
        this.content = {};
        this.authService = authService;
        // this.contentRetrieval = setInterval(
        //     () => {
        //         this.getNewContent(1, 0, [], 0)
        //             .then(
        //                 result => {
        //                     this.push(result);
        //                 }
        //             );
        //     },
        //     1000
        // );
    }

    getPosts(groupId) {
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

    getNewContent(groupId, prevPostId, postIds, prevCommId) {

    }

    createNewPost(post) {
        post = post.trim();
        if (post == "") { return false; }

        const data = {
            groupId : Router.getParameters()[2],
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
