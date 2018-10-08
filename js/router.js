const Router = {
    routes  : {
        "undefined"     : {
            url         : "templates/hjem.html",
            html        : "",
            controller  : "js/home.js",
            load() {
                home();
            }
        },
        ""              : {
            url         : "templates/hjem.html",
            html        : "",
            controller  : "js/home.js",
            load() {
                home();
            }
        },
        "hjem"          : {
            url         : "templates/hjem.html",
            html        : "",
            controller  : "js/home.js",
            load() {
                home();
            }
        },
        "eventer"       : {
            url         : "templates/events.html",
            html        : "",
            controller  : "js/events.js",
            load() {
                events();
            }
        },
        "videoer"       : {
            url         : "templates/videoList.html",
            html        : "",
            controller  : "js/videos.js",
            load() {
                //home();
            }
        },
        "registrering"  : {
            url         : "templates/register.html",
            html        : "",
            controller  : "js/register.js",
            load() {
                register();
            }
        },
        "innlogging"    : {
            url         : "templates/login.html",
            html        : "",
            controller  : "js/login.js",
            load() {
                login();
            }
        },
        "bedrift"       : {
            url         : "templates/bedrift.html",
            html        : "",
            controller  : "js/bedrift.js",
            load() {
                company();
            }
        },
        "meldinger"     : {
            url         : "templates/messages.html",
            html        : "",
            controller  : "js/messages.js",
            load() {
                messages();
            }
        },
        "samtale"       : {
            url         : "templates/conversation.html",
            html        : "",
            controller  : "js/conversation.js",
            load() {
                conversation();
            }
        },
        "kontakt"       : {
            url         : "templates/kontakt.html",
            html        : "",
            controller  : "js/contact.js",
            load() {
                contact();
            }
        },
        "feil"          : {
            url         : "templates/error.html",
            html        : "",
            controller  : "js/error.js",
            load() {
                //error();
            }
        },
        "instillinger"  : {
            url         : "templates/settings.html",
            html        : "",
            controller  : "js/settings.js",
            load() {
                settings();
            }
        },
        "gruppe"       : {
            url         : "templates/group.html",
            html        : "",
            controller  : "js/group.js",
            load() {
                group();
            }
        },
        "grupper"       : {
            url         : "templates/groups.html",
            html        : "",
            controller  : "js/groups.js",
            load() {
                groups();
            }
        },
        "profil"        : {
            url         : "templates/profile.html",
            html        : "",
            controller  : "js/profile.js",
            load() {
                profile();
            }
        },
        "meg"           : {
            url         : "templates/myProfile.html",
            html        : "",
            controller  : "js/myProfile.js",
            load() {
                myProfile();
            }
        },
        "kontrollpanel" : {
            url         : "templates/controlpanel.html",
            html        : "",
            controller  : "js/controlpanel.js",
            load() {
                controlpanel();
            }
        }
    },
    route() {
        Router.parameters = window.location.hash.split('/');
        const page = Router.parameters[1];
        if (Router.routes[page]) {
            document.getElementById("content").innerHTML = Router.routes[page].html;
            Router.routes[page].load();
        } else {
            document.getElementById("content").innerHTML = Router.routes["feil"].html;
            Router.routes["feil"].load();
        }
    },
    parameters      : [],
    getParameters() {
        return Router.parameters;
    }
};
