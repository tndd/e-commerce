CREATE TABLE `product_inventory` (
  `product_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'product original id',
  `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `inventory` int unsigned DEFAULT NULL COMMENT 'null means disabled product.',
  PRIMARY KEY (`product_id`,`update_date`),
  CONSTRAINT `product_inventory_FK` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;