import Contact from "@/features/contact/user/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Our Dental Clinic & Book an Appointment",
  description: "Get in touch with our expert dental team. Schedule your appointment online, find our clinic address, or contact us for emergency dental care.",
  keywords: [
    "contact dental clinic",
    "book dental appointment",
    "emergency dentist phone number",
    "dental clinic address",
    "dental consultation"
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Our Dental Clinic & Book an Appointment",
    description: "Schedule your consultation or call us for emergency dental assistance.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return <Contact />;
}

