// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


// src/main.jsx (for Vite) or src/index.js (for Create React App)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Your existing global CSS
import { ChakraProvider, extendTheme } from '@chakra-ui/react'; // Import ChakraProvider

// Define your custom theme for "green mode"
const colors = {
  brand: { // You can use any name, 'brand' is common
    50: "#e6ffe6",
    100: "#b3ffb3",
    200: "#80ff80",
    300: "#4dff4d",
    400: "#1aff1a",
    500: "#00e600", // Your primary green
    600: "#00b300",
    700: "#008000",
    800: "#004d00",
    900: "#001a00",
  },
};

const theme = extendTheme({ colors });

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ChakraProvider theme={theme}> {/* Wrap your App with ChakraProvider and pass the custom theme */}
        <App />
      </ChakraProvider>
    </React.StrictMode>,
  );
} else {
  throw new Error("Root element with id 'root' not found");
}