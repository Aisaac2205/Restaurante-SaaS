-- Add checkout configuration columns to restaurants table
ALTER TABLE restaurants
ADD COLUMN IF NOT EXISTS enable_pickup BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS enable_delivery BOOLEAN DEFAULT false;
