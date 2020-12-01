CREATE TABLE `product` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `registrated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `registrant_user_id` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_FK` (`registrant_user_id`),
  CONSTRAINT `product_FK` FOREIGN KEY (`registrant_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;