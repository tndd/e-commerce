SELECT piv.product_id, piv.update_date, piv.inventory 
FROM product_inventory piv
left join product_inventory piv2
on (piv.product_id = piv2.product_id AND piv.update_date < piv2.update_date)
WHERE piv2.update_date is NULL ;