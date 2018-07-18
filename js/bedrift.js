$(document).ready(function () {
    console.log(Router.getParameters());
    if (Router.getParameters().length > 2) {
        parameter = Router.getParameters()[2];
    }

    $.ajax({
        url: 'php/getBedrifter.php?bedrift=' + parameter,
        beforeSend: function(request){
            request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
        },
        type: 'GET',
        success: function(data) {
            let bedrift = JSON.parse(data);
            printInfo(bedrift);
        },
        error: function(xhr, textStatus, errorThrown) {
            if (xhr.status == 401) {
                console.log("not logged in");
                location.hash = "/innlogging";
            } else {
                console.log("error: " + xhr.status);
            }
        }
    });

    $.ajax({
        url: 'php/getEmployees.php?bedrift=' + parameter,
        beforeSend: function(request){
            request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
        },
        type: 'GET',
        success: function(data) {
            let employees = JSON.parse(data);
            printEmployees(employees);
        },
        error: function(data, textStatus, xhr) {
            if (xhr.status == 401) {
                console.log("not logged in");
                location.hash = "/innlogging";
            } else {
                console.log("error: " + xhr.status);
            }
        }
    });

});

function printInfo(bedrift) {
    $("#currentPageHeader").text(bedrift["companyName"]);
    $("#description").text(bedrift["description"]);
    document.title = bedrift["companyName"] + " | InMarket App";
}

function printEmployees(employees) {
    if (employees.length == 0) {
        document.getElementById("employeeTable").innerHTML = "<p>Ingen registrerte ansatte</p>";
    } else {
        console.log(employees);
        let template = document.getElementById("employeeTemplate").innerHTML;
        console.log("template: " + template);
        let rendered = Pattern.render(template, employees);
        document.getElementById("employeeTemplate").innerHTML = rendered;
    }
}
