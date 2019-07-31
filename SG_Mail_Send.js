exports.handler = function(context, event, callback) {
    var got = require('got');
    var uri = "https://api.sendgrid.com/v3/mail/send";
    var fname = event.fname;
    var pnumber = event.pnumber;
    var email = event.email;
    console.log(fname + pnumber);
    var subject = "Twilio app proof of concept";
    var from = "austin@rhondajules.com";
    var html = "<h3>Hello " + fname + ", Thanks for signing up!<\/h3> <p><a href=\\\"https:\/\/www.twilio.com\/\\\">Click here to get started<\/a><\/p>";
    var payload = "{\"personalizations\": [{\"to\": [{\"email\": \"" + email + "\", \"name\": \"" + fname + "\"} ], \"subject\": \"" + subject + "\"} ], \"from\": {\"email\": \"" + from + "\"}, \"subject\": \"" + subject + "\", \"content\": [{\"type\": \"text\/html\", \"value\": \""+ html + "\"} ], \"categories\": [\"TwilAPP\"], \"custom_args\": {\"Phonenumber\" : \"" + pnumber + "\"} , \"tracking_settings\": {\"click_tracking\": {\"enable\": true }, \"open_tracking\": {\"enable\": true } } }";
    console.log("Payload: " + payload);
    got.post(uri, {
    body: payload,
    headers: {
       'accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': `Bearer ${context.SENDGRID_API_KEY}`
            },
            json: false
            }).then(function(response) {
               console.log(response);
               //json_response = JSON.parse(response);
               callback(null, response);
            }).catch(function(error) {
               console.log("mail send error "+ email);
                callback(error);
            });
};
