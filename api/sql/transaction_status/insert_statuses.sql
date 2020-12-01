INSERT INTO `e-commerce`.transaction_status (registrant_date, status) VALUES(CURRENT_TIMESTAMP, 'WAITING_SHIPPING');
INSERT INTO `e-commerce`.transaction_status (registrant_date, status) VALUES(CURRENT_TIMESTAMP, 'SHIPPED');
INSERT INTO `e-commerce`.transaction_status (registrant_date, status) VALUES(CURRENT_TIMESTAMP, 'WAITING_RECEIVING');
INSERT INTO `e-commerce`.transaction_status (registrant_date, status) VALUES(CURRENT_TIMESTAMP, 'RECEIVED');
INSERT INTO `e-commerce`.transaction_status (registrant_date, status) VALUES(CURRENT_TIMESTAMP, 'CANCEL');