#!/bin/bash

# -------------------------------
# Setup Script: Install Latest Dependencies
# For a Next.js Full-Stack Project
# -------------------------------

echo "📦 Installing latest runtime dependencies..."

npm install \
@emotion/is-prop-valid \
@hookform/resolvers \
@playwright/test \
@prisma/client \
@radix-ui/react-accordion \
@radix-ui/react-alert-dialog \
@radix-ui/react-aspect-ratio \
@radix-ui/react-avatar \
@radix-ui/react-checkbox \
@radix-ui/react-collapsible \
@radix-ui/react-context-menu \
@radix-ui/react-dialog \
@radix-ui/react-dropdown-menu \
@radix-ui/react-hover-card \
@radix-ui/react-label \
@radix-ui/react-menubar \
@radix-ui/react-navigation-menu \
@radix-ui/react-popover \
@radix-ui/react-progress \
@radix-ui/react-radio-group \
@radix-ui/react-scroll-area \
@radix-ui/react-select \
@radix-ui/react-separator \
@radix-ui/react-slider \
@radix-ui/react-slot \
@radix-ui/react-switch \
@radix-ui/react-tabs \
@radix-ui/react-toast \
@radix-ui/react-toggle \
@radix-ui/react-toggle-group \
@radix-ui/react-tooltip \
@reduxjs/toolkit \
@sentry/nextjs \
@sentry/react \
@sentry/tracing \
@testing-library/dom \
@vercel/analytics \
autoprefixer \
bcryptjs \
class-variance-authority \
clsx \
cmdk \
date-fns \
embla-carousel-react \
framer-motion \
fs \
input-otp \
jsonwebtoken \
lucide-react \
next \
next-themes \
nodemailer \
path \
prisma \
react \
react-day-picker \
react-dom \
react-hook-form \
react-redux \
react-resizable-panels \
recharts \
redux \
sonner \
tailwind-merge \
tailwindcss-animate \
vaul \
webpack \
zod

echo "📦 Installing latest devDependencies..."

npm install -D \
@storybook/addon-essentials \
@storybook/addon-interactions \
@storybook/addon-onboarding \
@storybook/nextjs \
@storybook/react \
@tailwindcss/postcss \
@testing-library/jest-dom \
@testing-library/react \
@types/jest \
@types/node \
@types/react \
@types/react-dom \
eslint \
eslint-config-next \
jest \
jest-environment-jsdom \
playwright \
postcss \
tailwindcss \
ts-jest \
tw-animate-css \
typescript

echo "🎉 All dependencies installed successfully!"
