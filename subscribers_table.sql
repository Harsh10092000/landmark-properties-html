-- Create subscribers table for email notifications
CREATE TABLE IF NOT EXISTS `subscribers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL UNIQUE,
  `name` varchar(255) DEFAULT NULL,
  `is_unsubscribed` tinyint(1) DEFAULT 0,
  `unsubscribe_token` varchar(255) DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  INDEX `idx_unsubscribed` (`is_unsubscribed`)
);

-- Add isSubscribed column to users table (alternative approach)
-- ALTER TABLE `users` ADD COLUMN `isSubscribed` tinyint(1) DEFAULT 0;

-- Insert some sample subscribers (optional)
-- INSERT INTO `subscribers` (`email`, `name`) VALUES 
-- ('subscriber1@example.com', 'John Doe'),
-- ('subscriber2@example.com', 'Jane Smith');

-- Create unsubscribe tokens for existing subscribers
-- UPDATE `subscribers` SET `unsubscribe_token` = MD5(CONCAT(email, NOW())) WHERE `unsubscribe_token` IS NULL;
