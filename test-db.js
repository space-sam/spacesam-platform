const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

async function testConnection() {
  try {
    console.log('Testing database connection...');
    console.log('Database URL:', process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@'));
    
    await prisma.$connect();
    console.log('✅ Successfully connected to database!');
    
    const result = await prisma.$queryRaw`SELECT version()`;
    console.log('PostgreSQL version:', result);
    
    await prisma.$disconnect();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();
