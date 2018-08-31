function company() {
    let companyId = Router.getParameters()[2];

    CompanyModel.getCompany(companyId)
        .then(
            result => {
                CompanyController.printCompany(result);
            }
        );
}

let CompanyModel = {
    getCompany  : function (id) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/getBedrifter.php?bedrift=' + id,
                beforeSend: function(request){
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'GET',
                success: function(data) {
                    let bedrift = JSON.parse(data);
                    resolve(bedrift);
                },
                error: function(xhr, textStatus, errorThrown) {
                    if (xhr.status == 401) {
                        console.log("not logged in");
                        location.hash = "/innlogging";
                    } else {
                        console.log("error: " + xhr.status);
                    }
                    reject("error");
                }
            });
        });
    }
}

let CompanyController = {
    printCompany    : function (info) {
        $("#currentPageHeader").text(info["companyName"]);
        $("#description").text(info["description"]);
        document.title = info["companyName"] + " | InMarket App";
    }
}
