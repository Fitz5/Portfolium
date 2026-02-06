export interface Project {
  id: string;
  title: string;
  client: string;
  location: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
}

export const projects: Project[] = [
  {
    id: "mountain-resort",
    title: "Mountain Resort Flythrough",
    client: "Alpine Lodge Co.",
    location: "Aspen, CO",
    description:
      "Cinematic FPV tour through a luxury mountain resort, weaving between chalets and through the main lodge.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/thumbnails/mountain-resort.jpg",
  },
  {
    id: "urban-chase",
    title: "Urban Chase Sequence",
    client: "Metro Films",
    location: "Los Angeles, CA",
    description:
      "High-speed FPV chase through downtown streets and parking structures for a short film production.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/thumbnails/urban-chase.jpg",
  },
  {
    id: "warehouse-tour",
    title: "Warehouse Product Launch",
    client: "TechStart Inc.",
    location: "Austin, TX",
    description:
      "One-take FPV flight through a warehouse during a product launch event, capturing the energy of the crowd.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/thumbnails/warehouse-tour.jpg",
  },
  {
    id: "coastal-cliffs",
    title: "Coastal Cliff Dive",
    client: "Travel Weekly",
    location: "Big Sur, CA",
    description:
      "Dramatic cliff-diving FPV footage along the Pacific coastline for a travel magazine feature.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/thumbnails/coastal-cliffs.jpg",
  },
  {
    id: "stadium-event",
    title: "Stadium Concert Opener",
    client: "Live Nation",
    location: "Nashville, TN",
    description:
      "Opening sequence FPV flight through a packed stadium, diving from the rafters to the stage.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/thumbnails/stadium-event.jpg",
  },
  {
    id: "real-estate-luxury",
    title: "Luxury Estate Showcase",
    client: "Sotheby's Realty",
    location: "Miami, FL",
    description:
      "Seamless FPV tour of a waterfront estate, flowing from exterior pool area through the interior rooms.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/thumbnails/real-estate-luxury.jpg",
  },
];
