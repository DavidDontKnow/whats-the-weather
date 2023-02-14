// elements\
$(function () {

    loadBtn()

    function loadBtn() {
        for (let key = 0; key < window.localStorage.length; key++) {
            const keyName = window.localStorage.key(key)
            let data = window.localStorage.getItem(keyName)
            let cityBtn = $("#City-Buttons");
            let newBtn = $("<button>");
            newBtn.attr("type", "button");
            newBtn.attr("class", "btn btn-secondary mx-3 my-1 saved-btn");
            newBtn.attr("id", keyName);
            newBtn.text(JSON.parse(data).cityName.toUpperCase());
            cityBtn.append(newBtn);
        }
    }










    $(".btn-primary").on("click", function () {
        let btn = $("input");
        let result = btn.val();
        geoApi(result);
        // fillData(result, temp, wind, humidity, icon)
        btn.val("");

    })
    cityObject = {}

    function geoApi(result) {
        var requestURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + result + "&appid=1fb8f45e0d479a31123acdde2c53eba3";

        fetch(requestURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

                var cityName = data[0].name
                cityObject.cityName = cityName;
                var lat = data[0].lat
                var lon = data[0].lon

                getWeather(lat, lon, result)
                getForecast(lat, lon, result)

                cityObject.lat = lat;
                cityObject.lon = lon;


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
        var requestURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=1fb8f45e0d479a31123acdde2c53eba3";

        fetch(requestURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

                fillForecast(data, result)
            });

    }


    function fillData(result, temp, wind, humidity, icon) {
        let cityBtn = $("#City-Buttons");
        let newBtn = $("<button>");
        newBtn.attr("type", "button");
        newBtn.attr("class", "btn btn-secondary mx-3 my-1 saved-btn");
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

    function fillForecast(data, result) {


        var list = [data.list[1], data.list[8], data.list[16], data.list[24], data.list[32]]

        cityObject.forecast = list
        for (let i = 0; i < 5; i++) {

            var date = list[i].dt_txt.split(" ")

            dateDisplay = $("#forecast-" + i + "-date")
            dateDisplay.text(date)

            var icon = list[i].weather[0].icon
            iconDisplay = $("#icon-forecast-" + i)
            iconDisplay.attr("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png")

            var temp = list[i].main.temp
            var forecastTemp = $("#temp-forecast-" + i)
            forecastTemp.text(temp)

            var wind = list[i].wind.speed
            var forecastWind = $("#wind-forecast-" + i)
            forecastWind.text(wind)

            var humidity = list[i].main.humidity
            var forecastHumidity = $("#humidity-forecast-" + i)
            forecastHumidity.text(humidity)

        }
        window.localStorage.setItem(result, JSON.stringify(cityObject))
    }


    $("body").on("click", function (e) {
        var id = e.target.id

        if ($(e.target).hasClass("btn-secondary")) {
            console.log(id)
            loadButton(id)
        }
    })

    function loadButton(id) {

        let data = JSON.parse(window.localStorage.getItem(id))
        console.log(data)

        function getCurrentWeather(data) {
            lat = data.lat
            lon = data.lon

            var requestURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=1fb8f45e0d479a31123acdde2c53eba3";

            fetch(requestURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    var temp = data.main.temp
                    var wind = data.wind.speed
                    var humidity = data.main.humidity
                    var icon = data.weather[0].icon;
                    let city = $("#current-city");
                    city.text(data.name);
                    img = $("#weather-icon");
                    img.attr("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png");
                    tempDisplay = $("#current-temp");
                    tempDisplay.text(temp);
                    windDisplay = $("#current-wind");
                    windDisplay.text(wind);
                    humidityDisplay = $("#current-humidity");
                    humidityDisplay.text(humidity);
                });
        }

        getCurrentWeather(data)

        for (let i = 0; i < 5; i++) {

            var date = data.forecast[i].dt_txt.split(" ")
            dateDisplay = $("#forecast-" + i + "-date")
            dateDisplay.text(date)

            var icon = data.forecast[i].weather[0].icon
            iconDisplay = $("#icon-forecast-" + i)
            iconDisplay.attr("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png")

            var temp = data.forecast[i].main.temp
            var forecastTemp = $("#temp-forecast-" + i)
            forecastTemp.text(temp)

            var wind = data.forecast[i].wind.speed
            var forecastWind = $("#wind-forecast-" + i)
            forecastWind.text(wind)

            var humidity = data.forecast[i].main.humidity
            var forecastHumidity = $("#humidity-forecast-" + i)
            forecastHumidity.text(humidity)
        }
    }




})
