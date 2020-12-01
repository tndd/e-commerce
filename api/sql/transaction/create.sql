CREATE TABLE `transaction` (
  `id` varchar(36) NOT NULL,
  `ordered_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `buyer_id` varchar(36) NOT NULL,
  `product_id` varchar(36) NOT NULL,
  `product_version` datetime NOT NULL,
  `quantity` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `transaction_FK` (`product_id`),
  KEY `transaction_FK_2` (`buyer_id`),
  CONSTRAINT `transaction_FK` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `transaction_FK_2` FOREIGN KEY (`buyer_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci