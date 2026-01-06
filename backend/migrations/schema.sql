-- Enable UUID extension if needed, though we use SERIAL/INTEGER for IDs for simplicity as per common MVP patterns, 
-- but meant for robust systems, UUIDs are often better. 
-- However, User asked for a specific structure. I will use SERIAL for IDs as implied by "id" in simple lists, 
-- but I will stick to standard robust SQL practices.

DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS restaurants CASCADE;

-- 1. Restaurants Table
CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE, -- Login credential
    password VARCHAR(255) NOT NULL,     -- Hashed password
    primary_color VARCHAR(7) NOT NULL DEFAULT '#000000', -- Hex color
    logo_url TEXT,
    hero_image_url TEXT,
    whatsapp_number VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_restaurants_slug ON restaurants(slug);
CREATE INDEX idx_restaurants_email ON restaurants(email); -- Index for faster login lookups

-- 2. Categories Table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    restaurant_id INTEGER NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_categories_restaurant_id ON categories(restaurant_id);

-- 3. Products Table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    restaurant_id INTEGER NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE, -- Redundant but useful for fast lookups per restaurant
    category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_products_restaurant_id ON products(restaurant_id);
CREATE INDEX idx_products_category_id ON products(category_id);

-- SEED DATA

-- Restaurant 1: "Burger King Clone" (Pass: 123456)
INSERT INTO restaurants (name, slug, email, password, primary_color, logo_url, whatsapp_number)
VALUES ('Burger King Clone', 'burger-king-clone', 'bk@example.com', '$2b$10$gePspCCRgP3n07xOEQ9sO./RkyxWLP4QbBKKT4aawf3F3R0f9PUzFW', '#D62300', 'https://example.com/bk-logo.png', '+1234567890');

-- Categories for Restaurant 1
INSERT INTO categories (restaurant_id, name, sort_order) VALUES 
(1, 'Hamburguesas', 1),
(1, 'Bebidas', 2),
(1, 'Postres', 3);

-- Products for Restaurant 1
INSERT INTO products (restaurant_id, category_id, name, description, price, image_url, is_available) VALUES
(1, 1, 'Whopper', 'La clásica a la parrilla', 5.99, 'https://example.com/whopper.jpg', true),
(1, 1, 'Double Cheese', 'Doble carne, doble queso', 7.50, 'https://example.com/double.jpg', true),
(1, 2, 'Coca Cola', 'Refresco de cola', 1.99, NULL, true),
(1, 3, 'Sundae', 'Helado de vainilla', 2.50, NULL, true);


-- Restaurant 2: "Sushi Master" (Pass: 123456)
INSERT INTO restaurants (name, slug, email, password, primary_color, logo_url, whatsapp_number)
VALUES ('Sushi Master', 'sushi-master', 'sushi@example.com', '$2b$10$gePspCCRgP3n07xOEQ9sO./RkyxWLP4QbBKKT4aawf3F3R0f9PUzFW', '#000000', 'https://example.com/sushi-logo.png', '+0987654321');

-- Categories for Restaurant 2
INSERT INTO categories (restaurant_id, name, sort_order) VALUES 
(2, 'Rolls', 1),
(2, 'Nigiris', 2);

-- Products for Restaurant 2
INSERT INTO products (restaurant_id, category_id, name, description, price, image_url, is_available) VALUES
(2, 4, 'California Roll', 'Cangrejo, aguacate y pepino', 8.99, 'https://example.com/cali.jpg', true),
(2, 4, 'Spicy Tuna', 'Atún picante y pepino', 9.50, 'https://example.com/spicy.jpg', true),
(2, 5, 'Salmon Nigiri', 'Arroz cubierto de salmón fresco', 4.00, NULL, true);
