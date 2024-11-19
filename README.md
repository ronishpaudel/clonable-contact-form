# Enhanced Dark Theme Contact Form

A modern, animated React contact form component with a sophisticated dark theme and advanced UI interactions. Built with TypeScript, Framer Motion, and Tailwind CSS.

https://cloneable-contact-form007.vercel.app/

## 🌟 Features

### Visual Design

### Technical Features

- Multiple contact fields with dynamic add/remove functionality
- Form validation with visual feedback
- Asynchronous form submission
- Animated transitions and micro-interactions
- Accessibility-focused design

### Interactive Elements

- Animated field focus states
- Smooth field addition and removal
- Loading states during submission
- Toast notifications for success/error states
- Hover effects and visual feedback

## 🚀 Installation

1. Install the required dependencies:

```bash
npm install framer-motion lucide-react
# or
yarn add framer-motion lucide-react
```

2. Make sure you have Tailwind CSS configured in your project. If not, install it:

```bash
npm install -D tailwindcss
# or
yarn add -D tailwindcss
```

3. Copy the component code into your project.

## 💻 Usage

```tsx
import ContactForm from "./components/ContactForm";

function App() {
  return (
    <div>
      <ContactForm />
    </div>
  );
}
```

## 🛠️ Props & Configuration

The component accepts the following props (all optional):

```typescript
interface ContactFormProps {
  onSubmit?: (data: FormField[]) => Promise<void>;
  initialFields?: number;
  maxFields?: number;
  className?: string;
}

interface FormField {
  name: string;
  email: string;
}
```

## 🎨 Customization

### Theming

The component uses Tailwind CSS classes for styling. To customize the appearance, you can modify the following key classes:

```tsx
// Background gradient
"bg-gradient-to-br from-gray-900 to-gray-800";

// Form background
"bg-gray-800";

// Input fields
"bg-gray-900 text-gray-100 border-gray-700";

// Buttons
"bg-purple-500 hover:bg-purple-600"; // Add button
"bg-pink-500 hover:bg-pink-600"; // Submit button
```

### Animations

Animation settings can be adjusted through Framer Motion properties:

```tsx
// Form entrance animation
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}

// Field animations
initial={{ opacity: 0, x: -20 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.3 }}
```

## 🔧 API Integration

By default, the form submits to a placeholder API endpoint. To integrate with your backend:

```typescript
const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch("YOUR_API_ENDPOINT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    // Handle response...
  } catch (error) {
    // Handle error...
  }
};
```

## ♿ Accessibility

The component follows accessibility best practices:

- Proper ARIA labels
- Keyboard navigation support
- Focus management
- High contrast color ratios
- Screen reader friendly notifications

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- [Framer Motion](https://www.framer.com/motion/) for animations
- [Lucide Icons](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for styling

## 🐛 Known Issues

- None currently reported

## 📞 Support

For support, please open an issue in the repository or contact the maintainers.

---

Made with ❤️ by [Your Name]
