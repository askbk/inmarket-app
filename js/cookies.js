function setCookie(cname, cvalue, exdays, path="/"){
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=" + path;
}

function getCookieValue(cname){
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookies = decodedCookie.split(';');

    for(c of cookies) {
        while(c.charAt(0) == ' ') {
            c = c.substring(1);
        }

        if(c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }

    return "";
}
