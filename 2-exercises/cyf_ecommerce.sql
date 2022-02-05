drop table if exists order_items;
drop table if exists orders cascade;
DROP TABLE IF EXISTS product_availability cascade;
drop table if exists customers cascade;
drop table if exists products cascade;
drop table if exists suppliers cascade;

CREATE TABLE customers (
  id       SERIAL PRIMARY KEY,
  name     VARCHAR(50) NOT NULL,
  address  VARCHAR(120),
  city     VARCHAR(30),
  country  VARCHAR(20)
);

CREATE TABLE suppliers (
    id              SERIAL PRIMARY KEY,
    supplier_name   VARCHAR(100) NOT NULL,
    country         VARCHAR(20) NOT NULL
);

CREATE TABLE products (
    id             SERIAL PRIMARY KEY,
    product_name   VARCHAR(100) NOT NULL
);

create table product_availability (
  prod_id       integer references products(id),
  supp_id       integer references suppliers(id),
  unit_price    integer not null,
  primary key (prod_id, supp_id) 
);

CREATE TABLE orders (
    id              SERIAL PRIMARY KEY,
    order_date      DATE NOT NULL,
    order_reference VARCHAR(10) NOT NULL,
    customer_id     INT REFERENCES customers(id)
);

CREATE TABLE order_items (
    id          SERIAL PRIMARY KEY,
    order_id    INT NOT NULL REFERENCES orders(id),
    product_id  INT NOT NULL,
    supplier_id INT NOT NULL,
    quantity    INT NOT NULL,
    FOREIGN KEY (product_id, supplier_id)
        REFERENCES product_availability (prod_id, supp_id)
);

INSERT INTO customers (name, address, city, country) VALUES ('Guy Crawford','770-2839 Ligula Road','Paris','France');
INSERT INTO customers (name, address, city, country) VALUES ('Hope Crosby','P.O. Box 276, 4976 Sit Rd.','Steyr','United Kingdom');
INSERT INTO customers (name, address, city, country) VALUES ('Britanney Kirkland','P.O. Box 577, 5601 Sem, St.','Little Rock','United Kingdom');
INSERT INTO customers (name, address, city, country) VALUES ('Amber Tran','6967 Ac Road','Villafranca Asti','United States');
INSERT INTO customers (name, address, city, country) VALUES ('Edan Higgins','Ap #840-3255 Tincidunt St.','Arles','United States');
INSERT INTO customers (name, address, city, country) VALUES ('Quintessa Austin','597-2737 Nunc Rd.','Saint-Marc','United Kingdom');

INSERT INTO suppliers (supplier_name, country) VALUES ('Amazon', 'United States');
INSERT INTO suppliers (supplier_name, country) VALUES ('Taobao', 'China');
INSERT INTO suppliers (supplier_name, country) VALUES ('Argos', 'United Kingdom');
INSERT INTO suppliers (supplier_name, country) VALUES ('Sainsburys', 'United Kingdom');


INSERT INTO products (product_name) VALUES ('Mobile Phone X');
INSERT INTO products (product_name) VALUES ('Javascript Book');
INSERT INTO products (product_name) VALUES ('Le Petit Prince');
INSERT INTO products (product_name) VALUES ('Super warm socks');
INSERT INTO products (product_name) VALUES ('Coffee Cup');
INSERT INTO products (product_name) VALUES ('Ball');
INSERT INTO products (product_name) VALUES ('Tee Shirt Olympic Games');

INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES (1, 4, 249);
INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES (1, 1, 299); 
INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES (2, 2, 41);
INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES (2, 3, 39);
INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES (2, 1, 40);
INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES (3, 4, 10);
INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES (3, 1, 10);
INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES (4, 4, 10);
INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES (4, 3, 8);
INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES (4, 2, 5);
INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES (4, 1, 10);
INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES (5, 4, 5);
INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES (5, 3, 4);
INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES (5, 2, 4);
INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES (5, 1, 3);
INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES (6, 2, 20);
INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES (6, 4, 15);
INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES (6, 1, 14);
INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES (7, 3, 21);
INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES (7, 2, 18);
INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES (7, 1, 20);

