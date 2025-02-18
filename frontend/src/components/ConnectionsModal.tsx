import { useState } from 'react';
import styles from '../styles/Connections.module.css';
import { CollaborationUser } from '../types/user';

interface ConnectionsModalProps {
  users: CollaborationUser[];
  userInterest: string;
  onClose: () => void;
  onUserSelect: (user: CollaborationUser) => void;
}

const ConnectionsModal = ({ users, userInterest, onClose, onUserSelect }: ConnectionsModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => 
    user.interests.some((interest: string) => 
      interest.toLowerCase().includes(userInterest.toLowerCase())
    )
  );

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>Connect with {userInterest} Students</h2>
        
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search by name or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.userList}>
          {filteredUsers.map(user => (
            <div key={user.id} className={styles.userCard} onClick={() => onUserSelect(user)}>
              <div className={styles.userAvatar}>
                {user.name.charAt(0)}
              </div>
              <div className={styles.userInfo}>
                <h3>{user.name}</h3>
                <p>{user.role}</p>
                <div className={styles.skillTags}>
                  {user.skills.slice(0, 3).map((skill: string) => (
                    <span key={skill} className={styles.tag}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectionsModal; 