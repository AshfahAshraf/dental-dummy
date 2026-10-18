import Home from "@/features/home/user/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Dental Clinic & Dentist Near Me | Dental Care Platform",
  description: "Premier dental clinic offering painless teeth whitening, dental implants, root canals, and cosmetic dentistry. Book your appointment online today!",
  keywords: [
    "dental clinic",
    "dentist near me",
    "cosmetic dentistry",
    "teeth whitening clinic",
    "dental implants specialist",
    "painless root canal",
    "emergency dental care"
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Best Dental Clinic & Dentist Near Me | Dental Care Platform",
    description: "Painless teeth whitening, dental implants, root canals, and cosmetic dentistry. Book your appointment online today!",
    url: "/",
  },
};

export default function HomePage() {
  return <Home />;
}

