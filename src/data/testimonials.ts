// src/data/testimonials.ts

// Define the expected data structure via interface
export interface Testimonial {
    quote: string;
    name: string;
    title: string;
    company: string;
    image?: string;
}

// Define the testimonials data array
export const testimonials: Testimonial[] = [
  {
    quote: "Working with TheoForge transformed our approach to AI. Their strategic insights were invaluable.",
    name: "Jane Doe",
    title: "CEO",
    company: "Innovate Solutions",
    image: "/fake_person1.png", 
  },
  {
    quote: "The bespoke training program developed by TheoForge significantly upskilled our team.",
    name: "John Smith",
    title: "Head of Technology",
    company: "Future Systems Inc.",
    image: "/fake_person2.png", 
  },
  // Add more testimonials as needed
];
