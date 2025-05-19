# React Firebase Google Authentication Template

## Features

- 🔐 Secure Google Authentication with Firebase
- ⚛️ Modern React with Hooks and Context
- 🛣️ React Router v6 Integration
- 🔄 Loading States and Error Handling
- 🌐 Environment Variable Configuration
- 📦 Vite for Fast Development
- 🔒 Protected Routes Implementation
- 🎨 Clean and Modern UI
- 🚀 Easy Deployment

## Getting Started

### Prerequisites

- Node.js (v22 or higher)
- npm or yarn
- Firebase project

### Firebase and Google Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Google Authentication:
   - Go to Authentication > Sign-in method
   - Enable Google provider
   - Configure OAuth consent screen in Google Cloud Console
   - Add authorized domains
3. Copy your Firebase configuration:
   - Go to Project Settings > General
   - Scroll to "Your apps" section
   - Copy the firebaseConfig object

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sanjay10985/react-firebase-starter.git
   cd react-firebase-auth
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file based on `.env.example`:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── config/         # Firebase configuration
├── contexts/       # Auth Context provider
├── hooks/          # Custom hooks
└── pages/          # Application pages
```

## API Documentation

### Authentication Context

```jsx
// Using the Auth Context
import { useAuth } from "../contexts/auth";

function MyComponent() {
  const { user, signInWithGoogle, signOut, loading } = useAuth();
  // Access authentication state and methods
}
```

### Available Methods

- `signInWithGoogle()` - Initiate Google Sign-in
- `signOut()` - Sign out current user

### Route Configuration

Our routing system uses a `MapRoutes` utility that automatically wraps components with appropriate route guards:

```jsx
// Example route configuration array
const routes = [
   {
    path: '/login',
    element: <LoginPage />,
    public: true // Marks route as publicly accessible
  }
  {
    path: '/dashboard',
    element: <Dashboard />, // Marks route as private as we have not provided public: true
  },

];

// Usage in main router configuration

```

The `PrivateRoute` component:

- Shows loading indicator during auth check
- Redirects unauthenticated users to login
- Uses Auth context to verify authentication status

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Deployment

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [Vite](https://vitejs.dev/)
