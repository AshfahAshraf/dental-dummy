import ClinicTour from "@/features/clinic-tour/user/ClinicTour";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Virtual Clinic Tour | Modern Dental Care Facilities",
  description: "Take a virtual tour of our modern dental clinic. Experience our comfortable environment, sterile treatment rooms, and advanced medical equipment.",
  keywords: [
    "dental clinic tour",
    "modern dental facility",
    "painless dental equipment",
    "sterile dental clinic"
  ],
  alternates: {
    canonical: "/clinic-tour",
  },
  openGraph: {
    title: "Virtual Clinic Tour | Modern Dental Care Facilities",
    description: "Take a virtual tour of our modern dental clinic and advanced treatment facilities.",
    url: "/clinic-tour",
  },
};

export default function ClinicTourPage() {
  return <ClinicTour />;
}

