--Stretch Goal

SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name 
FROM products 
INNER JOIN product_availability 
ON products.id = product_availability.prod_id 
INNER JOIN suppliers 
ON suppliers.id = product_availability.supp_id; 
