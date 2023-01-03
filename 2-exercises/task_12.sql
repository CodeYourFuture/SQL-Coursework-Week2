SELECT DISTINCT c.name AS customer_names FROM customers c
INNER JOIN orders o ON o.customer_id= c.id
INNER JOIN order_items oi ON oi.order_id = o.id
INNER JOIN suppliers s ON s.id = oi.supplier_id
WHERE s.country = 'China';