export const ordersData = [
  {
    id: "ORD-1001",
    customerInfo: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 555-1234",
      address: "123 Main Street\nNew York, NY 10001\nUSA",
    },
    userId: "USR-001",
    eventTitle: "Summer Beats Festival",
    createdAt: "2025-01-10",
    status: "confirmed",
    total: 120,
    items: [
      {
        categoryName: "VIP Ticket",
        quantity: 1,
        unitPrice: 80,
        totalPrice: 80,
      },
      {
        categoryName: "General Admission",
        quantity: 2,
        unitPrice: 20,
        totalPrice: 40,
      },
    ],
  },
  {
    id: "ORD-1002",
    customerInfo: {
      name: "Emily Smith",
      email: "emily@example.com",
      phone: "+1 555-5678",
      address: "456 Oak Avenue\nLos Angeles, CA 90001\nUSA",
    },
    userId: "USR-002",
    eventTitle: "Rock Nation Live",
    createdAt: "2025-01-12",
    status: "pending",
    total: 75,
    items: [
      {
        categoryName: "General Admission",
        quantity: 3,
        unitPrice: 25,
        totalPrice: 75,
      },
    ],
  },
  {
    id: "ORD-1003",
    customerInfo: {
      name: "Michael Brown",
      email: "michael@example.com",
      phone: "+1 555-9012",
      address: "789 Pine Road\nChicago, IL 60601\nUSA",
    },
    userId: "USR-003",
    eventTitle: "Jazz Nights",
    createdAt: "2025-01-15",
    status: "confirmed",
    total: 150,
    items: [
      {
        categoryName: "Premium Seat",
        quantity: 2,
        unitPrice: 50,
        totalPrice: 100,
      },
      {
        categoryName: "Backstage Pass",
        quantity: 1,
        unitPrice: 50,
        totalPrice: 50,
      },
    ],
  },
];
