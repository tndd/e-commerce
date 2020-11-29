# Type Definition of Store
## Product
name | type | description
-- | -- | --
id | uuid
registranted_date | datetime
name | string
price | int
description | string
## Transaction
name | type | description
-- | -- | --
id | uuid
ordered_date | datetime
buyer_id | uuid
product_id | uuid

## Cart
```js
[
  // CartItem
  {
    product: Product,
    quantity: int
  },
  ...
]
```
## TransactionProgress
name | type | description
-- | -- | --
id | uuid | transaction_id
update_date | datetime |
status | enum('TODO','PACKED','SHIPPED','RECEIVED','CANCEL') |
