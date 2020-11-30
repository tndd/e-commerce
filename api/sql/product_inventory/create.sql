CREATE TABLE `product_inventory` (
  `no` int unsigned NOT NULL AUTO_INCREMENT,
  `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `product_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'product original id',
  `inventory` int unsigned DEFAULT NULL,
  PRIMARY KEY (`no`),
  KEY `product_inventory_FK` (`product_id`),
  CONSTRAINT `product_inventory_FK` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci