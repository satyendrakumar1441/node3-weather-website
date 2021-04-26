const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// app.com -> to index.html in express.static(...)
// app.com/help
// app.com/about

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Satyendra Kumar'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Satyendra Kumar'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Satyendra Kumar',
        helpText: 'This is some helpful text.'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        });
    }

    const location = req.query.address;
    geocode(location, (error, {latitude, longitude, location:place} = {}) => {
        if (error) {
            return res.send({
                error: 'You must provide a correct address!'
            });
        }
        
        forecast(latitude, longitude, (error, fdata) => {
            if (error) {
                return res.send({
                    error
                });
             }

             res.send({
                forecast: fdata.weatherCondition
                    + '. It is ' 
                    + fdata.temperature
                    + ' degrees out.'
                    + ' It feels like ' 
                    +  fdata.feelsLike
                    + ' degress.'
                    + ' Humidity is ' + fdata.humidity,
                location: place,
                address: location
            }); 
        });
    });

    
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Satyendra Kumar',
        errorMessage: 'Help article not found!'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Satyendra Kumar',
        errorMessage: 'Page not found!'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.');
});
