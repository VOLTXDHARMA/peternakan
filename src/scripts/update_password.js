import { db } from '../config/database.js';
import bcrypt from 'bcrypt';

async function updatePassword() {
    try {
        const newPassword = 'password';
        const hash = await bcrypt.hash(newPassword, 10);
        
        const result = await db.query(
            "UPDATE users SET password = $1 WHERE email = 'anggita@an.com' RETURNING email, username",
            [hash]
        );
        
        console.log('✅ Password updated successfully for:', result.rows[0]);
        console.log('New hash:', hash);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

updatePassword();
