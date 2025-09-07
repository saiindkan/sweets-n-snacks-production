-- Update all product prices to $14.99
-- Migration: Update product prices to $14.99

UPDATE products
SET price = 14.99, updated_at = NOW()
WHERE price != 14.99;

-- Add comment to document the price change
COMMENT ON COLUMN products.price IS 'Product price - updated to $14.99 for all products';

-- Verify the update
SELECT COUNT(*) as updated_products FROM products WHERE price = 14.99;
