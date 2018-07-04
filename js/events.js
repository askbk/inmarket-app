$.get("php/getEvents.php", function (data, status) {
    let events = JSON.parse(data);
    let template = document.getElementById("template").innerHTML;
    let rendered = Pattern.render(template, events);
    $("#template").parent().append(rendered);
    $("#template").remove();
});
