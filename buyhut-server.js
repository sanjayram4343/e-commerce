const express = require('express');
const path = require('path');
const chalk = require('chalk');

const app = express();
const PORT = process.env.PORT || 8888;

// Serve static files from the root directory
app.use(express.static(__dirname));

// Route to serve BuyHut store
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'modern-ecommerce.html'));
});

// Route for any other requests - redirect to BuyHut
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'modern-ecommerce.html'));
});

// Start the server with error handling
const server = app.listen(PORT, () => {
    console.log(
        `${chalk.green('✓')} ${chalk.blue(
            `BuyHut Store is running on port ${PORT}`
        )}`
    );
    console.log(
        `${chalk.yellow('🛍️')} ${chalk.cyan(
            `Visit http://localhost:${PORT} to see your BuyHut E-commerce Store!`
        )}`
    );
    console.log(
        `${chalk.magenta('📱')} ${chalk.white(
            `Your store features: iPhone 13 Pro, MacBook, Nike Shoes, Ray-Ban, Puma T-shirt, Fossil Watch, Earbuds`
        )}`
    );
});

// Handle server errors
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(
            `${chalk.red('✗')} ${chalk.yellow(
                `Port ${PORT} is already in use. Trying port ${PORT + 1}...`
            )}`
        );
        // Try next port
        const newServer = app.listen(PORT + 1, () => {
            console.log(
                `${chalk.green('✓')} ${chalk.blue(
                    `BuyHut Store is running on port ${PORT + 1}`
                )}`
            );
            console.log(
                `${chalk.yellow('🛍️')} ${chalk.cyan(
                    `Visit http://localhost:${PORT + 1} to see your BuyHut E-commerce Store!`
                )}`
            );
        });
    } else {
        console.error(`${chalk.red('✗')} Server error:`, err);
    }
});
