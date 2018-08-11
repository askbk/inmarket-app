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
            controller  : "js/videos.js",
            load        : function () {
                //home();
            }
        },
        "registrering"  : {
            url         : "register.html",
            html        : "",
            controller  : "js/register.js",
            load        : function () {
                register();
            }
        },
        "innlogging"    : {
            url         : "login.html",
            html        : "",
            controller  : "js/login.js",
            load        : function () {
                login();
            }
        },
        "bedrift"       : {
            url         : "templates/bedrift.html",
            html        : "",
            controller  : "js/bedrift.js",
            load        : function () {
                company();
            }
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
            controller  : "js/contact.js",
            load        : function () {
                contact();
            }
        },
        "feil"          : {
            url         : "error.html",
            html        : "",
            controller  : "js/error.js",
            load        : function () {
                //error();
            }
        },
        "instillinger"  : {
            url         : "settings.html",
            html        : "",
            controller  : "js/settings.js",
            load        : function () {
                settings();
            }
        },
        "gruppe"       : {
            url         : "templates/group.html",
            html        : "",
            controller  : "js/group.js",
            load        : function () {
                group();
            }
        },
        "grupper"       : {
            url         : "templates/groups.html",
            html        : "",
            controller  : "js/groups.js",
            load        : function () {
                groups();
            }
        },
        "profil"       : {
            url         : "profile.html",
            html        : "",
            controller  : "js/profile.js",
            load        : function () {
                profile();
            }
        },
        "meg"       : {
            url         : "myProfile.html",
            html        : "",
            controller  : "js/myProfile.js",
            load        : function () {
                //myProfile();
            }
        }
    },
    route           : function() {
        Router.parameters = window.location.hash.split('/');
        let page = Router.parameters[1];
        if (Router.routes[page]) {
            document.getElementById("content").innerHTML = Router.routes[page].html;

            //console.log(Router.routes[page].html);

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
