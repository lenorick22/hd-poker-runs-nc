const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  bikeInfo: {
    make: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    color: String
  },
  emergencyContact: {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    relationship: String
  },
  specialRequests: String,
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  hand: [{
    stop: Number,
    card: {
      suit: String,
      value: String
    }
  }],
  finalScore: Number
});

const StopSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  coordinates: {
    lat: Number,
    lng: Number
  },
  description: String,
  isRequired: {
    type: Boolean,
    default: true
  }
});

const PrizeSchema = new mongoose.Schema({
  place: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  value: Number,
  sponsor: String
});

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  startLocation: {
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  endLocation: {
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  stops: [StopSchema],
  registrationFee: {
    type: Number,
    required: true,
    min: 0
  },
  maxParticipants: {
    type: Number,
    required: true,
    min: 1
  },
  participants: [ParticipantSchema],
  prizes: [PrizeSchema],
  status: {
    type: String,
    enum: ['upcoming', 'active', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rules: String,
  requirements: [String],
  images: [String],
  weather: {
    forecast: String,
    lastUpdated: Date
  }
}, {
  timestamps: true
});

// Virtual for participant count
EventSchema.virtual('participantCount').get(function() {
  return this.participants.length;
});

// Virtual for spots remaining
EventSchema.virtual('spotsRemaining').get(function() {
  return this.maxParticipants - this.participants.length;
});

// Virtual for registration status
EventSchema.virtual('isRegistrationOpen').get(function() {
  return this.status === 'upcoming' && this.participantCount < this.maxParticipants;
});

// Index for efficient queries
EventSchema.index({ date: 1, status: 1 });
EventSchema.index({ 'startLocation.coordinates': '2dsphere' });
EventSchema.index({ organizer: 1 });

module.exports = mongoose.model('Event', EventSchema);