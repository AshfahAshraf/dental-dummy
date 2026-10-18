import OurTeam from "@/features/team/user/OurTeam";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet Our Experienced Dentists & Specialists",
  description: "Meet our highly qualified team of dentists, cosmetic surgeons, orthodontists, and dental hygienists dedicated to your healthy smile.",
  keywords: [
    "expert dentists",
    "dental specialists",
    "orthodontist",
    "cosmetic dental surgeon",
    "dental hygienist"
  ],
  alternates: {
    canonical: "/team",
  },
  openGraph: {
    title: "Meet Our Experienced Dentists & Specialists",
    description: "Our team of certified dental specialists dedicated to comfortable, painless care.",
    url: "/team",
  },
};

export default function TeamPage() {
  return <OurTeam />;
}

