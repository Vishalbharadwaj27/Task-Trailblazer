
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
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
	  border: "hsl(var(--border))",
	  input: "hsl(var(--input))",
	  ring: "hsl(var(--ring))",
	  background: "hsl(var(--background))",
	  foreground: "hsl(var(--foreground))",
	  primary: {
		DEFAULT: "hsl(var(--primary))",
		foreground: "hsl(var(--primary-foreground))",
	  },
	  secondary: {
		DEFAULT: "hsl(var(--secondary))",
		foreground: "hsl(var(--secondary-foreground))",
	  },
	  destructive: {
		DEFAULT: "hsl(var(--destructive))",
		foreground: "hsl(var(--destructive-foreground))",
	  },
	  muted: {
		DEFAULT: "hsl(var(--muted))",
		foreground: "hsl(var(--muted-foreground))",
	  },
	  accent: {
		DEFAULT: "hsl(var(--accent))",
		foreground: "hsl(var(--accent-foreground))",
	  },
	  popover: {
		DEFAULT: "hsl(var(--popover))",
		foreground: "hsl(var(--popover-foreground))",
	  },
	  card: {
		DEFAULT: "hsl(var(--card))",
		foreground: "hsl(var(--card-foreground))",
	  },
				beige: {
				  50: '#faf8f5',
				  100: '#f3f0e9',
				  200: '#e8e2d6',
				  300: '#d9cfbb',
				  400: '#c7b89a',
				  500: '#b8a17c',
				  600: '#a78c65',
				  700: '#8c7354',
				  800: '#735e48',
				  900: '#5f4e3d',
				  950: '#33281e',
				},
				cream: {
				  50: '#fdfcf8',
				  100: '#fbf9f0',
				  200: '#f7f2e0',
				  300: '#f0e8c9',
				  400: '#e6d9a9',
				  500: '#d9c788',
				  600: '#c0ab66',
				  700: '#a18c51',
				  800: '#837344',
				  900: '#6b5e3b',
				  950: '#3a321f',
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
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [tailwindcssAnimate]
};

export default config;
