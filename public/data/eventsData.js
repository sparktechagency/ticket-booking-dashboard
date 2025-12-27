// src/data/eventsData.js
import { v4 as uuidv4 } from "uuid";

export const eventsData = [
  {
    id: 4535213,
    title: "Coldplay Live",
    artists: [
      { id: "1", name: "The Weeknd", genre: "R&B" },
      { id: "2", name: "Taylor Swift", genre: "Pop" },
      { id: "3", name: "Drake", genre: "Hip-Hop" },
      // add more artists
    ],
    venue: "Madison Square Garden",
    city: "New York",
    date: "2025-01-14",
    cancelled: false,
    imageUrl: "https://images.unsplash.com/photo-1518972559570-6c24a8e9f6f8",
    ticketCategories: [
      { id: uuidv4(), name: "VIP", totalQuantity: 200, availableQuantity: 50 },
      {
        id: uuidv4(),
        name: "Regular",
        totalQuantity: 500,
        availableQuantity: 150,
      },
    ],
  },
  {
    id: 124343,
    title: "Tomorrowland Festival",
    artists: [
      { id: "1", name: "The Weeknd", genre: "R&B" },
      { id: "2", name: "Taylor Swift", genre: "Pop" },
      { id: "3", name: "Drake", genre: "Hip-Hop" },
      // add more artists
    ],
    venue: "Wembley Stadium",
    city: "London",
    date: "2025-03-20",
    cancelled: false,
    imageUrl: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d",
    ticketCategories: [
      { id: uuidv4(), name: "VIP", totalQuantity: 300, availableQuantity: 120 },
      {
        id: uuidv4(),
        name: "Regular",
        totalQuantity: 700,
        availableQuantity: 300,
      },
    ],
  },
  {
    id: 31223,
    title: "NBA Finals",
    artists: [
      { id: "1", name: "The Weeknd", genre: "R&B" },
      { id: "2", name: "Taylor Swift", genre: "Pop" },
      { id: "3", name: "Drake", genre: "Hip-Hop" },
      // add more artists
    ],
    venue: "Staples Center",
    city: "Los Angeles",
    date: "2025-02-10",
    cancelled: false,
    imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    ticketCategories: [
      { id: uuidv4(), name: "VIP", totalQuantity: 150, availableQuantity: 40 },
      {
        id: uuidv4(),
        name: "Regular",
        totalQuantity: 600,
        availableQuantity: 220,
      },
    ],
  },
  {
    id: 13243,
    title: "UFC Championship",
    artists: [
      { id: "1", name: "The Weeknd", genre: "R&B" },
      { id: "2", name: "Taylor Swift", genre: "Pop" },
      { id: "3", name: "Drake", genre: "Hip-Hop" },
      // add more artists
    ],
    venue: "Olympic Park",
    city: "Paris",
    date: "2025-04-02",
    cancelled: false,
    imageUrl: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f",
    ticketCategories: [
      { id: uuidv4(), name: "VIP", totalQuantity: 100, availableQuantity: 20 },
      {
        id: uuidv4(),
        name: "Regular",
        totalQuantity: 400,
        availableQuantity: 180,
      },
    ],
  },
  {
    id: 3214214,
    title: "Rock in Rio",
    artists: [
      { id: "1", name: "The Weeknd", genre: "R&B" },
      { id: "2", name: "Taylor Swift", genre: "Pop" },
      { id: "3", name: "Drake", genre: "Hip-Hop" },
      // add more artists
    ],
    venue: "Maracanã Stadium",
    city: "Rio de Janeiro",
    date: "2025-05-10",
    cancelled: true,
    imageUrl: "https://images.unsplash.com/photo-1485217988980-11786ced9454",
    ticketCategories: [
      { id: uuidv4(), name: "VIP", totalQuantity: 200, availableQuantity: 0 },
      {
        id: uuidv4(),
        name: "Regular",
        totalQuantity: 800,
        availableQuantity: 0,
      },
    ],
  },
  // Add more events as needed
];
