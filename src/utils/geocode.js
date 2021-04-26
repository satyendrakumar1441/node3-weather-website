const request = require('request');
const mapbox_api_key = 'pk.eyJ1Ijoic2F0eWEta3VtYXIiLCJhIjoiY2tubDZ0bXBjMGZhMjJvcDlvcG95d3h2MSJ9.ny-K_Q8EVEfeXcdvqT04VA';

const geocode = (address, callback) => {
    const url =  
    'https://api.mapbox.com/geocoding/v5/mapbox.places/'
   // + 'Los%20Angeles.json'
  //  + 'Austin.json'
  //  + 'San%20Francisco.json'
    + encodeURIComponent(address) + '.json'
    + '?access_token=' + mapbox_api_key
    + '&limit=1'
    ;

    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to location service!', undefined);
        } else if (!body.features || body.features.length === 0){
            callback('Unable to connect to location service!', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name

            });
        }
    });
}

module.exports = geocode;