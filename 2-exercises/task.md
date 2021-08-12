# E-Commerce Database

In this homework, you are going to work with an ecommerce database. In this database, you have `products` that `consumers` can buy from different `suppliers`. Customers can create an `order` and several products can be added in one order.

## Submission

Below you will find a set of tasks for you to complete to set up a database for an e-commerce app.

To submit this homework write the correct commands for each question here:
```sql
1.   select name,address from customers where country ='United States' ;

2.   select * from customers order by "name" ;

3.   select * from products where product_name  like '%socks%'

4.   select proAv.prod_id,pro.product_name ,proAv.unit_price from product_availability proAv 
     inner join products pro on proAv.prod_id =pro.id ;

5.   select * from product_availability prodAv
     inner join products prod on prodav.prod_id =prod.id 
     limit 5;

6.   select prod.product_name,prodAv.unit_price, sup.supplier_name 
     from products prod 
     inner join product_availability prodAv on prod.id =prodAv.prod_id 
     inner  join  suppliers sup on sup.id =prodAv.supp_id ;

7.    select prod.product_name,sup.supplier_name
      from products prod 
      inner join product_availability pa on prod.id =pa.prod_id 
      inner join suppliers sup on pa.supp_id =sup .id ;

8.

9.

10.  select prod.product_name,pa.unit_price from
     products prod 
     inner join product_availability pa on prod.id =pa.prod_id 
     inner join order_items oi on oi.product_id =prod .id 
     inner join  orders o on o.id =oi.order_id 
      where o.order_reference ='ORD006'

11.  select cust.name,ord.order_reference,ord.order_date,prod.product_name,
     sup.supplier_name,ordIt.quantity
     from customers cust 
     inner join orders ord on ord.customer_id =cust.id 
     inner join order_items ordIt on ord .id =ordIt.order_id 
     inner  join  suppliers sup on sup .id =ordIt.supplier_id 
     inner join product_availability pa on pa.supp_id =sup.id 
     inner join products prod on prod.id =pa.prod_id ;
          

12.  select c.name from customers c 
     inner join orders o on o.customer_id =c.id 
     inner join order_items oi on oi.order_id =o.id 
     inner join suppliers s on s.id =oi.supplier_id 
     where s.country = 'China'

13.

```

When you have finished all of the questions - open a pull request with your answers to the `Databases-Homework` repository.

## Setup

To prepare your environment for this homework, open a terminal and create a new database called `cyf_ecommerce`:

```sql
createdb cyf_ecommerce
```

Import the file [`cyf_ecommerce.sql`](./cyf_ecommerce.sql) in your newly created database:

```sql
psql -d cyf_ecommerce -f cyf_ecommerce.sql
```

Open the file `cyf_ecommerce.sql` in VSCode and examine the SQL code. Take a piece of paper and draw the database with the different relationships between tables (as defined by the REFERENCES keyword in the CREATE TABLE commands). Identify the foreign keys and make sure you understand the full database schema.

## Task

Once you understand the database that you are going to work with, solve the following challenge by writing SQL queries using everything you learned about SQL:

1. Retrieve all the customers' names and addresses who live in the United States
2. Retrieve all the customers in ascending name sequence
3. Retrieve all the products whose name contains the word `socks`
4. Retrieve all the products which cost more than 100 showing product id, name, unit price and supplier id.
5. Retrieve the 5 most expensive products
6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`
7. Retrieve all the products sold by suppliers based in the United Kingdom. The result should only contain the columns `product_name` and `supplier_name`.
8. Retrieve all orders, including order items, from customer ID `1`. Include order id, reference, date and total cost (calculated as quantity * unit price).
9. Retrieve all orders, including order items, from customer named `Hope Crosby`
10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.
11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference`, `order_date`, `product_name`, `supplier_name` and `quantity`.
12. Retrieve the names of all customers who bought a product from a supplier based in China.
13. List all orders giving customer name, order reference, order date and order total amount (quantity * unit price) in descending order of total.

