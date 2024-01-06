const { response } = require('express');

const createEvent = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'Create Event'
  });
}

const getEvents = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'Get Events'
  });
}

const getEvent = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'Get One Event'
  });
}

const updateEvent = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'Update Event',
  });
}

const deleteEvent = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'Delete Event'
  })
}

module.exports = {
  getEvent,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
}