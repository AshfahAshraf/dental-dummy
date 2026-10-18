export interface ClinicConfig {
  name: string;
  fullName: string;
  doctorName: string;
  doctorTitle: string;
  tagline: string;
  location: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  hours: string;
  mapUrl: string;
  mapEmbed: string;
}

export interface ServiceItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  fullDescription?: string;
  image: string;
  features?: string[];
  duration?: string;
  idealFor?: string;
}

export interface DoctorItem {
  id: number;
  name: string;
  role: string;
  qualification: string;
  experience: string;
  bio: string;
  image: string;
  specialties: string[];
}

export interface ReviewItem {
  id: number;
  name: string;
  rating: number;
  review_time: string;
  review_text: string;
  location?: string;
}

export interface BeforeAfterItem {
  id: number;
  title: string;
  category: string;
  before_image: string;
  after_image: string;
  treatment_duration: string;
  description?: string;
}

export interface ClinicTourItem {
  id: number;
  title: string;
  description: string;
  image: string;
  badge?: string;
}

export const CLINIC_CONFIG: ClinicConfig = {
  name: "Dr. Muhammed's Dental Care",
  fullName: "DR. MUHAMMED'S DENTAL CARE & MULTI SPECIALITY DENTAL CLINIC",
  doctorName: "Dr. Muhammed",
  doctorTitle: "BDS, MDS - Chief Dental Surgeon & Implantologist",
  tagline: "Multi Speciality Dental Clinic • Thalassery",
  location: "Thalassery, Kannur, Kerala",
  address: "Dr. Muhammed's Dental Care, Court Road, Thalassery, Kannur, Kerala - 670101",
  phone: "+91 98470 12345",
  whatsapp: "919847012345",
  email: "contact@drmuhammeddental.com",
  hours: "Monday – Saturday: 9:00 AM – 8:00 PM | Sunday: 10:00 AM – 2:00 PM",
  mapUrl: "https://maps.google.com/?q=Thalassery+Kannur+Kerala",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3904.75713437145!2d75.4891152!3d11.7483845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba426b38c2c431b%3A0xe54e2f896b05be17!2sThalassery%2C%20Kerala!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin",
};

