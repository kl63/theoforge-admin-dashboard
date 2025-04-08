// src/data/testimonials.ts

// Define the expected data structure via interface
export interface Testimonial {
    id: number; // Added ID field for React keys
    quote: string;
    name: string;
    title: string;
    company: string;
    image?: string;
}

// Define the testimonials data array
export const testimonials: Testimonial[] = [
  {
    id: 1, // Assign IDs
    quote: "Working with TheoForge transformed our approach to AI. Their strategic insights were invaluable.",
    name: "Jane Doe",
    title: "CEO",
    company: "Innovate Solutions",
    image: "/images/customers/fake_person1.png", // Updated path
  },
  {
    id: 2, // Assign IDs
    quote: "The bespoke training program developed by TheoForge significantly upskilled our team.",
    name: "John Smith",
    title: "Head of Technology",
    company: "Future Systems Inc.",
    image: "/images/customers/fake_person2.png", // Updated path
  },
  // Add more testimonials as needed
];
