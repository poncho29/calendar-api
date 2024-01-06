/**
 * Events routes
 * host + /api/events
 */

const express = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');

const { validJwt } = require('../middlewares/validJwt');
const { validFields } = require('../middlewares/validFields');

const { getEvents, createEvent, getEvent, updateEvent, deleteEvent } = require('../controllers/events');

const router = express.Router();

router.use(validJwt);

router.post(
  '/',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('end', 'La fecha de finalización es obligatoria').custom(isDate),
    validFields,
  ],
  createEvent);

router.get('/', getEvents);

router.get('/:id', getEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;