export const MOCK_SERVICES: ServiceItem[] = [
  {
    id: 1,
    title: "Laser Teeth Whitening & Cleaning",
    slug: "teeth-whitening",
    description:
      "Ultrasonic tartar removal and advanced laser whitening to brighten your smile up to 8 shades in a single comfortable visit.",
    fullDescription:
      "Our professional teeth whitening procedure utilizes medical-grade LED & laser activation combined with gentle ultrasonic scaling. Safe for enamel, our treatment removes stubborn stains caused by tea, coffee, smoking, and age while keeping sensitivity at a minimum.",
    image:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=80",
    features: [
      "Noticeable results in 45 minutes",
      "Painless ultrasonic scaling included",
      "Protects enamel & gums",
      "Long-lasting brightness with home care kit",
    ],
    duration: "45 - 60 Minutes",
    idealFor: "Stained, dull or discolored teeth",
  },
  {
    id: 2,
    title: "Single-Sitting Root Canal Treatment",
    slug: "root-canal-treatment",
    description:
      "Microscope-guided, virtually painless rotary root canal therapy that relieves acute toothache and preserves your natural tooth permanently.",
    fullDescription:
      "Modern rotary endodontics allows us to perform painless root canal therapy in just one sitting in most cases. Guided by apex locators and digital radiography, we eliminate infected pulp, sterilize canals, and seal the tooth permanently with biocompatible gutta-percha.",
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=80",
    features: [
      "99% painless with advanced local anesthesia",
      "Completed in a single comfortable sitting",
      "Preserves natural tooth structure",
      "Covered with custom zirconia or ceramic crown",
    ],
    duration: "45 Minutes",
    idealFor: "Severe toothache, deep cavities, or dental infection",
  },
  {
    id: 3,
    title: "Permanent Dental Implants",
    slug: "dental-implants",
    description:
      "Bio-compatible titanium & zirconia implants with computer-guided precision, providing lifetime durability, strength, and a natural look.",
    fullDescription:
      "Restore missing teeth with the closest alternative to natural teeth. Our digital 3D-planned dental implants fuse seamlessly with your jawbone, restoring full chewing power, protecting bone density, and preventing facial sagging.",
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80",
    features: [
      "Lifetime structural durability",
      "Restores 100% chewing function",
      "No damage to adjacent teeth",
      "Natural aesthetic translucency",
    ],
    duration: "2 - 3 Visits",
    idealFor: "Missing single or multiple teeth, loose dentures",
  },
  {
    id: 4,
    title: "Orthodontics & Clear Aligners",
    slug: "orthodontics-braces",
    description:
      "Modern invisible aligners and discreet ceramic braces designed to straighten crowded, crooked teeth for both teenagers and adults.",
    fullDescription:
      "Achieve the perfectly aligned smile you've always wanted. We offer custom transparent aligners (removable and virtually invisible) as well as self-ligating ceramic and metal braces to fix misalignments, gaps, overbites, and crossbites.",
    image:
      "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=900&q=80",
    features: [
      "Custom 3D digital smile simulation",
      "Removable clear aligners for easy hygiene",
      "Aesthetic tooth-colored ceramic brackets",
      "Personalized monthly progress tracking",
    ],
    duration: "6 - 14 Months",
    idealFor: "Crooked teeth, gaps, bite misalignment",
  },
  {
    id: 5,
    title: "Cosmetic Smile Makeover & Veneers",
    slug: "cosmetic-smile-makeover",
    description:
      "Handcrafted porcelain veneers, composite bonding, and digital smile design customized to achieve a radiant, camera-ready smile.",
    fullDescription:
      "Smile design combines art and clinical science. Whether you wish to fix chipped edges, gaps, uneven tooth lengths, or severe discoloration, our ultra-thin porcelain veneers and composite laminates provide immediate, stunning aesthetic harmony.",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80",
    features: [
      "Ultra-thin durable porcelain veneers",
      "Minimal or zero tooth reduction",
      "Custom shade & shape matched to your facial features",
      "Immediate transformation",
    ],
    duration: "2 Visits",
    idealFor: "Chipped, worn, gapped, or uneven teeth",
  },
  {
    id: 6,
    title: "Pediatric & Gentle Kids Dentistry",
    slug: "pediatric-dentistry",
    description:
      "Compassionate, playful, anxiety-free dental visits for children including preventive sealants, fluoride treatments, and gentle restorations.",
    fullDescription:
      "We believe positive early dental experiences build a lifetime of healthy oral habits. Our child-friendly operatory, gentle chairside manner, and preventive dental treatments ensure stress-free visits for both parents and kids.",
    image:
      "https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=900&q=80",
    features: [
      "Gentle & playful environment",
      "Pit & fissure preventive sealants",
      "Cavity prevention fluoride therapy",
      "Habit breaking & space maintainers",
    ],
    duration: "30 Minutes",
    idealFor: "Toddlers, children, and young teens",
  },
  {
    id: 7,
    title: "Zirconia & Ceramic Dental Crowns",
    slug: "crowns-and-bridges",
    description:
      "CAD/CAM engineered full-ceramic dental crowns and fixed bridges that restore chewing function with realistic enamel translucency.",
    fullDescription:
      "Protect weakened teeth or replace missing teeth with premium metal-free zirconia crowns. Designed using precision digital scanners, our crowns offer superior fracture resistance, seamless fit, and exact color blending with your surrounding teeth.",
    image:
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=900&q=80",
    features: [
      "100% metal-free biocompatible zirconia",
      "Precision CAD/CAM digital margin fit",
      "High chewing strength & fracture resistance",
      "Multi-year replacement warranty",
    ],
    duration: "2 Visits",
    idealFor: "Root-canal-treated teeth, broken teeth, bridge replacements",
  },
  {
    id: 8,
    title: "Wisdom Tooth & Minor Oral Surgery",
    slug: "wisdom-tooth-surgery",
    description:
      "Gentle atraumatic surgical extraction of impacted wisdom teeth with quick recovery and minimal post-operative discomfort.",
    fullDescription:
      "Impacted or partially erupted wisdom teeth can lead to recurring gum infection, cysts, and crowding. Our specialist oral surgeons perform quick, atraumatic extractions under local anesthesia with comprehensive post-op care guidance.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80",
    features: [
      "Gentle atraumatic extraction techniques",
      "Advanced localized pain control",
      "Rapid tissue healing protocols",
      "Comprehensive post-operative follow-up",
    ],
    duration: "30 - 45 Minutes",
    idealFor: "Impacted, painful, or misaligned wisdom teeth",
  },
  {
    id: 9,
    title: "Periodontal Care & Gum Therapy",
    slug: "gum-therapy",
    description:
      "Laser gum contouring, deep subgingival scaling, and advanced regenerative therapy for bleeding gums and mobile teeth.",
    fullDescription:
      "Healthy gums are the foundation of healthy teeth. Our periodontal therapies treat bleeding, swollen gums, bad breath, and loose teeth using deep ultrasonic root planing and gentle laser decontamination.",
    image:
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=900&q=80",
    features: [
      "Laser periodontal pocket decontamination",
      "Stops bleeding and bad breath",
      "Prevents premature tooth loss",
      "Promotes tissue reattachment",
    ],
    duration: "45 Minutes",
    idealFor: "Bleeding gums, periodontitis, receding gums",
  },
];