INSERT INTO orders (order_date, order_reference, customer_id) VALUES ('2019-06-01', 'ORD001', 1);
INSERT INTO orders (order_date, order_reference, customer_id) VALUES ('2019-07-15', 'ORD002', 1);
INSERT INTO orders (order_date, order_reference, customer_id) VALUES ('2019-07-11', 'ORD003', 1);
INSERT INTO orders (order_date, order_reference, customer_id) VALUES ('2019-05-24', 'ORD004', 2);
INSERT INTO orders (order_date, order_reference, customer_id) VALUES ('2019-05-30', 'ORD005', 3);
INSERT INTO orders (order_date, order_reference, customer_id) VALUES ('2019-07-05', 'ORD006', 4);
INSERT INTO orders (order_date, order_reference, customer_id) VALUES ('2019-04-05', 'ORD007', 4);
INSERT INTO orders (order_date, order_reference, customer_id) VALUES ('2019-07-23', 'ORD008', 5);
INSERT INTO orders (order_date, order_reference, customer_id) VALUES ('2019-07-24', 'ORD009', 5);
INSERT INTO orders (order_date, order_reference, customer_id) VALUES ('2019-05-10', 'ORD010', 5);

INSERT INTO order_items VALUES (1, 1, 7, 2, 1);
INSERT INTO order_items VALUES (2, 1, 4, 2, 5);
INSERT INTO order_items VALUES (3, 2, 4, 3, 4);
INSERT INTO order_items VALUES (4, 2, 3, 4, 1);
INSERT INTO order_items VALUES (5, 3, 5, 3, 10);
INSERT INTO order_items VALUES (6, 3, 6, 2, 2);
INSERT INTO order_items VALUES (7, 4, 1, 1, 1);
INSERT INTO order_items VALUES (8, 5, 2, 3, 2);
INSERT INTO order_items VALUES (9, 5, 3, 1, 1);
INSERT INTO order_items VALUES (10, 6, 5, 2, 3);
INSERT INTO order_items VALUES (11, 6, 2, 2, 1);
INSERT INTO order_items VALUES (12, 6, 3, 4, 1);
INSERT INTO order_items VALUES (13, 6, 4, 4, 3);
INSERT INTO order_items VALUES (14, 7, 4, 3, 15);
INSERT INTO order_items VALUES (15, 8, 7, 1, 1);
INSERT INTO order_items VALUES (16, 8, 1, 4, 1);
INSERT INTO order_items VALUES (17, 9, 6, 4, 2);
INSERT INTO order_items VALUES (18, 10, 6, 2, 1);
INSERT INTO order_items VALUES (19, 10, 4, 1, 5);




----------------------------------------

