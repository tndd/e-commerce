SELECT uv.user_id, uv.update_date, uv.name, uv.address, uv.zip_code, uv.phone_number, uv.email, uv.password from user_version uv
left join user_version uv2 
on (uv.user_id = uv2.user_id and uv.update_date  < uv2.update_date)
WHERE uv2.update_date is NULL ;