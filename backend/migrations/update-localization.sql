-- Actualizar textos de Burger King
UPDATE restaurants 
SET 
  video_section_title = 'Nuestra Historia',
  video_section_subtitle = 'Un vistazo a nuestra cocina y pasión.',
  content_section_title = 'Vive una experiencia culinaria única',
  content_section_body = 'Disfruta de nuestros deliciosos platillos preparados con los mejores ingredientes y una pasión inigualable por la calidad.',
  hero_title = 'Sabor a la parrilla',
  hero_subtitle = 'La mejor calidad en cada mordida'
WHERE slug = 'burger-king-clone';

-- Actualizar textos de Sushi Master
UPDATE restaurants 
SET 
  video_section_title = 'Nuestra Historia',
  video_section_subtitle = 'Arte y tradición en cada rollo.',
  content_section_title = 'Una experiencia japonesa auténtica',
  content_section_body = 'Ingredientes frescos, cortes precisos y sabores que te transportarán directamente a Japón.',
  hero_title = 'Sushi Master',
  hero_subtitle = 'El verdadero sabor del sushi'
WHERE slug = 'sushi-master';
