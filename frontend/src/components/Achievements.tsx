import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export const Achievements: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    // Fetch user achievements
    fetch('/api/achievements')
      .then(res => res.json())
      .then(data => setAchievements(data));
  }, []);

  return (
    <div className="achievements-section">
      <h3>Your Achievements</h3>
      <div className="achievements-grid">
        {achievements.map(achievement => (
          <div 
            key={achievement.id} 
            className={`achievement-card ${achievement.unlockedAt ? 'unlocked' : 'locked'}`}
          >
            <Image src="/achievement-icon.svg" alt="Achievement" width={30} height={30} />
            <h4>{achievement.title}</h4>
            <p>{achievement.description}</p>
            {achievement.unlockedAt && (
              <span>Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}; 