SELECT o.id, o.order_reference, o.order_date, (oi.quantity * pa.unit_price) as total_cost FROM orders o
INNER JOIN order_items oi ON oi.order_id = o.id
INNER JOIN product_availability pa ON pa.prod_id = oi.product_id
WHERE o.customer_id = 1;