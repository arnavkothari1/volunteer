import { getModels } from '../models';
const { Progress } = getModels();

export const getStats = async (userId: string) => {
  const stats = await Progress.aggregate([
    { $match: { userId } },
    {
      $group: {
        _id: null,
        totalPaths: { $sum: 1 },
        completedPaths: { $sum: { $cond: [{ $eq: ['$completed', true] }, 1, 0] } },
        inProgressPaths: { $sum: { $cond: [{ $eq: ['$completed', false] }, 1, 0] } }
      }
    }
  ]);
  return stats[0] || { totalPaths: 0, completedPaths: 0, inProgressPaths: 0 };
}; 