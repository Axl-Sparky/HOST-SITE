const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const qrcode = require('qrcode');
const { Client, LocalAuth } = require('whatsapp-web.js');

let client;
let qrCode = '';
let pairingCode = '';
let messages = [];

// Initialize WhatsApp client
const initializeClient = () => {
  client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
  });

  client.on('qr', (qr) => {
    qrcode.toDataURL(qr, (err, url) => {
      if (!err) {
        qrCode = url;
        pairingCode = qr;
      }
    });
  });

  client.on('authenticated', () => {
    console.log('Client is authenticated');
    pairingCode = 'Authenticated';
  });

  client.on('ready', () => {
    console.log('Client is ready');
  });

  client.on('message', async (msg) => {
    const messageData = {
      date: new Date().toISOString(),
      from: msg.from,
      to: msg.to,
      body: msg.body,
      isCommand: msg.body.startsWith('.')
    };

    messages.push(messageData);

    // Handle commands
    if (messageData.isCommand) {
      const command = msg.body.split(' ')[0].toLowerCase();
      
      if (command === '.ping') {
        await msg.reply('Pong! 🏓');
      }
    }
  });

  client.initialize();
};

initializeClient();

// API endpoints
router.get('/status', (req, res) => {
  res.json({
    status: client ? 'connected' : 'disconnected',
    pairingCode: pairingCode,
    qrCode: qrCode,
    connectedNumber: client?.info?.wid?.user || ''
  });
});

router.get('/messages', (req, res) => {
  res.json(messages);
});

router.get('/stats', (req, res) => {
  res.json({
    totalCommands: messages.filter(m => m.isCommand).length,
    runTrials: 2,
    remainingQuota: 'Unlimited'
  });
});

module.exports = router;
