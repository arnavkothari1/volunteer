import { exec } from 'child_process';
import { config } from '../config/environment';

const backupDB = () => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = `./backups/pathbuilder-${timestamp}`;
  
  exec(`mongodump --uri="${config.staging.mongoUri}" --out="${backupPath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error('Backup failed:', error);
      return;
    }
    console.log('Backup completed successfully:', stdout);
  });
};

// Run backup
backupDB(); 