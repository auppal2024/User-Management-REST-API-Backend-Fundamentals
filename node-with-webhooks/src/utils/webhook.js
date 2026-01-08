const axios = require('axios');
const logger = require('../logger');

const triggerWebhook = async (url, payload) => {
  try {
    logger.info('Triggering webhook', { url, payload });

    // Fire and forget - don't await, so it's non-blocking
    axios.post(url, payload, {
      timeout: 5000, // 5 second timeout
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      logger.info('Webhook sent successfully', { url, status: response.status });
    })
    .catch(error => {
      logger.error('Webhook failed', {
        url,
        error: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      // Note: Not throwing error to avoid crashing the API
    });
  } catch (error) {
    logger.error('Error preparing webhook', { url, error: error.message });
  }
};

module.exports = { triggerWebhook };