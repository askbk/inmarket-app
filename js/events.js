console.log("ajaxing data");
$.get("php/getEvents.php", function (data, status) {
    console.log("parsing json");
    let events = JSON.parse(data);
    console.log(events);
    let template = document.getElementById("template").innerHTML;
    console.log("template: " + template);
    let rendered = Pattern.render(template, events);
    console.log("received return");
    document.getElementById("template").innerHTML = rendered;
    $("#currentPageHeader").text("Eventer nær deg");
});
