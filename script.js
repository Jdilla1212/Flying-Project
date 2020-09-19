$(document).ready(function () {
    // Navbar dropdown initialization
    $(".dropdown-button").dropdown();

    $.ajax({
        url: "https://api.le-systeme-solaire.net/rest/bodies/",
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });
    


});
