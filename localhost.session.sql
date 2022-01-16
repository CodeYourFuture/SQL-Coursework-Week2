SELECT name,address FROM customers WHERE country = 'United states';
SELECT * from customers ORDER BY name ASC;
SELECT * from  products WHERE product_name like  '%socks%';
SELECT * from  product_availability  WHERE unit_price > 100;
SELECT * from  product_availability  WHERE unit_price >= 39;
select products.product_name,suppliers.supplier_name 
from products JOIN suppliers on product_name = supplier_name
WHERE country = 'United Kingdom';
SELECT  * FROM orders;
SELECT  orders, customers.name  FROM orders  JOIN customers ON  
customers.name  LIKE 'Hope Crosby%';
 SELECT customers.name, supplier_name, suppliers.country FROM customers INNER JOIN  suppliers
ON customers.id = suppliers.id
WHERE suppliers.country = 'China';

 


