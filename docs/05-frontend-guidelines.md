# Frontend Guidelines

---

## 1. Project Structure

- **Organize by Feature:**  
  - Group related components, hooks, and assets by feature (e.g., `/components/Planets`, `/components/Controls`).
- **Directory Suggestions:**
  - `/components` – React components (organized by feature)
  - `/scenes` – 3D scene setup and logic
  - `/hooks` – Custom React hooks
  - `/styles` – Tailwind config and global styles
  - `/assets` – Textures, models, images
  - `/context` – React context providers (if needed)
  - `/utils` – Utility functions

---

## 2. Coding Standards

- **Language:**  
  - Use TypeScript for type safety and better developer tooling.
- **Syntax:**  
  - Use ES6+ features (arrow functions, destructuring, etc.).
- **Formatting:**  
  - Enforce with Prettier (2 spaces, single quotes, trailing commas).
- **Linting:**  
  - Use ESLint with recommended React/TypeScript rules.
- **Naming:**  
  - Use PascalCase for components, camelCase for variables/functions.
- **Comments:**  
  - Write clear, concise comments for complex logic and 3D math.

---

## 3. React & State Management

- **Functional Components Only:**  
  - Use React functional components and hooks exclusively.
- **State:**  
  - Use local state with `useState` and `useReducer`.
  - Use React Context for global state (e.g., animation speed, selected planet).
- **Side Effects:**  
  - Use `useEffect` for side effects (e.g., event listeners, asset loading).
- **Performance:**  
  - Use `useMemo` and `useCallback` to optimize re-renders.
  - Use React Three Fiber’s `useFrame` for animation loops.

---

## 4. 3D Scene & Animation

- **React Three Fiber:**  
  - Structure scenes declaratively.
  - Use `Canvas` as the root for 3D content.
  - Separate 3D objects into reusable components (e.g., ``, ``).
- **Three.js:**  
  - Use Three.js utilities for geometry, materials, and textures.
  - Prefer GLTF/GLB for 3D models.
- **GSAP:**  
  - Use GSAP for smooth, timeline-based animations.
  - Keep animation logic in dedicated hooks or utility files.

---

## 5. Styling & UI

- **Tailwind CSS:**  
  - Use utility classes for layout, spacing, and responsiveness.
  - Avoid custom CSS unless necessary for 3D overlays or special effects.
- **Responsiveness:**  
  - Test layouts on mobile, tablet, and desktop.
  - Use Tailwind’s responsive utilities (`sm:`, `md:`, `lg:`).
- **UI Components:**  
  - Build accessible, reusable UI components (buttons, sliders, panels).
  - Use semantic HTML and ARIA attributes.

---

## 6. Accessibility

- **Keyboard Navigation:**  
  - Ensure all controls are focusable and operable via keyboard.
- **Screen Readers:**  
  - Add ARIA labels and roles to interactive elements.
  - Provide alt text for images and 3D objects where appropriate.
- **Color Contrast:**  
  - Ensure sufficient contrast for text and UI elements.

---

## 7. Asset Management

- **Textures/Models:**  
  - Optimize and compress all assets before use.
  - Store in `/assets` with clear naming conventions.
- **Image Delivery:**  
  - Use Next.js `` for UI images where possible.
- **3D Assets:**  
  - Use Draco or meshopt compression for GLTF/GLB files.

---

## 8. Testing & Quality

- **Manual Testing:**  
  - Test on Chrome, Firefox, Safari, and Edge.
  - Test on iOS and Android devices.
- **Automated Testing (Optional):**  
  - Use Jest and React Testing Library for unit/component tests.
- **Performance:**  
  - Monitor FPS and memory usage.
  - Use React Profiler and browser dev tools for optimization.

---

## 9. Version Control

- **Git:**  
  - Use feature branches and pull requests.
  - Write clear, descriptive commit messages.
  - Keep the `main` branch deployable at all times.

---

## 10. Documentation

- **README:**  
  - Keep project setup, usage, and deployment instructions up to date.
- **Component Docs:**  
  - Document props and usage for complex components.