export const MOCK_DOCTORS: DoctorItem[] = [
  {
    id: 1,
    name: "Dr. Muhammed",
    role: "Chief Dental Surgeon & Implantologist",
    qualification: "BDS, MDS (Oral & Maxillofacial Implantology)",
    experience: "14+ Years Experience",
    bio: "Founder and Lead Surgeon at Dr. Muhammed's Dental Care in Thalassery. Dedicated to painless dentistry, full-mouth oral rehabilitations, and high-precision dental implants.",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
    specialties: ["Dental Implants", "Full Mouth Rehab", "Surgical Extractions"],
  },
  {
    id: 2,
    name: "Dr. Ayesha Rahman",
    role: "Consultant Orthodontist",
    qualification: "BDS, MDS (Orthodontics & Dentofacial Orthopedics)",
    experience: "9+ Years Experience",
    bio: "Certified clear aligner specialist with extensive expertise in self-ligating braces and aesthetic smile alignment for children, teens, and adults.",
    image:
      "https://images.unsplash.com/photo-1594824813501-48c5825a0a38?auto=format&fit=crop&w=800&q=80",
    specialties: ["Clear Aligners", "Ceramic Braces", "Smile Alignment"],
  },
  {
    id: 3,
    name: "Dr. Nihal V.K.",
    role: "Specialist Endodontist",
    qualification: "BDS, MDS (Conservative Dentistry & Endodontics)",
    experience: "8+ Years Experience",
    bio: "Microscopic root canal specialist known for painless single-sitting root canals, endodontic retreatments, and aesthetic tooth restorations.",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80",
    specialties: ["Single-Sitting RCT", "Microscopic Endodontics", "Zirconia Crowns"],
  },
  {
    id: 4,
    name: "Dr. Fathima Zahra",
    role: "Pediatric Dental Specialist",
    qualification: "BDS, MDS (Pedodontics & Preventive Dentistry)",
    experience: "7+ Years Experience",
    bio: "Passionate about creating anxiety-free, warm experiences for young patients, specializing in preventive fluoride treatments and child oral wellness.",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
    specialties: ["Pediatric Care", "Preventive Sealants", "Early Orthodontics"],
  },
];

