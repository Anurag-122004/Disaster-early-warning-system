const mongoose = require('mongoose');

const DisasterSchema = new mongoose.Schema({
    type: { type: String, required: true },
    location: { type: String, required: true },
    severity: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Disaster', DisasterSchema);
