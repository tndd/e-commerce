select pv.product_id, pv.update_date, pv.name, pv.price, pv.description
from product_version pv
left join product_version pv2
on (pv.product_id = pv2.product_id and pv.update_date < pv2.update_date)
where pv2.product_id is NULL ;