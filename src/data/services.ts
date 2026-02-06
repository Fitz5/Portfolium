export interface Service {
  id: string;
  name: string;
  price: number | null;
  priceLabel: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

export const services: Service[] = [
  {
    id: "starter",
    name: "Starter",
    price: 50000,
    priceLabel: "$500",
    description: "Perfect for small projects and social media content.",
    features: [
      "30-second edited FPV video",
      "1 location",
      "1 revision",
      "Delivered in 5 business days",
    ],
    cta: "Book Now",
    highlighted: false,
  },
  {
    id: "professional",
    name: "Professional",
    price: 150000,
    priceLabel: "$1,500",
    description: "Full production for commercial and creative projects.",
    features: [
      "2-minute edited FPV video",
      "Up to 3 locations",
      "2 revisions",
      "Licensed music included",
      "Delivered in 10 business days",
    ],
    cta: "Book Now",
    highlighted: true,
  },
  {
    id: "custom",
    name: "Custom Project",
    price: null,
    priceLabel: "Let's Talk",
    description: "Have something bigger in mind? Let's build your vision together.",
    features: [
      "Tailored to your project scope",
      "Multiple locations & deliverables",
      "Dedicated project planning",
      "Flexible timeline",
    ],
    cta: "Get in Touch",
    highlighted: false,
  },
];
