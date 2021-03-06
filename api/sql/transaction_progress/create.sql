CREATE TABLE `transaction_progress` (
  `transaction_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(32) NOT NULL,
  `description` text,
  PRIMARY KEY (`transaction_id`,`update_date`),
  KEY `transaction_progress_FK` (`transaction_id`),
  KEY `transaction_progress_FK_1` (`status`),
  CONSTRAINT `transaction_progress_FK` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `transaction_progress_FK_1` FOREIGN KEY (`status`) REFERENCES `transaction_status` (`status`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci