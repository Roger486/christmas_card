# 🎄 Christmas Card

Una **postal navideña interactiva** hecha en **HTML, CSS y JavaScript puro**, sin dependencias ni backend.

Permite crear una tarjeta personalizada (título, subtítulo, mensaje y firma) y **compartirla mediante una URL** con parámetros.  
Cuando la postal tiene contenido, el editor desaparece y queda solo la tarjeta final.

---

## ✨ Características

- 🎨 Diseño tipo tarjeta con efecto glassmorphism
- ❄️ Animación de nieve en canvas
- ✍️ Editor para:
  - Título
  - Subtítulo
  - Mensaje
  - Para / De
- 🔗 Compartir mediante URL con parámetros (`?title=...&msg=...`)
- 👀 Modo solo lectura automático cuando hay contenido
- ⚡ 100% frontend (HTML + CSS + JS)
- 🚫 Sin frameworks, sin build, sin backend

---

## 🧑‍💻 Uso

### Crear una postal
1. Abre la página sin parámetros
2. Rellena el formulario
3. Pulsa **Actualizar**
4. El editor desaparece y queda la postal final

### Compartir
Usa el botón **Copiar enlace** o comparte la URL directamente.

Ejemplo:

```
https://tudominio.com/?title=Feliz%20Navidad&msg=Que%20tengas%20unas%20fiestas%20geniales
```

Al abrir ese enlace, la postal se mostrará directamente en modo final.

---

## 🚀 Publicación

Este proyecto está pensado para hosting estático:
- GitHub Pages
- Netlify
- Vercel
- Cualquier servidor estático

---

## 📁 Estructura del proyecto

```
/
├─ index.html
├─ styles.css
├─ app.js
└─ README.md
```

---

## 📜 Licencia

Este proyecto está bajo la licencia **MIT**.  
Puedes usarlo, modificarlo y adaptarlo libremente.

---

## 🎁 Notas

Proyecto personal y experimental, creado como postal navideña compartible.  
Ideal para aprender o reutilizar como base para tarjetas digitales.