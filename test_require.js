try {
    const view = require('./node_modules/express/lib/view');
    console.log('Successfully required view.js');
} catch (e) {
    console.error('Failed to require view.js:', e.message);
    console.error('Stack:', e.stack);
}
