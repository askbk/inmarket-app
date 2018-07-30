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
        "registrering"  : {
            url         : "register.html",
            controller  : "js/register.js"
        },
        "innlogging"    : {
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
        "samtale"       : {
            url         : "templates/conversation.html",
            controller  : "js/conversation.js"
        },
        "kontakt"       : {
            url         : "kontakt.html",
            controller  : "js/contact.js"
        },
        "feil"          : {
            url         : "error.html",
            controller  : "js/error.js"
        },
        "instillinger"  : {
            url         : "settings.html",
            controller  : "js/settings.js"
        },
        "grupper"       : {
            url         : "template/group.html",
            controller  : "js/group.js"
        }
    },
    route           : function() {
        Router.parameters = window.location.hash.split('/');
        let page = Router.parameters[1];
        try {
            $("#content").load(Router.routes[page].url);
        } catch (e) {
            $("#content").load(Router.routes["feil"].url);
        }
        Router.loadController(Router.routes[page].controller);
    },
    loadController  : function(url) {
        $("#pageController").remove();
        let s = document.createElement("script");
        s.src = url;
        s.id = "pageController";
        document.head.appendChild(s);
    },
    parameters      : [],
    getParameters   : function() {
        return Router.parameters;
    }
};
