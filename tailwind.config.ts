
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// Design System Colors - HSL for better control
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',

				// Primary Color Palette - Professional Blue
				primary: {
					50: 'hsl(214, 100%, 97%)',
					100: 'hsl(214, 95%, 93%)',
					200: 'hsl(213, 97%, 87%)',
					300: 'hsl(212, 96%, 78%)',
					400: 'hsl(213, 94%, 68%)',
					500: 'hsl(217, 91%, 60%)', // Main primary
					600: 'hsl(221, 83%, 53%)',
					700: 'hsl(224, 76%, 48%)',
					800: 'hsl(226, 71%, 40%)',
					900: 'hsl(224, 64%, 33%)',
					950: 'hsl(226, 55%, 21%)',
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},

				// Secondary Color Palette - Complementary Purple
				secondary: {
					50: 'hsl(270, 100%, 98%)',
					100: 'hsl(269, 100%, 95%)',
					200: 'hsl(269, 100%, 92%)',
					300: 'hsl(269, 100%, 86%)',
					400: 'hsl(270, 95%, 75%)',
					500: 'hsl(270, 91%, 65%)', // Main secondary
					600: 'hsl(271, 81%, 56%)',
					700: 'hsl(272, 72%, 47%)',
					800: 'hsl(272, 67%, 39%)',
					900: 'hsl(273, 61%, 32%)',
					950: 'hsl(274, 87%, 21%)',
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},

				// Accent Color Palette - Sky Blue
				accent: {
					50: 'hsl(204, 100%, 97%)',
					100: 'hsl(204, 94%, 94%)',
					200: 'hsl(201, 94%, 86%)',
					300: 'hsl(199, 95%, 74%)',
					400: 'hsl(198, 93%, 60%)',
					500: 'hsl(199, 89%, 48%)', // Main accent
					600: 'hsl(200, 98%, 39%)',
					700: 'hsl(201, 96%, 32%)',
					800: 'hsl(201, 90%, 27%)',
					900: 'hsl(202, 80%, 24%)',
					950: 'hsl(202, 80%, 16%)',
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},

				// Neutral Gray Palette
				neutral: {
					50: 'hsl(210, 40%, 98%)',
					100: 'hsl(210, 40%, 96%)',
					200: 'hsl(214, 32%, 91%)',
					300: 'hsl(213, 27%, 84%)',
					400: 'hsl(215, 20%, 65%)',
					500: 'hsl(215, 16%, 47%)',
					600: 'hsl(215, 19%, 35%)',
					700: 'hsl(215, 25%, 27%)',
					800: 'hsl(217, 33%, 17%)',
					900: 'hsl(222, 84%, 5%)',
					950: 'hsl(229, 84%, 5%)',
				},

				// Semantic Colors
				success: {
					50: 'hsl(138, 76%, 97%)',
					500: 'hsl(142, 71%, 45%)',
					600: 'hsl(142, 76%, 36%)',
					DEFAULT: 'hsl(142, 71%, 45%)'
				},
				error: {
					50: 'hsl(0, 86%, 97%)',
					500: 'hsl(0, 84%, 60%)',
					600: 'hsl(0, 72%, 51%)',
					DEFAULT: 'hsl(0, 84%, 60%)'
				},
				warning: {
					50: 'hsl(48, 100%, 96%)',
					500: 'hsl(45, 93%, 47%)',
					600: 'hsl(43, 96%, 56%)',
					DEFAULT: 'hsl(45, 93%, 47%)'
				},

				// Component Colors
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},

			// Typography System
			fontFamily: {
				sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
				mono: ['SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace'],
			},

			fontSize: {
				'xs': ['0.75rem', { lineHeight: '1rem' }],
				'sm': ['0.875rem', { lineHeight: '1.25rem' }],
				'base': ['1rem', { lineHeight: '1.5rem' }],
				'lg': ['1.125rem', { lineHeight: '1.75rem' }],
				'xl': ['1.25rem', { lineHeight: '1.75rem' }],
				'2xl': ['1.5rem', { lineHeight: '2rem' }],
				'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
				'4xl': ['2.25rem', { lineHeight: '2.5rem' }],
				'5xl': ['3rem', { lineHeight: '1' }],
				'6xl': ['3.75rem', { lineHeight: '1' }],
				'7xl': ['4.5rem', { lineHeight: '1' }],
				'8xl': ['6rem', { lineHeight: '1' }],
				'9xl': ['8rem', { lineHeight: '1' }],
			},

			// Spacing System (8px grid)
			spacing: {
				'0.5': '0.125rem', // 2px
				'1': '0.25rem',    // 4px
				'1.5': '0.375rem', // 6px
				'2': '0.5rem',     // 8px
				'2.5': '0.625rem', // 10px
				'3': '0.75rem',    // 12px
				'3.5': '0.875rem', // 14px
				'4': '1rem',       // 16px
				'5': '1.25rem',    // 20px
				'6': '1.5rem',     // 24px
				'7': '1.75rem',    // 28px
				'8': '2rem',       // 32px
				'9': '2.25rem',    // 36px
				'10': '2.5rem',    // 40px
				'11': '2.75rem',   // 44px
				'12': '3rem',      // 48px
				'14': '3.5rem',    // 56px
				'16': '4rem',      // 64px
				'20': '5rem',      // 80px
				'24': '6rem',      // 96px
				'28': '7rem',      // 112px
				'32': '8rem',      // 128px
				'36': '9rem',      // 144px
				'40': '10rem',     // 160px
				'44': '11rem',     // 176px
				'48': '12rem',     // 192px
				'52': '13rem',     // 208px
				'56': '14rem',     // 224px
				'60': '15rem',     // 240px
				'64': '16rem',     // 256px
				'72': '18rem',     // 288px
				'80': '20rem',     // 320px
				'96': '24rem',     // 384px
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out forwards'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
