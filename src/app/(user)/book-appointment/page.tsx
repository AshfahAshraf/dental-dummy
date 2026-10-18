import BookAppointment from "@/features/appointments/user/BookAppointment";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Dental Appointment Online | Schedule Your Visit",
  description: "Easily book your dental checkup, consultation, or emergency appointment online. Fast, convenient, and instant confirmation.",
  keywords: [
    "book dentist appointment online",
    "schedule dental consultation",
    "dental checkup booking",
    "dentist appointment"
  ],
  alternates: {
    canonical: "/book-appointment",
  },
  openGraph: {
    title: "Book Dental Appointment Online | Schedule Your Visit",
    description: "Book your dental checkup or emergency consultation online instantly.",
    url: "/book-appointment",
  },
};

export default function BookAppointmentPage() {
  return <BookAppointment />;
}

