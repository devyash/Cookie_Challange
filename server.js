const express = require('express')
const axios = require('axios')
// const bodyParser= require('body-parser')
const app = express()

// process.env.PORT lets the port be set by Heroku
let port = process.env.PORT || 8080;
// app.use(bodyParser.urlencoded({extended: true}))

let givenurl = 'https://backend-challenge-fall-2017.herokuapp.com/orders.json';
let available_cookies;
let orders= [];
let unfulfilledOrders=[];
let ordersWithCookies=[];
let ordersWithoutTooManyCookies=[];
let sortedOrders=[];
let remaining_cookies=0;
let unfulfilled_orders=[];




app.get('/', (req, res) => {
	orders=[]
let current_page,total;
let output={
  "remaining_cookies": 0,
  "unfulfilled_orders": []
}
getData(givenurl);
	

//This function recursively calls to itself
function getData(url){
		axios.get(url)
	.then(function (response) {
		current_page=response.data.pagination.current_page;
		total=response.data.pagination.total;
		available_cookies=parseInt(response.data.available_cookies);
		// console.log("available_cookies"+available_cookies);
		if(current_page>total){
			filterFullfilledOrders();
			fullfillOrdersWithoutCookie();
			sortByCookiesAndId();
			fufillOrders();
		}
		else {
			let nextpage=current_page+1;
			let nextpageurl='?page='+nextpage;
			if(response.data.orders.length>0){
			orders=orders.concat(response.data.orders);
			}
			getData(givenurl+nextpageurl);
		}
	})
	.catch(function (error) {
		console.log(error);
	});
}





// Filters out fulfilled orders
function filterFullfilledOrders() {
  unfulfilled_orders=[]
  unfulfilledOrders = orders.filter((order) => {
    return order.fulfilled !== true;
  })
}
//helper function for find that helps in selecting the products that is cookie
function findCookies(products) { 
    return products.title === 'Cookie';
}


// Function to remove orders without cookies as they can be fullfilled
function fullfillOrdersWithoutCookie(){
	ordersWithCookies=null;
	ordersWithCookies=unfulfilledOrders.filter((order)=>{
		return order.products.find(findCookies);
	})
	 // res.send(ordersWithCookies);
}


//sort the cookies by number of cookie than by id
function sortByCookiesAndId(){
	sortedOrders=[];
	sortedOrders=ordersWithCookies.sort((x,y)=>{
		let order1=(y.products.find(findCookies).amount>x.products.find(findCookies).amount)
		return (order1==0)?(x.id-y.id):order1;
	
	});
	 // res.send(sortedOrders);
}

//Full fill possible orders based on available cookies
function fufillOrders(){
	let remaining_cookies=available_cookies;
	let unfulfilled_orders=[];

	let i=0;
	while(remaining_cookies>=0&&i<sortedOrders.length){

		let current_amount=sortedOrders[i].products.find(findCookies).amount;
		let current_order=sortedOrders[i]

		if(remaining_cookies>=current_amount)
			remaining_cookies=remaining_cookies-current_amount;
		else
			unfulfilled_orders.push(current_order.id);

		i++;
		 

	}
	output.remaining_cookies=remaining_cookies;
	output.unfulfilled_orders=unfulfilled_orders.sort((a,b)=>a-b);
	res.send(output);

}
	
});


app.listen(port, function() {
	console.log('Our app is running on port:' + port);
});

