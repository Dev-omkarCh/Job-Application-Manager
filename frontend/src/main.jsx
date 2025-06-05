import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "@/index.css";

// Apply theme before mount
const theme = localStorage.getItem('theme') || 'light';
document.documentElement.classList.toggle('dark', theme === 'dark');

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
