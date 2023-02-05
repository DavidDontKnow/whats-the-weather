// elements\
$(function () {

    $(".btn-primary").on("click", function () {
        let btn = $("input");
        let result = btn.val();
        console.log(result);
        geoApi(result);
        btn.val("");
    })

    function geoApi(result) {
        var requestURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + result + "&appid=1fb8f45e0d479a31123acdde2c53eba3";

        fetch(requestURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data)
            });
    }












})
