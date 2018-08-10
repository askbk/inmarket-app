let Router = {
    routes  : {
        "undefined"     : {
            url         : "templates/hjem.html",
            html        : "",
            controller  : "js/home.js",
            load        : function () {
                home();
            }
        },
        ""              : {
            url         : "templates/hjem.html",
            html        : "",
            controller  : "js/home.js",
            load        : function () {
                home();
            }
        },
        "hjem"          : {
            url         : "templates/hjem.html",
            html        : "",
            controller  : "js/home.js",
            load        : function () {
                home();
            }
        },
        "eventer"       : {
            url         : "templates/events.html",
            html        : "",
            controller  : "js/events.js",
            load        : function () {
                events();
            }
        },
        "videoer"       : {
            url         : "templates/videoList.html",
            html        : "",
            controller  : "js/videos.js"
        },
        "registrering"  : {
            url         : "register.html",
            html        : "",
            controller  : "js/register.js"
        },
        "innlogging"    : {
            url         : "login.html",
            html        : "",
            controller  : "js/login.js",
            load        : function () {
                login.load();
            }
        },
        "bedrift"       : {
            url         : "templates/bedrift.html",
            html        : "",
            controller  : "js/bedrift.js"
        },
        "meldinger"     : {
            url         : "templates/messages.html",
            html        : "",
            controller  : "js/messages.js",
            load        : function () {
                messages();
            }
        },
        "samtale"       : {
            url         : "templates/conversation.html",
            html        : "",
            controller  : "js/conversation.js",
            load        : function () {
                conversation();
            }
        },
        "kontakt"       : {
            url         : "kontakt.html",
            html        : "",
            controller  : "js/contact.js"
        },
        "feil"          : {
            url         : "error.html",
            html        : "",
            controller  : "js/error.js"
        },
        "instillinger"  : {
            url         : "settings.html",
            html        : "",
            controller  : "js/settings.js"
        },
        "grupper"       : {
            url         : "templates/group.html",
            html        : "",
            controller  : "js/group.js",
            load        : function () {
                group();
            }
        }
    },
    route           : function() {
        Router.parameters = window.location.hash.split('/');
        let page = Router.parameters[1];
        if (Router.routes[page]) {
            document.getElementById("content").innerHTML = Router.routes[page].html;

            console.log(Router.routes[page].html);

            Router.routes[page].load();
        } else {
            $("#content").load(Router.routes["feil"].url);
        }
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