--1. Retrieve all the customers' names and addresses who live in the United States
SELECT name, address FROM customers WHERE country = 'United States';
--2. Retrieve all the customers in ascending name sequence
SELECT name FROM customers ORDER BY name ASC;
--3. Retrieve all the products whose name contains the word `socks`
SELECT product_name FROM products WHERE product_name LIKE '%socks%';
--4. Retrieve all the products which cost more than 100 showing product id, name, unit price and supplier id using a join query between products and product_availability
SELECT products.id, products.product_name, product_availability.unit_price, product_availability.supp_id FROM products INNER JOIN product_availability ON products.id = product_availability.prod_id WHERE product_availability.unit_price > 100;
--5. Retrieve the 5 most expensive products ordered by price in descending order and show product id, name, unit price and supplier id using a join query between products and product_availability
SELECT products.id, products.product_name, product_availability.unit_price, product_availability.supp_id FROM products INNER JOIN product_availability ON products.id = product_availability.prod_id ORDER BY product_availability.unit_price DESC LIMIT 5;
--6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name` from the products table and the columns `supplier_name` and `supplier_address` from the suppliers table. The result should be ordered by product name in ascending order. 
SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name, suppliers.country FROM products INNER JOIN product_availability ON products.id = product_availability.prod_id INNER JOIN suppliers ON product_availability.supp_id = suppliers.id ORDER BY products.product_name ASC;
--7. Retrieve all the products sold by suppliers based in the United Kingdom. The result should only contain the columns `product_name` and `supplier_name`. The result should be ordered by product name in ascending order.
SELECT products.product_name, suppliers.supplier_name FROM products INNER JOIN product_availability ON products.id = product_availability.prod_id INNER JOIN suppliers ON product_availability.supp_id = suppliers.id WHERE suppliers.country = 'United Kingdom' ORDER BY products.product_name ASC;
--8. Retrieve all orders, including order items, from customer ID `1`. Include order id, reference, date and total cost (calculated as quantity * unit price). USING a join query between orders and order_items
SELECT orders.id, orders.order_reference, orders.order_date, SUM(order_items.quantity * order_items.unit_price) AS total_cost FROM orders INNER JOIN order_items ON orders.id = order_items.order_id WHERE orders.customer_id = 1 GROUP BY orders.id;


--I make a new json file and add the password in that, you can then add that json file to the .gitignore then import that json file in the main server

--9. Retrieve all orders, including order items, from customer named `Hope Crosby`. Include order id, reference, date and total cost (calculated as quantity * unit price). USING a join query between orders and order_items
--select from inner join group each query in different line 

SELECT orders.id, orders.order_reference, orders.order_date, SUM(order_items.quantity * product_availability.unit_price) AS total_cost 
FROM orders 
INNER JOIN order_items ON orders.id = order_items.order_id 
INNER JOIN customers ON orders.customer_id = customers.id 
INNER JOIN product_availability ON product_availability.supp_id = order_items.supplier_id AND product_availability.prod_id = order_items.product_id 
WHERE customers.name = 'Hope Crosby' 
GROUP BY orders.id;

--10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.
SELECT products.product_name, product_availability.unit_price, order_items.quantity 
FROM products
INNER JOIN order_items ON products.id = order_items.product_id 
INNER JOIN product_availability ON products.id = product_availability.prod_id AND product_availability.supp_id = order_items.supplier_id 
INNER JOIN orders ON order_items.order_id = orders.id 
WHERE orders.order_reference = 'ORD006';

--11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference`, `order_date`, `product_name`, `supplier_name` and `quantity`.
SELECT customers.name, orders.order_reference, orders.order_date, products.product_name, suppliers.supplier_name, order_items.quantity 
FROM customers INNER JOIN orders ON customers.id = orders.customer_id 
INNER JOIN order_items ON orders.id = order_items.order_id 
INNER JOIN products ON order_items.prod_id = products.id 
INNER JOIN product_availability ON products.id = product_availability.prod_id tINNER JOIN suppliers ON product_availability.supp_id = suppliers.id;
--12. Retrieve the names of all customers who bought a product from a supplier based in China.
SELECT customers.name FROM customers INNER JOIN orders ON customers.id = orders.customer_id INNER JOIN order_items ON orders.id = order_items.order_id INNER JOIN products ON order_items.prod_id = products.id INNER JOIN product_availability ON products.id = product_availability.prod_id INNER JOIN suppliers ON product_availability.supp_id = suppliers.id WHERE suppliers.country = 'China';

--13. List all orders giving customer name, order reference, order date and order total amount (quantity * unit price) in descending order of total.
SELECT MAX(customers.name), orders.order_reference, orders.order_date, SUM(order_items.quantity * product_availability.unit_price) AS total_amount 
FROM customers 
INNER JOIN orders ON customers.id = orders.customer_id 
INNER JOIN order_items ON orders.id = order_items.order_id 
INNER JOIN product_availability ON order_items.product_id = product_availability.prod_id AND product_availability.supp_id = order_items.supplier_id 
GROUP BY orders.id 
ORDER BY total_amount DESC;


