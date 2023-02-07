// elements\
$(function () {

    $(".btn-primary").on("click", function () {
        let btn = $("input");
        let result = btn.val();
        console.log(result);
        geoApi(result);
        // fillData(result, temp, wind, humidity, icon)
        btn.val("");
    })

    function geoApi(result) {
        var requestURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + result + "&appid=1fb8f45e0d479a31123acdde2c53eba3";

        fetch(requestURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                // console.log(data)
                var lat = data[0].lat
                var lon = data[0].lon
                // console.log(lon, lat)
                getWeather(lat, lon, result)
                getForecast(lat, lon, result)
            });
    }

    function getWeather(lat, lon, result) {
        var requestURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=1fb8f45e0d479a31123acdde2c53eba3";

        fetch(requestURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var temp = data.main.temp
                var wind = data.wind.speed
                var humidity = data.main.humidity
                var icon = data.weather[0].icon;
                fillData(result, temp, wind, humidity, icon)
            });

    }


    function getForecast(lat, lon, result) {
        var requestURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&cnt=5&appid=1fb8f45e0d479a31123acdde2c53eba3";

        fetch(requestURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data)
                var date = data.list[0].dt_txt.split(" ")
                dateDisplay = $("#forecast-1-date")
                dateDisplay.text(date[0])
                console.log(date[0])
            });

    }


    function fillData(result, temp, wind, humidity, icon) {
        let cityBtn = $("#City-Buttons");
        let newBtn = $("<button>");
        newBtn.attr("type", "button");
        newBtn.attr("class", "btn btn-secondary mx-3 my-1");
        newBtn.attr("id", result);
        newBtn.text(result.toUpperCase());
        cityBtn.append(newBtn);
        let city = $("#current-city")
        city.text(result.toUpperCase())
        img = $("#weather-icon")
        img.attr("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png")
        tempDisplay = $("#current-temp")
        tempDisplay.text(temp)
        windDisplay = $("#current-wind")
        windDisplay.text(wind)
        humidityDisplay = $("#current-humidity")
        humidityDisplay.text(humidity)

    }










})
