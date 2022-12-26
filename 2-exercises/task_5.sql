SELECT p.id AS product_id, p.product_name, s.id AS supplier_id, pa.unit_price FROM product_availability pa
INNER JOIN products p ON p.id = pa.prod_id
INNER JOIN suppliers s ON s.id = pa.supp_id
ORDER BY unit_price DESC
LIMIT 5;