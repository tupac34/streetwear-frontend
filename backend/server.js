const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Replace with your PayPal client ID and secret
const PAYPAL_CLIENT_ID = 'Aeo_u5JO5wNtsYL-hzKLhPaa4qGL4FyOJSEzjZenIagQZyR4M6aZDJDiKjJ7ImdzvLt2ryRLR1N3vtRf';
const PAYPAL_SECRET = 'ENDUDzLFKeqbVI_llgP0pEfatG3OVlSoko0xwKg0AekrB6IDlDKC43kMjxUQdzEibC2dNYvlPPhiZFTP';

// PayPal API endpoints
const PAYPAL_API = 'https://api-m.sandbox.paypal.com'; // Use 'https://api-m.paypal.com' for live mode

// Create an order
app.post('/api/create-order', async (req, res) => {
    const { totalAmount } = req.body;

    try {
        const auth = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, 'grant_type=client_credentials', {
            auth: {
                username: PAYPAL_CLIENT_ID,
                password: PAYPAL_SECRET,
            },
        });

        const accessToken = auth.data.access_token;

        const order = await axios.post(
            `${PAYPAL_API}/v2/checkout/orders`,
            {
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        amount: {
                            currency_code: 'USD',
                            value: totalAmount, // Example: 80.00
                        },
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        res.status(200).json(order.data);
    } catch (error) {
        console.error('Error creating PayPal order:', error.message);
        res.status(500).send({ error: error.response.data });
    }
});

// Capture the order
app.post('/api/capture-order', async (req, res) => {
    const { orderId } = req.body;

    try {
        const auth = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, 'grant_type=client_credentials', {
            auth: {
                username: PAYPAL_CLIENT_ID,
                password: PAYPAL_SECRET,
            },
        });

        const accessToken = auth.data.access_token;

        const capture = await axios.post(
            `${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        res.status(200).json(capture.data);
    } catch (error) {
        console.error('Error capturing PayPal order:', error.message);
        res.status(500).send({ error: error.response.data });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
