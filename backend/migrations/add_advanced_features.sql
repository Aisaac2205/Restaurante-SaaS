-- Add Video, Services, and Socials configurations

ALTER TABLE restaurants
ADD COLUMN IF NOT EXISTS video_section_title VARCHAR(255),
ADD COLUMN IF NOT EXISTS video_section_subtitle VARCHAR(255),
ADD COLUMN IF NOT EXISTS video_poster_url TEXT,
ADD COLUMN IF NOT EXISTS video_url TEXT,
ADD COLUMN IF NOT EXISTS services_data JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS instagram_username VARCHAR(255),
ADD COLUMN IF NOT EXISTS instagram_images JSONB DEFAULT '[]';

-- Seeds de ejemplo para que no se vea vacío
UPDATE restaurants 
SET 
  video_section_title = 'Watch our restaurant video',
  video_section_subtitle = 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
  video_poster_url = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  video_url = 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
  
  services_data = '[
      {"title": "Catering", "description": "Lorem ipsum dolor sit amet.", "image_url": "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=400&q=80"},
      {"title": "Events", "description": "Consectetur adipiscing elit.", "image_url": "https://images.unsplash.com/photo-1519225421980-715cb0202128?auto=format&fit=crop&w=400&q=80"},
      {"title": "Birthdays", "description": "Sed do eiusmod tempor.", "image_url": "https://images.unsplash.com/photo-1530103862676-de3c9a59af57?auto=format&fit=crop&w=400&q=80"}
  ]',

  instagram_username = '@restaurantx',
  instagram_images = '[
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=300&q=80"
  ]'
WHERE video_section_title IS NULL;
