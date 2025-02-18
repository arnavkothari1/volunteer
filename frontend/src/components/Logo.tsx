import React from 'react';
import styles from '../styles/Logo.module.css';

const Logo = () => (
  <div className={styles.logo}>
    <span className={styles.icon}>🛠️</span>
    <span className={styles.text}>PathBuilder</span>
  </div>
);

export default Logo; 