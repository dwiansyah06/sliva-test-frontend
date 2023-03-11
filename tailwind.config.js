/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'mobile' : {'min': '10px', 'max': '767px'},
      'small-mobile' : {'min': '10px', 'max': '400px'},
      'medium-mobile' : {'min': '401px', 'max': '767px'},
      'tablet' : {'min': '768px', 'max': '1000px'},
      'landscape-phone' : {'min': '1001px', 'max': '1180px'},
      'laptop' : {'min': '1280px', 'max': '1400px'},
      'landscape-mobile': { 'raw': '(max-height: 540px)' },
    }
  },
  plugins: [],
}