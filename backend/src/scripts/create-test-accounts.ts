import { getModels } from '../models';
const { User, Path } = getModels();

async function createTestAccounts() {
  try {
    // Create demo user
    const demoUser = await User.create({
      email: 'demo@pathbuilder.com',
      password: 'demo123',
      role: 'user'
    });

    // Create demo admin
    const adminUser = await User.create({
      email: 'admin@pathbuilder.com',
      password: 'admin123',
      role: 'admin'
    });

    // Create sample path
    await Path.create({
      title: 'Getting Started with PathBuilder',
      description: 'Learn how to use PathBuilder effectively',
      difficulty: 'beginner',
      category: 'tutorial',
      creator: adminUser._id,
      steps: [
        { title: 'Welcome', content: 'Welcome to PathBuilder!' },
        { title: 'First Steps', content: 'Let\'s begin your journey...' }
      ]
    });

    console.log('Test accounts created successfully');
  } catch (error) {
    console.error('Error creating test accounts:', error);
  }
}
