# Camanolo Homestay

A polished landing site for Camanolo Homestay in Siargao, Philippines. Built with Next.js, React, Tailwind CSS, Framer Motion, Motion Primitives, and shadcn-style components.

## Features

- Responsive one-page homestay website
- Animated hero section with full-screen loading reveal
- Section-aware navigation with mobile dropdown
- Scroll progress indicator
- Masonry-style image gallery with animated image reveals
- Morphing image preview interaction
- Google Maps embed for the property location
- Booking.com reservation call-to-action
- Minimal monochrome UI tailored to the Camanolo brand

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion / Motion
- Motion Primitives
- Radix UI / shadcn-style components
- Lucide React icons

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure

```text
app/                          Next.js app router files
components/layout/            Header, navbar, footer, loader, progress UI
components/sections/          Page sections such as Hero, Story, Spaces, Stay
components/shadix-ui/         Gallery and morph image components
components/motion-primitives/ Motion Primitives components
components/ui/                Shared UI primitives
hooks/                        Reusable React hooks
lib/                          Shared constants and utilities
public/                       Static images and assets
```

## Notes

The site uses `app/loading.tsx` for route-level loading fallback and `components/layout/PageLoader.tsx` for the first-visit full-page reveal animation.
