const mongoose = require('mongoose');

const BikeInfoSchema = new mongoose.Schema({
  make: {
    type: String,
    default: 'Harley-Davidson'
  },
  model: String,
  year: Number,
  color: String,
  modifications: [String]
});

const EmergencyContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  relationship: String,
  email: String
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  phone: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['participant', 'organizer', 'admin'],
    default: 'participant'
  },
  bikeInfo: BikeInfoSchema,
  emergencyContact: EmergencyContactSchema,
  address: {
    street: String,
    city: String,
    state: {
      type: String,
      default: 'NC'
    },
    zipCode: String
  },
  preferences: {
    emailNotifications: {
      type: Boolean,
      default: true
    },
    smsNotifications: {
      type: Boolean,
      default: false
    },
    marketingEmails: {
      type: Boolean,
      default: true
    }
  },
  profile: {
    avatar: String,
    bio: String,
    ridingExperience: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert'],
      default: 'intermediate'
    },
    yearsRiding: Number,
    favoriteRoutes: [String]
  },
  statistics: {
    eventsParticipated: {
      type: Number,
      default: 0
    },
    eventsWon: {
      type: Number,
      default: 0
    },
    totalMilesRidden: {
      type: Number,
      default: 0
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date,
  emailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date
}, {
  timestamps: true
});

// Index for efficient queries
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ 'address.state': 1 });

// Virtual for full address
UserSchema.virtual('fullAddress').get(function() {
  if (!this.address) return '';
  const { street, city, state, zipCode } = this.address;
  return `${street || ''} ${city || ''}, ${state || ''} ${zipCode || ''}`.trim();
});

// Method to get public profile
UserSchema.methods.getPublicProfile = function() {
  return {
    id: this._id,
    name: this.name,
    profile: this.profile,
    statistics: this.statistics,
    createdAt: this.createdAt
  };
};

// Method to increment event participation
UserSchema.methods.incrementEventParticipation = function() {
  this.statistics.eventsParticipated += 1;
  return this.save();
};

module.exports = mongoose.model('User', UserSchema);