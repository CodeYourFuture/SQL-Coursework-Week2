SELECT p.product_name, pa.unit_price, s.supplier_name FROM product_availability pa
INNER JOIN products p ON p.id = pa.prod_id
INNER JOIN suppliers s ON s.id = pa.supp_id;