import ServiceDetail from "@/features/services/user/ServiceDetail";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const formattedTitle = slug
    ? slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : "Dental Service";

  let serviceData: any = null;
  try {
    const res = await fetch(`http://127.0.0.1:8000/admin-panel/services/slug/${slug}/`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      serviceData = await res.json();
    }
  } catch {
    // Fallback if backend is offline during build
  }

  const title = serviceData?.title || formattedTitle;
  const description =
    serviceData?.description ||
    `Professional ${title} services at our state-of-the-art dental clinic. Safe, effective, and painless treatment by certified dental specialists.`;

  return {
    title: `${title} | Dental Care Platform`,
    description,
    keywords: [title, `${title} treatment`, `${title} cost`, `best dentist for ${title}`],
    alternates: {
      canonical: `/service/${slug}`,
    },
    openGraph: {
      title: `${title} | Dental Care Platform`,
      description,
      url: `/service/${slug}`,
    },
  };
}

export default function ServiceDetailPage() {
  return <ServiceDetail />;
}

