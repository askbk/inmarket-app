console.log("ajaxing data");
$.get("php/getEvents.php", function (data, status) {
    console.log("parsing json");
    let events = JSON.parse(data);
    let template = document.getElementById("template").innerHTML;
    console.log("calling templating engine");
    let rendered = Pattern.render(template, events);
    console.log("received return");
    $("#template").parent().append(rendered);
    console.log("appended new stuff");
    $("#template").remove();
    $("#currentPageHeader").text("Eventer nær deg");
});
