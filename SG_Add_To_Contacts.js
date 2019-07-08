exports.handler = function(context, event, callback) {
    var got = require('got');
    var uri = "https://api.sendgrid.com/v3/contactdb/recipients";
    var fname = event.fname;
    var pnumber = event.pnumber;
    var email = event.email;
    console.log(fname + pnumber);
    var payload = "[{\"email\":\""+ email +"\",\"first_name\":\""+ fname +"\",\"pnumber\":\""+ pnumber +"\"}]";
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
               console.log(response.body);
               //json_response = JSON.parse(response);
               callback(null, response);
            }).catch(function(error) {
               console.log("mail send error "+ email);
                callback(error);
            });
};
