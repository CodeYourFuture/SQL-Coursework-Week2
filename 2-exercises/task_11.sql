SELECT c.name, o.order_reference, o.order_date, p.product_name, s.supplier_name, oi.quantity FROM orders o
INNER JOIN order_items oi ON oi.order_id = o.id
INNER JOIN customers c ON c.id = o.customer_id
INNER JOIN products p ON p.id = oi.product_id
INNER JOIN suppliers s ON s.id = oi.supplier_id;