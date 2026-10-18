import AboutUs from "@/features/about/user/AboutUs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Our Dental Clinic & Certified Specialists",
  description: "Learn about our dental clinic, state-of-the-art dental care technology, patient-centered mission, and certified team of experienced dentists.",
  keywords: [
    "about dental clinic",
    "certified dentists",
    "expert dental care team",
    "painless dental technology",
    "top rated dental practice"
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Our Dental Clinic & Certified Specialists",
    description: "Learn about our mission, state-of-the-art technology, and experienced dental team.",
    url: "/about",
  },
};

export default function AboutPage() {
  return <AboutUs />;
}

