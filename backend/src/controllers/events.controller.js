const express = require("express");
const router = express.Router();
const eventsService = require("../services/events.service");

// TODO: CHANGE CONTROLLER NAMES
router.get('/event-count-by-event-category', async (req, res) => {
  try {
    const offset = parseInt(req.query.offset);
    const startDate = req.query.start_date;
    const endDate = req.query.end_date;

    const data = await eventsService.getCountByCategory(
      offset,
      startDate,
      endDate
    );

    res.status(200).json(data);
  } catch (error) {
    console.log(
      `An error occured while getting event count by event category: ${error.message}`
    );
    res.status(500).json({
      message: "An error occurred while getting event count by event category",
      error: error.message,
    });
  }
});

router.get("/event-count-by-event-name", async (req, res) => {
  try {
    const offset = parseInt(req.query.offset);
    const startDate = req.query.start_date;
    const endDate = req.query.end_date;

    const data = await eventsService.getCountByName(
      offset,
      startDate,
      endDate
    );

    res.status(200).json(data);
  } catch (error) {
    console.log(
      `An error occured while getting event count by event name: ${error.message}`
    );
    res.status(500).json({
      message: "An error occurred while getting event count by event name",
      error: error.message,
    });
  }
});

router.get('/event-count-by-event-label', async (req, res) => {
  try {
    const offset = parseInt(req.query.offset);
    const startDate = req.query.start_date;
    const endDate = req.query.end_date;

    const data = await eventsService.getCountByLabel(
      offset,
      startDate,
      endDate
    );

    res.status(200).json(data);
  } catch (error) {
    console.log(
      `An error occured while getting event count by event label: ${error.message}`
    );
    res.status(500).json({
      message: "An error occurred while getting event count by event label",
      error: error.message,
    });
  }
});

router.get('/active-users-by-event-name', async (req, res) => {
  try {
    const offset = parseInt(req.query.offset);
    const startDate = req.query.start_date;
    const endDate = req.query.end_date;

    const data = await eventsService.getUsersByEventName(
      offset,
      startDate,
      endDate
    );

    res.status(200).json(data);
  } catch (error) {
    console.log(
      `An error occured while getting active users by event name: ${error.message}`
    );
    res.status(500).json({
      message: "An error occurred while getting active users by event name",
      error: error.message,
    });
  }
});

module.exports = router;