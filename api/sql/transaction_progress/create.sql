CREATE TABLE `transaction_progress` (
  `no` int unsigned NOT NULL AUTO_INCREMENT,
  `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `transaction_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` enum('WAITING_SHIPPING','SHIPPED','WAITING_RECEIVING','RECEIVED','CANCEL') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'WAITING_SHIPPING',
  `description` text,
  PRIMARY KEY (`no`),
  KEY `transaction_progress_FK` (`transaction_id`),
  CONSTRAINT `transaction_progress_FK` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci