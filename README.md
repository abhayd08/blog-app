# Blog-App

A responsive blog platform with rich text editing, allowing users to create, and view posts. Built for a Vizmo frontend technical assessment, it focuses on clean, efficient development and uses localStorage for data persistence.

#

## Reasoning Behind Technical Choices

### Vite

- I chose Vite as the build tool for this project due to its fast development server and quick startup time. It's well-suited for modern web development workflows and provides efficient bundling and hot module replacement.

### React Quill

- React Quill is integrated as the rich text editor for the application. Its modern, feature-rich, and highly customizable nature allows users to easily create and format content with a variety of tools such as bold, italic, and image embedding.

### Tailwind CSS

- Tailwind CSS is chosen for its utility-first approach to styling. It allows for rapid development with a consistent and scalable design system. Tailwind’s extensive set of utility classes minimizes the need for custom CSS, which speeds up development and maintains a clean codebase. This ensures a cohesive design language throughout the application, enhancing the overall user experience and maintainability of the UI.

### UUID

- UUID (Universally Unique Identifier) is used for generating unique identifiers across the application. This ensures that each identifier is globally unique, preventing conflicts and collisions, which is crucial for data integrity and consistency.

### browser-image-compression

- browser-image-compression is employed to handle image compression directly in the browser. This reduces the size of images before they are uploaded to the server, leading to faster upload times and reduced server load. By compressing images on the client side, we improve the performance and responsiveness of the application.

#

## Technologies

#### Frontend: HTML, CSS, JavaScript, React.js, Tailwind CSS, UUID, React Quill, browser-image-compression

#

## Getting Started

#### Welcome to this web app with React + Vite starter template! This template offers a streamlined setup for developing React applications using Vite.

### Installation

#### 1. Clone the Repository:

```bash
  git clone https://github.com/abhayd08/blog-app.git
  cd Blog-App
```

#### 2. Install Dependencies:

```bash
  npm install
```

#### 3. Start Development Server:

```bash
  npm run dev
```

#### 4. Open in Browser

#

This project is based on React and utilizes Vite for fast development and bundling. Happy coding! 🚀

#### Deployed Link - https://blog-app-abhay.vercel.app/
