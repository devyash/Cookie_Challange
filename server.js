const express = require('express')
const axios = require('axios')
// const bodyParser= require('body-parser')
const app = express()

// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;
// app.use(bodyParser.urlencoded({extended: true}))

var url = 'https://backend-challenge-fall-2017.herokuapp.com/orders.json';
var available_cookies;
var orders= [];
var unfulfilledOrders=[];
var ordersWithCookies=[];
var ordersWithoutTooManyCookies=[];
var sortedCookies=[]




app.get('/', (req, res) => {
let current_page,total;
	getData(url);
let output={
  "remaining_cookies": 0,
  "unfulfilled_orders": []
}
	


function getData(url){
	axios.get(url)
	.then(function (response) {
		current_page=response.data.pagination.current_page;
		total=response.data.pagination.total;
		if(current_page>total){
			console.log("got all the data");
			removeFulfilledOrders();
			fullfillOrdersWithoutCookie();
		}
		else {
			let nextpage=current_page+1;
			let nextpageurl='?page='+nextpage;
			if(response.data.orders.length>0){
			orders=orders.concat(response.data.orders);
			}
			url = this.url;
			getData(url+nextpageurl);
		}
	})
	.catch(function (error) {
		console.log(error);
	});
}


// Filters out fulfilled orders
function removeFulfilledOrders() {
  unfulfilledOrders = orders.filter((order) => {
    return order.fulfilled !== true;
  })
}

//Helper Function
function checkIfProductsHaveCookies(array, key, value) {
  for (let i = 0; i < array.length; i++) {
    if(array[i][key] === value) {
      return true;
    }
  }
  return false;
}

// Function to remove orders without cookies as they can be fullfilled
function fullfillOrdersWithoutCookie(){
	ordersWithCookies=[];
	ordersWithCookies=unfulfilledOrders.filter((order)=>{
		return checkIfProductsHaveCookies(order.products,"title","Cookie")
	})
	res.send(ordersWithCookies);
}

function sortByCookiesAndId(){
	sortedCookies=[];
	sortedCookies=ordersWithCookies.sort();

}









	
});









app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});

