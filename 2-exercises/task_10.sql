SELECT p.product_name, pa.unit_price, oi.quantity FROM orders o
INNER JOIN order_items oi ON oi.order_id = o.id
INNER JOIN products p ON p.id = oi.product_id
INNER JOIN product_availability pa ON pa.prod_id =  oi.product_id
WHERE order_reference = 'ORD006';