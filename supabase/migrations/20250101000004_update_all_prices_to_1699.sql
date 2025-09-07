-- Update All Product Prices to 16.99
-- This migration updates all product prices to $16.99

-- Update all products to have a price of 16.99
UPDATE products 
SET price = 16.99, 
    updated_at = NOW()
WHERE price != 16.99;

-- Add a comment to document this change
COMMENT ON COLUMN products.price IS 'Product price - updated to $16.99 for all products';
