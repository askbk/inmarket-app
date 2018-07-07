console.log("ajaxing data");
$.get("php/getVideos.php", function (data, status) {
    console.log("parsing json");
    let videos = JSON.parse(data);
    let template = document.getElementById("template").innerHTML;
    console.log("calling templating engine");
    let rendered = Pattern.render(template, videos);
    console.log("received return");
    $("#template").parent().append(rendered);
    console.log("appended new stuff");
    $("#template").remove();
    $("#currentPageHeader").text("Bedriftsvideoer");
});
