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
        error: function() {
            console.log("not logged in");
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
        error: function() {
            console.log("not logged in");
        }
    });

});

function printInfo(bedrift) {
    $("#currentPageHeader").text(bedrift["companyName"]);
    $("#description").text(bedrift["description"]);

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
