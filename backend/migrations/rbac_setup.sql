-- 1. Create USERS table (Identity)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    system_role VARCHAR(50) DEFAULT 'USER', -- 'SUPER_ADMIN', 'USER'
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Create USER_TENANTS table (Access Control)
CREATE TABLE IF NOT EXISTS user_tenants (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    restaurant_id INT REFERENCES restaurants(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'OWNER', -- 'OWNER', 'MANAGER', 'STAFF'
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (user_id, restaurant_id)
);

-- 3. Add Config to Restaurants
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS features_config JSONB DEFAULT '{}'::jsonb;

-- 4. DATA MIGRATION: Move existing Restaurant Accounts to Users
-- This inserts a user for every restaurant found, using their current email/password
INSERT INTO users (email, password_hash, full_name, system_role)
SELECT 
    email, 
    password, 
    name, 
    'USER'
FROM restaurants
WHERE email NOT IN (SELECT email FROM users);

-- 5. LINK MIGRATION: Connect the new users to their restaurants
INSERT INTO user_tenants (user_id, restaurant_id, role)
SELECT 
    u.id, 
    r.id, 
    'OWNER'
FROM restaurants r
JOIN users u ON u.email = r.email
ON CONFLICT DO NOTHING;

-- 6. Optional: Create a Super Admin if doesn't exist (Change credentials later)
INSERT INTO users (email, password_hash, full_name, system_role)
VALUES ('admin@saas.com', '$2b$10$X7...', 'Super Admin', 'SUPER_ADMIN')
ON CONFLICT (email) DO NOTHING;
