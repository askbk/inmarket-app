function ajax(vals, path, method, readyFunc) {
    let data;
    let xhttp = new XMLHttpRequest();

    for (let i = 0; i < vals.length) {
        data = "val" + i + "=" + encodeURIComponent(vals[i]) + "&";
    }

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            readyFunc(this);
        }
    };

    xhttp.open(method, path, true);
    xhttp.setRequestHeader("Content-Type", "application-x-www-for-urlencoded; charset=UTF-8");
    xhttp.send(data)
}
