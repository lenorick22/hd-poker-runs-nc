const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Event = require('../models/Event');
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   POST /api/participants/register/:eventId
// @desc    Register for a poker run event
// @access  Private
router.post('/register/:eventId', [
  auth,
  [
    body('bikeInfo.make', 'Bike make is required').not().isEmpty(),
    body('bikeInfo.model', 'Bike model is required').not().isEmpty(),
    body('bikeInfo.year', 'Bike year is required').isNumeric(),
    body('emergencyContact.name', 'Emergency contact name is required').not().isEmpty(),
    body('emergencyContact.phone', 'Emergency contact phone is required').not().isEmpty(),
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const event = await Event.findById(req.params.eventId);
    
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Check if registration is still open
    if (event.status !== 'upcoming') {
      return res.status(400).json({ msg: 'Registration is closed for this event' });
    }

    // Check if event is full
    if (event.participants.length >= event.maxParticipants) {
      return res.status(400).json({ msg: 'Event is full' });
    }

    // Check if user is already registered
    const alreadyRegistered = event.participants.some(
      participant => participant.user.toString() === req.user.id
    );

    if (alreadyRegistered) {
      return res.status(400).json({ msg: 'You are already registered for this event' });
    }

    const { bikeInfo, emergencyContact, specialRequests } = req.body;

    // Add participant to event
    event.participants.push({
      user: req.user.id,
      registrationDate: new Date(),
      bikeInfo,
      emergencyContact,
      specialRequests,
      paymentStatus: 'pending'
    });

    await event.save();

    // Populate user info for response
    await event.populate('participants.user', 'name email');
    
    const newParticipant = event.participants[event.participants.length - 1];
    
    res.json({
      msg: 'Successfully registered for the event',
      participant: newParticipant
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/participants/unregister/:eventId
// @desc    Unregister from a poker run event
// @access  Private
router.delete('/unregister/:eventId', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Find the participant
    const participantIndex = event.participants.findIndex(
      participant => participant.user.toString() === req.user.id
    );

    if (participantIndex === -1) {
      return res.status(400).json({ msg: 'You are not registered for this event' });
    }

    // Check if cancellation is allowed (e.g., not too close to event date)
    const eventDate = new Date(event.date);
    const now = new Date();
    const daysUntilEvent = (eventDate - now) / (1000 * 60 * 60 * 24);

    if (daysUntilEvent < 7) {
      return res.status(400).json({ 
        msg: 'Cannot cancel registration less than 7 days before the event' 
      });
    }

    // Remove participant
    event.participants.splice(participantIndex, 1);
    await event.save();

    res.json({ msg: 'Successfully unregistered from the event' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/participants/my-events
// @desc    Get all events the user is registered for
// @access  Private
router.get('/my-events', auth, async (req, res) => {
  try {
    const events = await Event.find({
      'participants.user': req.user.id
    })
    .select('title description date startLocation endLocation status registrationFee participants.$')
    .populate('organizer', 'name email');

    // Filter to show only the current user's registration info
    const userEvents = events.map(event => ({
      ...event.toObject(),
      myRegistration: event.participants.find(p => p.user.toString() === req.user.id)
    }));

    res.json(userEvents);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/participants/update/:eventId
// @desc    Update participant information for an event
// @access  Private
router.put('/update/:eventId', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Find the participant
    const participant = event.participants.find(
      p => p.user.toString() === req.user.id
    );

    if (!participant) {
      return res.status(400).json({ msg: 'You are not registered for this event' });
    }

    // Update allowed fields
    const { bikeInfo, emergencyContact, specialRequests } = req.body;
    
    if (bikeInfo) participant.bikeInfo = { ...participant.bikeInfo, ...bikeInfo };
    if (emergencyContact) participant.emergencyContact = { ...participant.emergencyContact, ...emergencyContact };
    if (specialRequests !== undefined) participant.specialRequests = specialRequests;

    await event.save();

    res.json({ msg: 'Registration updated successfully', participant });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/participants/event/:eventId
// @desc    Get all participants for an event (Admin/Organizer only)
// @access  Private (Admin/Organizer)
router.get('/event/:eventId', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId)
      .populate('participants.user', 'name email phone')
      .populate('organizer', 'name email');
    
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Check if user is organizer or admin
    if (event.organizer._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    res.json({
      eventTitle: event.title,
      totalParticipants: event.participants.length,
      maxParticipants: event.maxParticipants,
      participants: event.participants
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;