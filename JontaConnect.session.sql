--Question1
SELECT name, address
FROM customers
WHERE country = 'United States';

--Question2
SELECT * from customers 
ORDER BY name ASC;

--Question3
SELECT * FROM products WHERE product_name LIKE '%socks%';

--Question4
SELECT
order_items.product_id, products.product_name, product_availability.unit_price, order_items.supplier_id
FROM product_availability
INNER JOIN order_items
ON order_items.product_id = product_availability.prod_id 
INNER JOIN products 
ON products.id = product_availability.prod_id 
WHERE product_availability.unit_price > 100;

--Question5
SELECT * FROM products
INNER JOIN product_availability
ON products.id = product_availability.prod_id 
ORDER BY product_availability.unit_price DESC 
LIMIT 5;


