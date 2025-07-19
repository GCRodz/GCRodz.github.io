/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  safelist: [
    'h-36',
    'h-40',
    'h-44',
  ],
  theme: {
    extend: {
      rotate: { 'y-180': '180deg' }, // enable rotate‑Y utility
    },
  },
  plugins: [
    require('daisyui'),               // keep if you already use daisyUI
    function ({ addUtilities }) {
      addUtilities({
        '.rotate-y-180': { transform: 'rotateY(180deg)' },
        '[transform-style:preserve-3d]': { transformStyle: 'preserve-3d' },
        '[backface-visibility:hidden]': { backfaceVisibility: 'hidden' },
        '[perspective:1000px]': { perspective: '1000px' },
         '.hover\\:z-20:hover': { zIndex: 20 },
      });
    },
  ],
};
