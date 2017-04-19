const express = require('express')
const bodyParser= require('body-parser')
const app = express()

// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  	res.sendFile(__dirname + '/index.html')
  
	})

app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});
})