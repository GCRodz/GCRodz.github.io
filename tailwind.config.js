/** @type {import('tailwindcss').Config} */
module.exports = {
  /** Tell Tailwind where to look for class names */
  content: ['./src/**/*.{ts,tsx,js,jsx}'],

  theme: {
    extend: {
      /* allow rotate‑Y helpers */
      rotate: { 'y-180': '180deg' },
    },
  },

  /* Plugins: daisyUI may already be required elsewhere.
     Add our 3‑D utilities alongside it. */
  plugins: [
    require('daisyui'),                // keep if you already use daisyUI
    function ({ addUtilities }) {
      addUtilities({
        '.rotate-y-180': { transform: 'rotateY(180deg)' },
        '[transform-style:preserve-3d]': { transformStyle: 'preserve-3d' },
        '[backface-visibility:hidden]': { backfaceVisibility: 'hidden' },
        '[perspective:1000px]': { perspective: '1000px' },
      });
    },
  ],
};
