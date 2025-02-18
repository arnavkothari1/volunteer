import mongoose from 'mongoose';
import { getModels } from '../models';
import { CategoryModel } from '../models/category.model';
import { User } from '../models/user.model';

const { Path } = getModels();

const seedData = async () => {
  try {
    // Clear existing data
    await Promise.all([
      Path.deleteMany({}),
      CategoryModel.deleteMany({}),
      User.deleteMany({})
    ]);

    // Create test user
    const user = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });

    // Create categories
    const categories = await CategoryModel.create([
      {
        name: 'Programming',
        description: 'Learn programming languages and concepts',
        icon: 'code',
        color: '#007bff'
      },
      {
        name: 'Design',
        description: 'Learn design principles and tools',
        icon: 'brush',
        color: '#28a745'
      }
    ]);

    // Create paths
    await Path.create([
      {
        title: 'JavaScript Basics',
        description: 'Learn JavaScript fundamentals',
        difficulty: 'beginner',
        category: categories[0]._id,
        creator: user._id,
        totalSteps: 5,
        tags: ['javascript', 'web-development', 'beginner']
      },
      {
        title: 'Advanced Python',
        description: 'Master Python programming',
        difficulty: 'advanced',
        category: categories[0]._id,
        creator: user._id,
        totalSteps: 10,
        tags: ['python', 'programming', 'advanced']
      },
      {
        title: 'UI Design Principles',
        description: 'Learn basic UI design',
        difficulty: 'intermediate',
        category: categories[1]._id,
        creator: user._id,
        totalSteps: 7,
        tags: ['design', 'ui', 'intermediate']
      }
    ]);

    console.log('Test data seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

export default seedData; 