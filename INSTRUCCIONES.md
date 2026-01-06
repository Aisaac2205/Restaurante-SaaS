# 👑 Guía de Super Administrador SaaS

Este documento explica cómo utilizar las nuevas funcionalidades de gestión multi-tenant de tu plataforma.

## 1. Acceso Inicial (Login)

Para acceder al panel de control total, debes iniciar sesión con la cuenta maestra creada en la base de datos.

*   **URL:** `/auth/login` (en `localhost:5173`)
*   **Email:** `admin@saas.com`
*   **Contraseña:** `admin123`
    *   *(Nota: Si no has corrido el script, ejecuta `npx ts-node src/scripts/create-superuser.ts` en el backend)*.

---

## 2. Gestión de Tenants (Restaurantes)

Una vez logueado, verás el menú lateral expandido.

### 🏢 Crear un Nuevo Restaurante
1.  Navega a **SaaS Configuration** en el menú lateral y haz clic en el botón **"Nuevo Tenant"** (o ve directo a `/super-admin/restaurants/new`).
2.  Llena los datos esenciales:
    *   **Nombre Comercial:** El nombre público del restaurante (ej: "Pizza Luigi").
    *   **Slug:** La URL única (ej: `pizza-luigi`). *Esto es crucial para que funcione la tienda pública.*
    *   **Email del Dueño:** El correo del cliente que gestionará este restaurante.
    *   **Contraseña:** Una temporal para dársela al cliente.
3.  Haz clic en **Crear Restaurante**.

### ⚙️ Configuración de Features (Feature Flags)
1.  Ve a **SaaS Configuration** (`/saas-config`).
2.  En la parte superior, usa el **Selector de Restaurante** para elegir qué cliente quieres editar. (Por defecto carga el primero).
3.  **Feature Flags (Módulos):**
    *   Activa/Desactiva casillas como **"Modulo de Video"** o **"Sección Servicios"**.
    *   Estos cambios *se guardan al instante* en la base de datos al dar clic en "Guardar Cambios".
4.  **Branding:**
    *   También puedes subir el Logo, cambiar Colores Primarios, e Imágenes de Portada para ese cliente específico desde aquí.

---

## 3. Vista del Cliente (Frontend Público)

Para ver cómo queda la tienda final de tu cliente:

1.  Asegúrate de tener el proyecto `frontend-client` corriendo (`pnpm dev`).
2.  Navega a la URL con el slug del restaurante:
    *   `http://localhost:4321/[SLUG]`
    *   Ejemplo: `http://localhost:4321/pizza-luigi`
3.  Verifica los cambios:
    *   Si activaste "Video", deberías ver la sección de video promocional.
    *   Si cambiaste el color primario, los botones y headers deberían usar ese color.

---

## 4. Entregar al Cliente

Simplemente dale al dueño del restaurante sus credenciales:
*   **Login URL:** La misma del admin (`localhost:5173/auth/login`).
*   **Su Email:** El que registraste.
*   **Su Pass:** La temporal.

Cuando él entre, **SOLO verá su propio restaurante** y su menú. NO verá el panel de "SaaS Configuration" ni podrá editar a otros.
