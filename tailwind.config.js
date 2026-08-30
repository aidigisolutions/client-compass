/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
      './pages/**/*.{js,jsx}',
      './components/**/*.{js,jsx}',
      './app/**/*.{js,jsx}',
      './src/**/*.{js,jsx}',
    ],
    prefix: "",
    theme: {
      container: {
        center: true,
        padding: '1.5rem',
        screens: {
          '2xl': '1400px'
        }
      },
      extend: {
        fontFamily: {
          sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
          display: ['var(--font-poppins)', 'var(--font-inter)', 'sans-serif'],
        },
        colors: {
          brand: {
            DEFAULT: '#A9822A',
            50: '#FAF6EA',
            100: '#F2E7C6',
            200: '#E6D091',
            300: '#D6B85C',
            400: '#C6A23A',
            500: '#A9822A',
            600: '#8C6B22',
            700: '#6E541B',
            800: '#513E14',
            900: '#33270C',
          },
          gold: {
            DEFAULT: '#C6A23A',
            light: '#E6D091',
            dark: '#8C6B22',
          },
          ink: {
            DEFAULT: '#141518',
            light: '#3A3D45',
            soft: '#6B7280',
          },
          surface: '#F8FAFC',
          border: 'hsl(var(--border))',
          input: 'hsl(var(--input))',
          ring: 'hsl(var(--ring))',
          background: 'hsl(var(--background))',
          foreground: 'hsl(var(--foreground))',
          primary: {
            DEFAULT: 'hsl(var(--primary))',
            foreground: 'hsl(var(--primary-foreground))'
          },
          secondary: {
            DEFAULT: 'hsl(var(--secondary))',
            foreground: 'hsl(var(--secondary-foreground))'
          },
          destructive: {
            DEFAULT: 'hsl(var(--destructive))',
            foreground: 'hsl(var(--destructive-foreground))'
          },
          muted: {
            DEFAULT: 'hsl(var(--muted))',
            foreground: 'hsl(var(--muted-foreground))'
          },
          accent: {
            DEFAULT: 'hsl(var(--accent))',
            foreground: 'hsl(var(--accent-foreground))'
          },
          popover: {
            DEFAULT: 'hsl(var(--popover))',
            foreground: 'hsl(var(--popover-foreground))'
          },
          card: {
            DEFAULT: 'hsl(var(--card))',
            foreground: 'hsl(var(--card-foreground))'
          },
        },
        borderRadius: {
          lg: 'var(--radius)',
          md: 'calc(var(--radius) - 2px)',
          sm: 'calc(var(--radius) - 4px)',
          '2xl': '1rem',
          '3xl': '1.5rem',
        },
        boxShadow: {
          'premium': '0 20px 45px -20px rgba(15, 23, 42, 0.25)',
          'card': '0 10px 30px -12px rgba(15, 23, 42, 0.18)',
          'glow': '0 15px 40px -12px rgba(169, 130, 42, 0.55)',
        },
        keyframes: {
          'accordion-down': {
            from: { height: '0' },
            to: { height: 'var(--radix-accordion-content-height)' }
          },
          'accordion-up': {
            from: { height: 'var(--radix-accordion-content-height)' },
            to: { height: '0' }
          },
          'float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-12px)' },
          }
        },
        animation: {
          'accordion-down': 'accordion-down 0.2s ease-out',
          'accordion-up': 'accordion-up 0.2s ease-out',
          'float': 'float 6s ease-in-out infinite',
        }
      }
    },
    plugins: [require("tailwindcss-animate")],
  }
