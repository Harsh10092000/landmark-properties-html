-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(45),
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create OTPs table
CREATE TABLE IF NOT EXISTS otps (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  otp VARCHAR(6) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Drop existing sessions table if exists
DROP TABLE IF EXISTS sessions;

-- Create sessions table for NextAuth
CREATE TABLE sessions (
  id VARCHAR(255) PRIMARY KEY,
  session_token VARCHAR(255) UNIQUE NOT NULL,
  user_id BIGINT NOT NULL,
  expires TIMESTAMP(6) NOT NULL,
  access_token VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
); 


show create table property_module;

CREATE TABLE `property_module` (
   `pro_id` int(11) NOT NULL AUTO_INCREMENT,
   `pro_user_type` varchar(45) DEFAULT NULL,
   `pro_ad_type` varchar(45) DEFAULT NULL,
   `pro_city` varchar(45) DEFAULT NULL,
   `pro_locality` varchar(45) DEFAULT NULL,
   `pro_plot_no` varchar(45) DEFAULT NULL,
   `pro_street` varchar(45) DEFAULT NULL,
   `pro_age` varchar(45) DEFAULT NULL,
   `pro_floor` int(11) DEFAULT NULL,
   `pro_bedroom` int(11) DEFAULT NULL,
   `pro_balcony` int(11) DEFAULT NULL,
   `pro_parking` int(11) DEFAULT NULL,
   `pro_facing` varchar(45) DEFAULT NULL,
   `pro_area_size` varchar(45) DEFAULT NULL,
   `pro_width` varchar(45) DEFAULT NULL,
   `pro_length` varchar(45) DEFAULT NULL,
   `pro_facing_road_width` varchar(45) DEFAULT NULL,
   `pro_open_sides` int(11) DEFAULT NULL,
   `pro_furnishing` varchar(45) DEFAULT NULL,
   `pro_ownership_type` varchar(45) DEFAULT NULL,
   `pro_approval` varchar(45) DEFAULT NULL,
   `pro_amt` varchar(45) DEFAULT NULL,
   `pro_rental_status` varchar(45) DEFAULT NULL,
   `pro_desc` varchar(3000) DEFAULT NULL,
   `pro_type` varchar(45) DEFAULT NULL,
   `pro_possession` varchar(45) DEFAULT NULL,
   `pro_washrooms` int(11) DEFAULT NULL,
   `pro_sub_cat` varchar(45) DEFAULT NULL,
   `pro_user_id` int(11) DEFAULT NULL,
   `pro_area_size_unit` varchar(45) DEFAULT NULL,
   `pro_facing_road_unit` varchar(45) DEFAULT NULL,
   `pro_amt_unit` varchar(45) DEFAULT NULL,
   `pro_pincode` varchar(45) DEFAULT NULL,
   `pro_negotiable` varchar(50) NOT NULL,
   `pro_state` varchar(50) NOT NULL,
   `pro_date` varchar(50) NOT NULL,
   `pro_sub_district` varchar(50) NOT NULL,
   `pro_views` varchar(45) DEFAULT NULL,
   `pro_contacted` varchar(45) DEFAULT NULL,
   `pro_listed` int(11) DEFAULT 1,
   `pro_creation_date` datetime DEFAULT current_timestamp(),
   `pro_url` varchar(450) DEFAULT NULL,
   `pro_sale_status` int(11) DEFAULT 0,
   `pro_auto_inactive` varchar(45) DEFAULT '30',
   `pro_other_rooms` varchar(2999) DEFAULT NULL,
   `pro_near_by_facilities` varchar(2999) DEFAULT NULL,
   `pro_corner` varchar(45) DEFAULT NULL,
   `pro_renew_date` varchar(999) DEFAULT NULL,
   PRIMARY KEY (`pro_id`),
   KEY `idx_pro_listed_id` (`pro_listed`,`pro_id`),
   FULLTEXT KEY `idx_pro_city` (`pro_city`),
   FULLTEXT KEY `idx_pro_state` (`pro_state`),
   FULLTEXT KEY `idx_pro_locality` (`pro_locality`),
   FULLTEXT KEY `idx_pro_city_locality` (`pro_city`,`pro_locality`),
   FULLTEXT KEY `idx_pro_search` (`pro_city`,`pro_locality`,`pro_state`)
 ) 

 CREATE TABLE `property_module_images` (
   `img_id` int(11) NOT NULL AUTO_INCREMENT,
   `img_link` varchar(500) DEFAULT NULL,
   `img_cnct_id` int(11) DEFAULT NULL,
   `img_user_id` int(11) DEFAULT NULL,
   PRIMARY KEY (`img_id`),
   KEY `idx_img_cnct_id` (`img_cnct_id`)
 )

-- Expiry fields for property_module
ALTER TABLE property_module
  ADD COLUMN IF NOT EXISTS expiry_date DATETIME NULL,
  ADD COLUMN IF NOT EXISTS pro_status ENUM('active','expired') DEFAULT 'active',
  ADD COLUMN IF NOT EXISTS reminder_sent TINYINT(1) DEFAULT 0;

-- Settings table for expiry configuration
CREATE TABLE IF NOT EXISTS app_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(191) UNIQUE NOT NULL,
  setting_value VARCHAR(191) NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;