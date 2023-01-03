SELECT c.name as customer_names, o.order_reference, o.order_date, (oi.quantity * pa.unit_price) as total_amount FROM orders o
INNER JOIN customers c ON c.id = o.customer_id
INNER JOIN order_items oi ON oi.order_id = o.id
INNER JOIN product_availability pa ON pa.prod_id = oi.product_id
ORDER BY total_amount DESC;