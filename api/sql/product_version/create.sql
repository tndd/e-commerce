CREATE TABLE `product_version` (
  `no` int unsigned NOT NULL AUTO_INCREMENT,
  `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'this represents a version of product.',
  `product_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `price` int unsigned NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`no`),
  KEY `product_version_FK` (`product_id`),
  CONSTRAINT `product_version_FK` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci