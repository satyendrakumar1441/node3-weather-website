const request = require('request');

const urlbase = 'http://api.weatherstack.com/forecast?access_key=3ca49fd909e26882301cdf7f8f4985e3';


const forecast = (latitude, longitude, callback) => {
    const url = urlbase 
    + '&query=' + latitude + ',' + longitude
    + '&units=f'
    ;
    request({url, json: true}, (error, {body} = {}) => {
        //console.log(response.body);
        if (error) {
            callback('Unable to connect to weather service.', undefined);
        } else if (body && body.error) {
            callback('Unable to find location.', undefined);
        } else {
            callback(undefined, {
                weatherCondition: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelsLike: body.current.feelslike,
                humidity: body.current.humidity
            });
        }
    });
}

module.exports = forecast;

