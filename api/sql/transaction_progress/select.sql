select d_id.update_date, d_id.id, tp.status from 
(
  select max(update_date) as update_date, id
  from transaction_progress tp group by id
) as d_id
join transaction_progress tp 
on d_id.id = tp.id and d_id.update_date = tp.update_date;