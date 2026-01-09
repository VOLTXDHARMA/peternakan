import app from './app.js';
// Don't import runMigrations here to avoid auto-running migrations
// Run migrations manually with: npm run migrate

const PORT = process.env.APP_PORT || 3000;

// Start server
const server = app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📚 API Docs: http://localhost:${PORT}/api-docs`);
});

// Prevent process exit on unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});