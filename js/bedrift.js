function company() {
    const companyId = Router.getParameters()[2];

    CompanyModel.getCompany(companyId)
        .then(
            result => {
                CompanyController.printCompany(result);
            }
        );
}

const CompanyModel = {
    getCompany  : id => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/getBedrifter.php?bedrift=' + id,
                beforeSend: request => {
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'GET',
                success: data => {
                    resolve(JSON.parse(data));
                },
                error: (xhr, textStatus, errorThrown) => {
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

const CompanyController = {
    printCompany    : info => {
        $("#currentPageHeader").text(info["companyName"]);
        $("#description").text(info["description"]);
        document.title = info["companyName"] + " | InMarket App";
    }
}
