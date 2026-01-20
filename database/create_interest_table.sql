-- Create table for storing property interest data
CREATE TABLE IF NOT EXISTS property_interest (
    id INT AUTO_INCREMENT PRIMARY KEY,
    property_id VARCHAR(50) NOT NULL,
    property_owner_id VARCHAR(50) NOT NULL,
    interested_user_name VARCHAR(100) NOT NULL,
    interested_user_email VARCHAR(100) NOT NULL,
    interested_user_phone VARCHAR(20) NOT NULL,
    interested_user_message TEXT,
    interest_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Indexes for better performance
    INDEX idx_property_id (property_id),
    INDEX idx_property_owner_id (property_owner_id),
    INDEX idx_interest_date (interest_date)
);

-- Add indexes for better query performance
CREATE INDEX idx_property_interest_composite ON property_interest(property_id, interest_date);
CREATE INDEX idx_property_interest_owner ON property_interest(property_owner_id);
