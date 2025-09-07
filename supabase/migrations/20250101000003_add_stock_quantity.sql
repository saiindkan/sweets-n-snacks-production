-- Add stock_quantity column to products table
-- This migration adds the stock_quantity field that's used in the frontend

-- Add stock_quantity column to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS stock_quantity INTEGER DEFAULT 0;

-- Add comment to the column
COMMENT ON COLUMN products.stock_quantity IS 'Current stock quantity available for this product';

-- Create index for better performance when filtering by stock
CREATE INDEX IF NOT EXISTS idx_products_stock_quantity ON products(stock_quantity);

-- Update existing products to have a default stock quantity if they don't have one
UPDATE products 
SET stock_quantity = 50 
WHERE stock_quantity IS NULL OR stock_quantity = 0;
