const { response } = require('express');
const Event = require('../models/Event');

const createEvent = async (req, res = response) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;

    const newEvent = await event.save();

    res.json({
      ok: true,
      event: newEvent,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Fallo la creación del evento'
    })
  }
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