const express = require("express");

const bodyParser = require("body-parser");

const https = require("https");

const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.use(express.static("public"));

app.get("/" , function(req, res){
  res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res){
  const Fname = req.body.fname
  const Lname = req.body.lname
  const Email = req.body.email
  const Password = req.body.password

  console.log(Fname, Lname, Email, Password);

  const data = {
    members : [{
      email_address : Email,
      status: "subscribed",
      merge_fields: {
        FNAME: Fname,
        LNAME: Lname
      }
    }]
  }

  const JsonData = JSON.stringify(data);

  console.log(JsonData);

  const url = "https://us2.api.mailchimp.com/3.0/lists/c00322028e"

  const options = {
    method : "POST",
    auth : "rajiv:cb18f029bf72b88ad4bae7265dc283b0-us2"

  }

  const request = https.request(url, options, function(response){

    console.log(response.statusCode);

    if(response.statusCode == 200)
    {
      res.sendFile(__dirname + "/success.html")
    }
    else{
      res.sendFile(__dirname+"/failure.html")
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    })

  })


      request.write(JsonData)
      request.end();

})

app.post("/failure.html", function(req, res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function()
{
  console.log("You are connceted to 3000 port");
})


//c00322028e
//cb18f029bf72b88ad4bae7265dc283b0-us2
