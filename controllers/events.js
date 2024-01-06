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
      msg: 'Evento creado correctamente'
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Fallo la creación del evento'
    })
  }
}

const getEvents = async (req, res = response) => {
  const events = await Event.find().populate('user', 'name');

  res.json({
    ok: true,
    events
  });
}

const getEvent = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'Get One Event'
  });
}

const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      res.status(404).json({
        ok: false,
        msg: 'El evento no existe'
      })
    }

    if (event.user.toString() !== uid) {
      res.status(401).json({
        ok: false,
        msg: 'No tiene permiso de editar este evento'
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    }

    const updateEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true
    });

    res.json({
      ok: true,
      event: updateEvent,
      msg: 'Evento actulizado correctamente',
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Fallo la actualización del evento'
    })
  }
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