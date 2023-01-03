//import { PrismaClient } from "@prisma/client"
const { PrismaClient } = require ("@prisma/client"); // Aquí obtenemos la clase PrismaClient
const prisma = new PrismaClient() // Aquí creamos una instancia

prisma.$on('beforeExit', async () => {
  console.log('beforeExit hook')
  // PrismaClient still available
  await prisma.message.create({
    data: {
      message: 'Shutting down server',
    },
  })
});

module.exports = { prisma };