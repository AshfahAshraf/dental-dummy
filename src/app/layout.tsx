import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/index.css";
import React from "react";
import Script from "next/script";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://dentalcare.com"),
  title: {
    default: "Dr. Muhammed's Dental Care | Multi Speciality Clinic, Thalassery",
    template: "%s | Dr. Muhammed's Dental Care, Thalassery",
  },
  description: "Experience painless dental care, laser teeth whitening, root canals, dental implants, and smile makeovers at Dr. Muhammed's Dental Care in Thalassery. Book online today!",
  keywords: [
    "dental clinic thalassery",
    "dentist in thalassery",
    "dr muhammed dental care",
    "best dentist kannur",
    "cosmetic dentistry",
    "teeth whitening thalassery",
    "dental implants thalassery",
    "root canal treatment thalassery",
    "painless dental care",
    "book dentist appointment"
  ],
  authors: [{ name: "Dr. Muhammed" }],
  creator: "Dr. Muhammed's Dental Care",
  publisher: "Dr. Muhammed's Dental Care",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://drmuhammeddental.com",
    siteName: "Dr. Muhammed's Dental Care",
    title: "Dr. Muhammed's Dental Care | Multi Speciality Clinic, Thalassery",
    description: "Comprehensive, painless dental treatments, laser teeth whitening, root canals, and implants in Thalassery. Schedule your visit today!",
    images: [
      {
        url: "/images/hero_banner.jpg",
        width: 1200,
        height: 630,
        alt: "Dr. Muhammed's Dental Care Clinic Thalassery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Muhammed's Dental Care | Multi Speciality Clinic, Thalassery",
    description: "Comprehensive, painless dental treatments, teeth whitening, root canals, and implants in Thalassery.",
    images: ["/images/hero_banner.jpg"],
  },
  alternates: {
    canonical: "/",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "name": "Dr. Muhammed's Dental Care",
  "image": "https://drmuhammeddental.com/images/hero_banner.jpg",
  "@id": "https://drmuhammeddental.com/#dentist",
  "url": "https://drmuhammeddental.com",
  "telephone": "+919847012345",
  "email": "contact@drmuhammeddental.com",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Dr. Muhammed's Dental Care, Court Road",
    "addressLocality": "Thalassery",
    "addressRegion": "Kerala",
    "postalCode": "670101",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 11.7484,
    "longitude": 75.4891
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "08:00",
    "closes": "20:00"
  },
  "sameAs": [
    "https://instagram.com/your_username",
    "https://wa.me/917561825537"
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body>
        {children}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}



