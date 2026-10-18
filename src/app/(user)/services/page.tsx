import Services from "@/features/services/user/Services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comprehensive Dental Services & Treatments",
  description: "Explore our full range of professional dental treatments including cosmetic dentistry, teeth whitening, root canals, dental implants, crowns, and oral surgery.",
  keywords: [
    "dental services",
    "teeth whitening cost",
    "root canal treatment",
    "dental implant procedure",
    "tooth extraction",
    "cosmetic dentistry treatments"
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Comprehensive Dental Services & Treatments",
    description: "Full range of painless dental treatments, teeth whitening, implants, and root canals.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return <Services />;
}