export const MOCK_REVIEWS: ReviewItem[] = [
  {
    id: 1,
    name: "Shamseer K.",
    rating: 5,
    review_time: "2026-03-28T10:00:00Z",
    location: "Thalassery",
    review_text:
      "Dr. Muhammed is truly exceptional! I had severe tooth pain and dreaded root canal treatment, but the whole procedure was completely painless and smooth. Easily the most reliable dental clinic in Thalassery.",
  },
  {
    id: 2,
    name: "Ananya Nair",
    rating: 5,
    review_time: "2026-03-12T14:30:00Z",
    location: "Kannur",
    review_text:
      "Got my teeth whitening and ceramic crown done here. The clinic is spotless, high-tech, and Dr. Muhammed explains every step with extreme patience. Very transparent pricing!",
  },
  {
    id: 3,
    name: "Rafeeq V.P.",
    rating: 5,
    review_time: "2026-02-18T09:15:00Z",
    location: "Thalassery",
    review_text:
      "Took my 6-year-old daughter for cavity treatment. The gentle approach made her feel comfortable immediately without any tears or fear. Highly recommend Dr. Muhammed's Dental Care for family dental needs.",
  },
  {
    id: 4,
    name: "Arun Prakash",
    rating: 5,
    review_time: "2026-01-30T16:00:00Z",
    location: "Mahe",
    review_text:
      "Outstanding service and very polite staff. Had an emergency tooth chip while visiting Thalassery and got an immediate appointment. Modern digital equipment and top-notch care.",
  },
  {
    id: 5,
    name: "Fathimath Suhara",
    rating: 5,
    review_time: "2026-01-14T11:45:00Z",
    location: "Thalassery",
    review_text:
      "From the modern reception to the clean ergonomic chairs, everything feels world class. Thank you Dr. Muhammed for transforming my smile with clear aligners!",
  },
  {
    id: 6,
    name: "Kiran Dev",
    rating: 5,
    review_time: "2025-12-20T13:20:00Z",
    location: "Thalassery",
    review_text:
      "Pain-free dental implant placement. I was chewing comfortably within days. Excellent post-procedure follow-ups by the clinic team. 10/10 recommendation.",
  },
];

export const MOCK_BEFORE_AFTER: BeforeAfterItem[] = [
  {
    id: 1,
    title: "Cosmetic Porcelain Smile Makeover",
    category: "Smile Makeover",
    treatment_duration: "2 Weeks",
    description: "Correction of severe enamel fluorosis and spaced front teeth with ultra-thin ceramic veneers.",
    before_image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=700&q=80",
    after_image:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 2,
    title: "Laser In-Office Teeth Whitening",
    category: "Teeth Whitening",
    treatment_duration: "Single Session (45 min)",
    description: "Deep ultrasonic scaling followed by laser whitening to remove years of coffee & smoking stains.",
    before_image:
      "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=700&q=80",
    after_image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 3,
    title: "Clear Aligner Spacing Correction",
    category: "Orthodontics",
    treatment_duration: "7 Months",
    description: "Invisible aligners to close front gap and correct moderate bite misalignment without metal wires.",
    before_image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=700&q=80",
    after_image:
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=700&q=80",
  },
];

export const MOCK_CLINIC_TOUR: ClinicTourItem[] = [
  {
    id: 1,
    title: "Advanced Digital Operatory",
    description:
      "Equipped with modern pneumatic dental chairs, low-radiation digital radiography, and high-definition intraoral camera systems.",
    image: "/images/dental_chair.jpg",
    badge: "Operatory Suite",
  },
  {
    id: 2,
    title: "Comfortable Patient Lounge",
    description:
      "A soothing, clean, and air-conditioned reception area designed to make every visit calm and welcoming from the moment you arrive.",
    image: "/images/about_image1.jpg",
    badge: "Reception Area",
  },
  {
    id: 3,
    title: "Strict Sterilization & Autoclave Bay",
    description:
      "Hospital-grade Class-B vacuum autoclave and multi-stage pouch sterilization protocols ensuring 100% patient safety.",
    image: "/images/about_image2.jpg",
    badge: "Sterilization Unit",
  },
  {
    id: 4,
    title: "Digital Consultation & Diagnostic Suite",
    description:
      "Private consultation room for 3D smile simulations, treatment planning, and transparent discussion with our lead doctors.",
    image: "/images/hero_banner.jpg",
    badge: "Consultation Suite",
  },
];
