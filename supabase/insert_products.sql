-- Insert Products Data
-- This file contains SQL commands to insert sample product data
-- All products are priced at $14.99

-- Insert Sweets
INSERT INTO products (id, name, description, price, image_url, category_id, stock_quantity, is_featured, is_available, created_at, updated_at) VALUES
('sweet-1', 'Dry Fruit Laddu', 'Dry fruit laddu is a traditional Indian sweet made with a mixture of dry fruits, sugar, and ghee. It is a popular festive treat and is often served during weddings and other special occasions.', 14.99, '/Product%20Images/DRYFRUIT%20LADOO.jpg', 'sweets', 50, true, true, NOW(), NOW()),
('sweet-2', 'Methi Laddu', 'Methi laddu is a traditional Indian sweet made with a mixture of methi seeds, sugar, and ghee. It is a popular festive treat and is often served during weddings and other special occasions.', 14.99, '/Product%20Images/METHI%20LADOO.jpg', 'sweets', 45, false, true, NOW(), NOW()),
('sweet-3', 'Dink Laddu', 'Dink laddu is a traditional Indian sweet made with a mixture of dink seeds, sugar, and ghee. It is a popular festive treat and is often served during weddings and other special occasions.', 14.99, '/Product%20Images/Dink%20Laddu.jpg', 'sweets', 60, false, true, NOW(), NOW()),
('sweet-4', 'Nachani Laddu', 'Nachani laddu is a traditional Indian sweet made with a mixture of nachani seeds, sugar, and ghee. It is a popular festive treat and is often served during weddings and other special occasions.', 14.99, '/Product%20Images/NACHANI%20LADOO.jpg', 'sweets', 55, false, true, NOW(), NOW()),
('sweet-5', 'Besan Laddu', 'Besan laddu is a traditional Indian sweet made with a mixture of besan flour, sugar, and ghee. It is a popular festive treat and is often served during weddings and other special occasions.', 14.99, '/Product%20Images/BESAN%20LADDU.jpg', 'sweets', 70, true, true, NOW(), NOW());

-- Insert Snacks
INSERT INTO products (id, name, description, price, image_url, category_id, stock_quantity, is_featured, is_available, created_at, updated_at) VALUES
('snack-1', 'Yellow Poha Chiwda', 'Yellow poha chiwda is a traditional Indian snack made with a mixture of yellow poha, sugar, and ghee. It is a popular festive treat and is often served during weddings and other special occasions.', 14.99, '/Product%20Images/Yellow%20Poha%20Chiwda.jpg', 'snacks', 70, false, true, NOW(), NOW()),
('snack-2', 'Sweet Shankarpale', 'Sweet shankarpale is a traditional Indian snack made with a mixture of sweet shankarpale, sugar, and ghee. It is a popular festive treat and is often served during weddings and other special occasions.', 14.99, '/Product%20Images/SHANKARAPALLE.jpg', 'snacks', 65, false, true, NOW(), NOW()),
('snack-3', 'Bhaajani Chakli', 'Bhaajani chakli is a traditional Indian snack made with a mixture of bhaajani chakli, sugar, and ghee. It is a popular festive treat and is often served during weddings and other special occasions.', 14.99, '/Product%20Images/CHAKLI.jpg', 'snacks', 80, false, true, NOW(), NOW()),
('snack-4', 'Teekha Sev', 'Teekha sev is a traditional Indian snack made with a mixture of teekha sev, sugar, and ghee. It is a popular festive treat and is often served during weddings and other special occasions.', 14.99, '/Product%20Images/TheekaSev.jpg', 'snacks', 55, true, true, NOW(), NOW()),
('snack-5', 'Khajur Laddu', 'Khajur laddu is a traditional Indian snack made with a mixture of khajur dates, sugar, and ghee. It is a popular festive treat and is often served during weddings and other special occasions.', 14.99, '/Product%20Images/KHAJUR%20LADDU.jpg', 'snacks', 40, false, true, NOW(), NOW());

-- Update sequence if needed
SELECT setval('products_id_seq', (SELECT MAX(id::int) FROM products WHERE id ~ '^[0-9]+$'));
