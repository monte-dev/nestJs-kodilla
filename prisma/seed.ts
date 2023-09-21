import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

function getProducts() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      name: 'Canon EOS 50D',
      price: 2000,
      description: 'Cheap, ideal for beginners',
    },
    {
      id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
      name: 'Canon EOS 5D',
      price: 5000,
      description: 'Professional camera, solid build',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17258',
      name: 'Canon R',
      price: 3000,
      description: 'Professional camera, we technology',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17259',
      name: 'Nikon D50',
      price: 2000,
      description: 'Cheap, ideal for beginners',
    },
    {
      id: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
      name: 'Leica q2',
      price: 5000,
      description: 'Small, compact, innovative',
    },
  ];
}

function getClients() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17262',
      name: 'Thomas Jefferson',
      address: 'Baker Street 12B, New York',
    },
    {
      id: '213a8123-c26d-4977-9e3d-718c1e371dcc',
      name: 'Jane Doe',
      address: '123 Main Street, London',
    },
    {
      id: 'c1b0a36c-f2f2-4cb4-b61a-ebcf5df926d8',
      name: 'John Doe',
      address: '123 Main Street, London',
    },
  ];
}

function getOrders() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17260',
      clientId: 'fd105551-0f0d-4a9f-bc41-c559c8a17262',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17261',
      clientId: '213a8123-c26d-4977-9e3d-718c1e371dcc',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17259',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17262',
      clientId: 'c1b0a36c-f2f2-4cb4-b61a-ebcf5df926d8',
      productId: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
    },
  ];
}

async function seed() {
  await Promise.all(
    getClients().map((client) => {
      return db.client.create({ data: client });
    }),
  );

  await Promise.all(
    getProducts().map((product) => {
      return db.product.create({ data: product });
    }),
  );

  await Promise.all(
    getOrders().map((order) => {
      return db.order.create({
        data: {
          product: {
            connect: { id: order.productId },
          },
        },
      });
    }),
  );
}

seed();
