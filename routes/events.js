/**
 * Events routes
 * host + /api/events
 */

const express = require('express');
const { check } = require('express-validator');

const { validJwt } = require('../middlewares/validJwt');
const { getEvents, createEvent, getEvent, updateEvent, deleteEvent } = require('../controllers/events');

const router = express.Router();

router.use(validJwt);

router.post('/', createEvent);

router.get('/', getEvents);

router.get('/:id', getEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;