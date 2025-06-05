/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			light : {

			},
			dark :{
				primary : '#111827',
				secondary : '#1f2937',
				accent : '#3b82f6'
			}
  		}
  	}
  },
  plugins: [require("daisyui")],
  
}

