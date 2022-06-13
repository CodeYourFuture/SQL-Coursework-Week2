-- 1. Retrieve all the customers' names and addresses who live in the United States

select name, address from customers where country = 'United States';

-- 2. Retrieve all the customers in ascending name sequence

select name from customers order by name ASC;

-- 3. Retrieve all the products whose name contains the word `socks`

select * from products where product_name LIKE '%socks%';

-- 4. Retrieve all the products which cost more than 100 showing product id, name, unit price and supplier id.

select product_availability.prod_id, products.product_name, product_availability.unit_price, product_availability.supp_id from product_availability
inner join products on products.id = product_availability.prod_id
where product_availability.unit_price > 100;

-- 5. Retrieve the 5 most expensive products

select products.product_name, product_availability.unit_price from products
inner join product_availability on products.id = product_availability.prod_id
order by product_availability.unit_price DESC limit 5;

-- 6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`



-- 7. Retrieve all the products sold by suppliers based in the United Kingdom. The result should only contain the columns `product_name` and `supplier_name`.
-- 8. Retrieve all orders, including order items, from customer ID `1`. Include order id, reference, date and total cost (calculated as quantity * unit price).
-- 9. Retrieve all orders, including order items, from customer named `Hope Crosby`
-- 10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.
-- 11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference`, `order_date`, `product_name`, `supplier_name` and `quantity`.
-- 12. Retrieve the names of all customers who bought a product from a supplier based in China.
-- 13. List all orders giving customer name, order reference, order date and order total amount (quantity * unit price) in descending order of total.