try {
    const express = require('express');
    console.log('Successfully required express');
    const app = express();
    console.log('Successfully initialized app');
} catch (e) {
    console.error('Failed:', e.message);
    console.error('Stack:', e.stack);
}
