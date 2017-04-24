# Cookie_Challange

You have access to a paginated API in: https://backend-challenge-fall-2017.herokuapp.com/orders.json 
where you can obtain all the orders. The API accepts a `page` parameter, example: https://backend-challenge-fall-2017.herokuapp.com/orders.json?page=2

Requirements


Read all orders from the paginated API.
Any order without cookies can be fulfilled.
Prioritize fulfilling orders with the highest amount of cookies.
If orders have the same amount of cookies, prioritize the order with the lowest ID.
If an order has an amount of cookies bigger than the remaining cookies, skip the order.



What to submit: 

Output (in JSON)

```{
  "remaining_cookies": "Amount of cookies remaining after trying to fulfill orders",
  "unfulfilled_orders": [ "IDs of the order that couldn't be fulfilled in ascending order" ]
}```



*Example Answer Output

```{
  "remaining_cookies": 0,
  "unfulfilled_orders": [ 3, 5 ]
}```






## RUN
``` npm install ```

``` node server.js```

## Deployed Version

[Link](https://cookie-challenge.herokuapp.com/)
