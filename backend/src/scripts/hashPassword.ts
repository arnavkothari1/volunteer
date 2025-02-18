import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function updatePassword() {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash('test1234', saltRounds);

    await prisma.user.update({
      where: {
        email: 'arnav_kothari@yahoo.com'
      },
      data: {
        password: hashedPassword
      }
    });

    console.log('Password updated successfully');
  } catch (error) {
    console.error('Error updating password:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updatePassword(); 