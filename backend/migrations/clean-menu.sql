-- Script para limpiar los productos y categorías de ejemplo
-- Ejecutar en la base de datos para empezar con un menú vacío

-- Primero eliminamos los productos
DELETE FROM products WHERE restaurant_id = 1;

-- Luego las categorías
DELETE FROM categories WHERE restaurant_id = 1;

-- Verificar que quedó limpio
SELECT 'Categorías restantes:' as info, count(*) as total FROM categories WHERE restaurant_id = 1;
SELECT 'Productos restantes:' as info, count(*) as total FROM products WHERE restaurant_id = 1;
