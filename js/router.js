let Router = {
    routes  : {
        "undefined"     : {
            url         : "templates/hjem.html",
            controller  : "js/home.js"
        },
        "/"             : {
            url         : "templates/hjem.html",
            controller  : "js/home.js"
        },
        "/hjem"         : {
            url         : "templates/hjem.html",
            controller  : "js/home.js"
        },
        "/eventer"      : {
            url         : "templates/events.html",
            controller  : "js/events.js"
        },
        "/videoer"      : {
            url         : "templates/videoList.html",
            controller  : "js/videos.js"
        },
        "/register"     : {
            url         : "register.html",
            controller  : "js/register.js"
        },
        "/login"        : {
            url         : "login.html",
            controller  : "js/login.js"
        }

    },
    route           : function() {
        x = window.location.hash.split('#')[1] || "/";
        $("#content").load(Router.routes[x].url);
        console.log(Router.routes[x].controller);
        Router.loadController(Router.routes[x].controller);
    },
    loadController  : function(url) {
        $("#pageController").remove();
        let s = document.createElement("script");
        s.src = url;
        s.id = "pageController";
        document.head.appendChild(s);
        //$("head").append(s);
        //$("#pageController").load(url);
    }
};
