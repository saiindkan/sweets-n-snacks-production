-- Fix Database Issues
-- This file contains SQL commands to fix common database issues

-- Fix any missing columns or constraints
ALTER TABLE IF EXISTS products ADD COLUMN IF NOT EXISTS stock_quantity INTEGER DEFAULT 0;
ALTER TABLE IF EXISTS products ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE IF EXISTS products ADD COLUMN IF NOT EXISTS is_available BOOLEAN DEFAULT true;

-- Update existing products with default values
UPDATE products SET stock_quantity = 50 WHERE stock_quantity IS NULL;
UPDATE products SET is_featured = false WHERE is_featured IS NULL;
UPDATE products SET is_available = true WHERE is_available IS NULL;

-- Fix any data type issues
ALTER TABLE IF EXISTS products ALTER COLUMN price TYPE DECIMAL(10,2);
ALTER TABLE IF EXISTS products ALTER COLUMN created_at TYPE TIMESTAMP WITH TIME ZONE;
ALTER TABLE IF EXISTS products ALTER COLUMN updated_at TYPE TIMESTAMP WITH TIME ZONE;
