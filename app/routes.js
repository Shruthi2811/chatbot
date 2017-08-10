// app/routes.js
var apiai = require('apiai');

var app2 = apiai("9514395950505205");


// grab the nerd model we just created
var Nerd = require('./models/nerd');

    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes
        app.get('/',function(req,res){
          var request = app2.textRequest('<Your text query>', {
            sessionId: 'as12345649848'
        });

        request.on('response', function(response) {
            console.log(response);
        });

        request.on('error', function(error) {
            console.log(error);
        });

        request.end();});
        // sample api route
        app.get('/api/nerds', function(req, res) {
            // use mongoose to get all nerds in the database
            Nerd.find(function(err, nerds) {

                // if there is an error retrieving, send the error.
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(nerds); // return all nerds in JSON format
            });
        });

        // route to handle creating goes here (app.post)
        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });

    };
