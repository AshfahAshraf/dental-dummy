import BeforeAfterResult from "@/features/gallery/user/BeforeAfterResult";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smile Transformations | Before & After Dental Results",
  description: "View real patient smile transformations, before and after teeth whitening, dental implants, veneers, and cosmetic dental treatments.",
  keywords: [
    "smile transformation",
    "before and after teeth whitening",
    "dental implants results",
    "veneers before and after",
    "cosmetic dentistry gallery"
  ],
  alternates: {
    canonical: "/before-after",
  },
  openGraph: {
    title: "Smile Transformations | Before & After Dental Results",
    description: "Real patient smile transformations and before & after cosmetic dentistry gallery.",
    url: "/before-after",
  },
};

export default function BeforeAfterPage() {
  return <BeforeAfterResult />;
}

