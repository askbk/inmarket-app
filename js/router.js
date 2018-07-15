let Router = {
    routes  : {
        "undefined"     : {
            url         : "templates/hjem.html",
            controller  : "js/home.js"
        },
        ""              : {
            url         : "templates/hjem.html",
            controller  : "js/home.js"
        },
        "hjem"          : {
            url         : "templates/hjem.html",
            controller  : "js/home.js"
        },
        "eventer"       : {
            url         : "templates/events.html",
            controller  : "js/events.js"
        },
        "videoer"       : {
            url         : "templates/videoList.html",
            controller  : "js/videos.js"
        },
        "register"      : {
            url         : "register.html",
            controller  : "js/register.js"
        },
        "login"         : {
            url         : "login.html",
            controller  : "js/login.js"
        },
        "bedrift"       : {
            url         : "templates/bedrift.html",
            controller  : "js/bedrift.js"
        },
        "meldinger"     : {
            url         : "templates/messages.html",
            controller  : "js/messages.js"
        },
        "samtale"      : {
            url         : "templates/conversation.html",
            controller  : "js/conversation.js"
        }
    },
    route           : function() {
        Router.parameters = window.location.hash.split('/');
        let page = Router.parameters[1];
        $("#content").load(Router.routes[page].url);
        Router.loadController(Router.routes[page].controller);
    },
    loadController  : function(url) {
        $("#pageController").remove();
        let s = document.createElement("script");
        s.src = url;
        s.id = "pageController";
        document.head.appendChild(s);
        //$("head").append(s);
        //$("#pageController").load(url);
    },
    parameters      : [],
    getParameters   : function() {
        return Router.parameters;
    }
};
