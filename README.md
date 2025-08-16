# Frontend Mentor - E-commerce Product Page Solution

This is a solution to the [E-commerce product page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ecommerce-product-page-UPsZ9MJp6). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Getting Started](#getting-started)
- [Features](#features)
- [Author](#author)


### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Open a lightbox gallery by clicking on the large product image
- Switch the large product image by clicking on the small thumbnail images
- Add items to the cart
- View the cart and remove items from it

### Screenshot

![E-commerce Product Page Screenshot](/public/screenshot.png)


### Links

- Solution URL: [Add solution URL here](https://github.com/Rahdeg/alt-commmerce)
- Live Site URL: [Add live site URL here](https://alt-commmerce.vercel.app/)



### Built with

- **React 19** - Latest React version with improved performance
- **Next.js 15** - React framework with App Router
- **TypeScript** - For type safety and better development experience
- **Tailwind CSS 4** - Utility-first CSS framework for styling
- **Shadcn** - Accessible, unstyled UI components
- **Lucide React** - Beautiful & consistent icon set
- **Class Variance Authority (CVA)** - For creating type-safe component variants
- **Local Storage** - For persistent cart functionality
- **Responsive Design** - Mobile-first approach with desktop enhancements

### What I learned

This project helped me deepen my understanding of several key concepts:

**State Management with React Hooks**: Managing complex cart state across multiple components using useState and useEffect, along with localStorage for persistence.

```tsx
const [cartItems, setCartItems] = useState<CartItem[]>([]);
const [cartCount, setCartCount] = useState<number>(0);

useEffect(() => {
  const updateCart = () => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const cart: CartItem[] = JSON.parse(storedCart);
      setCartItems(cart);
      setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
    }
  };
  
  window.addEventListener('cartUpdated', updateCart);
  return () => window.removeEventListener('cartUpdated', updateCart);
}, []);
```

**Advanced Image Gallery with Modal**: Creating an interactive image gallery with thumbnail navigation, keyboard controls, and a lightbox modal.

**Component Communication**: Using custom events to communicate between components for cart updates, ensuring data consistency across the application.

**Responsive Design with Tailwind**: Implementing mobile-first design with progressive enhancement for desktop, including different UI patterns for mobile vs desktop (mobile menu overlay vs desktop navigation).

### Continued development

Areas I want to continue focusing on in future projects:

- **Performance Optimization**: Implementing image optimization techniques, lazy loading, and code splitting for better performance
- **Accessibility**: Adding comprehensive ARIA labels, keyboard navigation, and screen reader support
- **Testing**: Writing unit tests and integration tests for components using Jest and React Testing Library
- **Animation**: Adding subtle animations and transitions using Framer Motion or CSS animations
- **State Management**: Exploring more complex state management solutions like Zustand or Redux Toolkit for larger applications
- **PWA Features**: Adding service workers for offline functionality and push notifications

### Useful resources

- [Next.js 15 Documentation](https://nextjs.org/docs) - Comprehensive guide for the latest Next.js features and App Router
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Essential for understanding utility classes and responsive design patterns
- [Chadcn UI Primitives](https://ui.shadcn.com/) - Excellent resource for building accessible components
- [TypeScript Handbook](https://www.typescriptlang.org/docs) - Helped with type definitions and best practices
- [Lucide React Icons](https://lucide.dev) - Beautiful icon library with consistent design
- [MDN Web Docs - Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) - Understanding browser storage for cart persistence

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: latest LTS)
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd ecomerce
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build for Production

```bash
npm run build
npm run start
```

## Features

### ✅ Completed Features

- **Responsive Design**: Optimal layouts for mobile, tablet, and desktop devices
- **Interactive Image Gallery**: 
  - Click to view full-size images in a modal
  - Thumbnail navigation
  - Keyboard controls (arrow keys, escape)
  - Touch/swipe support on mobile
- **Shopping Cart Functionality**:
  - Add items with quantity selection
  - View cart contents with item details
  - Update quantities or remove items
  - Persistent cart using localStorage
  - Real-time cart count badge
- **Mobile-First Navigation**:
  - Hamburger menu with slide-out navigation
  - Desktop horizontal navigation with active states
  - User avatar display
- **Interactive Elements**:
  - Hover states for all clickable elements
  - Active states for navigation and buttons
  - Smooth transitions and animations
- **Accessibility Features**:
  - Semantic HTML structure
  - ARIA labels for screen readers
  - Keyboard navigation support
  - Focus management

### 🚀 Technical Implementation

- **Component Architecture**: Modular, reusable React components
- **State Management**: React hooks with localStorage persistence
- **Type Safety**: Full TypeScript implementation
- **Styling**: Utility-first approach with Tailwind CSS
- **Performance**: Next.js optimization with image optimization
- **Cross-browser Compatibility**: Modern browser support

## Author

- Website - [Raheem](https://raheem-dev.vercel.app/)
- GitHub - [@Rahdeg](https://github.com/Rahdeg)
- LinkedIn - [Raheem Adegbite](https://www.linkedin.com/in/raheemadegbite/)

---

*Built with ❤️ using Next.js, TypeScript, and Tailwind CSS*
