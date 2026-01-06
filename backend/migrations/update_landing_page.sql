-- Add landing page customization fields to restaurants table

ALTER TABLE restaurants
ADD COLUMN IF NOT EXISTS hero_title VARCHAR(255),
ADD COLUMN IF NOT EXISTS hero_subtitle VARCHAR(255),
ADD COLUMN IF NOT EXISTS content_section_image TEXT,
ADD COLUMN IF NOT EXISTS content_section_title VARCHAR(255),
ADD COLUMN IF NOT EXISTS content_section_body TEXT;

-- Update existing records with some default 'lorem ipsum' or placeholder data so they aren't null
UPDATE restaurants 
SET 
  hero_title = 'Experience an unique culinary experience',
  hero_subtitle = 'The best food in town, crafted with passion.',
  content_section_title = 'Crafted & cook with love and passion',
  content_section_body = 'Lorem ipsum dolor sit amet consectetur adipiscing elit ut drak.',
  content_section_image = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
WHERE hero_title IS NULL;
