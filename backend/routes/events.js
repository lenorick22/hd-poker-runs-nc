const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Event = require('../models/Event');
const auth = require('../middleware/auth');

// @route   GET /api/events
// @desc    Get all poker run events
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { status, location, date } = req.query;
    let filter = {};
    
    if (status) filter.status = status;
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      filter.date = { $gte: startDate, $lt: endDate };
    }

    const events = await Event.find(filter)
      .sort({ date: 1 })
      .populate('organizer', 'name email');
    
    res.json(events);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/events/:id
// @desc    Get event by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'name email')
      .populate('participants.user', 'name email');
    
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }
    
    res.json(event);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/events
// @desc    Create a new poker run event
// @access  Private (Admin/Organizer)
router.post('/', [
  auth,
  [
    body('title', 'Title is required').not().isEmpty(),
    body('description', 'Description is required').not().isEmpty(),
    body('date', 'Valid date is required').isISO8601(),
    body('startLocation', 'Start location is required').not().isEmpty(),
    body('endLocation', 'End location is required').not().isEmpty(),
    body('registrationFee', 'Registration fee must be a number').isNumeric(),
    body('maxParticipants', 'Max participants must be a number').isNumeric()
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      title,
      description,
      date,
      startLocation,
      endLocation,
      stops,
      registrationFee,
      maxParticipants,
      prizes
    } = req.body;

    const newEvent = new Event({
      title,
      description,
      date,
      startLocation,
      endLocation,
      stops,
      registrationFee,
      maxParticipants,
      prizes,
      organizer: req.user.id
    });

    const event = await newEvent.save();
    res.json(event);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/events/:id
// @desc    Update event
// @access  Private (Admin/Organizer)
router.put('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Check if user owns the event or is admin
    if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(updatedEvent);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/events/:id
// @desc    Delete event
// @access  Private (Admin/Organizer)
router.delete('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Check if user owns the event or is admin
    if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Event.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Event removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;