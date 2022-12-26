SELECT o.*, oi.* FROM orders o
INNER JOIN order_items oi ON oi.order_id = o.id
INNER JOIN customers c ON c.id = o.customer_id
WHERE c.name = 'Hope Crosby';