const express = require('express')
const axios = require('axios')
// const bodyParser= require('body-parser')
const app = express()

// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;
// app.use(bodyParser.urlencoded({extended: true}))



let url = 'https://backend-challenge-fall-2017.herokuapp.com/orders.json';
let available_cookies;
let orders= [];



app.get('/', (req, res) => {
	getData(url);
	res.send(orders);
});
function getData(url,callback){
	axios.get(url)
	  .then(function (response) {
	  	let current_page=response.data.pagination.current_page;
	  	let total=response.data.pagination.total;
	    if(current_page<total){
	    	console.log("Queried page:"+current_page)
	    	let nextpage=current_page+1;
	    	let nextpageurl='?page='+nextpage;
	    	console.log(nextpageurl)
	    	orders.push(response.data.orders);
	    	getData(url+nextpageurl);
	    	callback;
	    }

	  })
	  .catch(function (error) {
	    console.log(error);
	  });
	}




app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});
