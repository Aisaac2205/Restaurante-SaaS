-- Actualizar contraseñas de usuarios a '123456' con un hash válido generado recientemente por el backend
-- Hash tomado de los logs: $2b$10$qc9vnB5CRvWfnenlmczNA.tonCKJLEyn6wNEvElVUcs612Th0Fg6K

UPDATE restaurants 
SET password = '$2b$10$qc9vnB5CRvWfnenlmczNA.tonCKJLEyn6wNEvElVUcs612Th0Fg6K'
WHERE email IN ('bk@example.com', 'sushi@example.com');

SELECT email, password FROM restaurants WHERE email IN ('bk@example.com', 'sushi@example.com');
