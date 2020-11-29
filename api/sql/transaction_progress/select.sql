select d_tid.update_date, d_tid.transaction_id, tp.status from 
(
  select max(update_date) as update_date, transaction_id from transaction_progress tp group by transaction_id
) as d_tid
join transaction_progress tp 
on d_tid.transaction_id = tp.transaction_id and d_tid.update_date = tp.update_date;