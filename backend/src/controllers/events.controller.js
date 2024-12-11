const express = require("express");
const router = express.Router();
const eventsService = require("../services/events.service");

// TODO: CHANGE CONTROLLER NAMES
router.get('/event-count-by-event-category', async (req, res) => {
  try {
    const { offset, start_date: startDate, end_date: endDate } = req.query;

    if (!offset || !startDate || !endDate) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    const data = await eventsService.getCountByCategory(
      parseInt(offset, 10),
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
    const { offset, start_date: startDate, end_date: endDate } = req.query;

    if (!offset || !startDate || !endDate) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    const data = await eventsService.getCountByName(
      parseInt(offset, 10),
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
    const { offset, start_date: startDate, end_date: endDate } = req.query;

    if (!offset || !startDate || !endDate) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    const data = await eventsService.getCountByLabel(
      parseInt(offset, 10),
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
    const { offset, start_date: startDate, end_date: endDate } = req.query;

    if (!offset || !startDate || !endDate) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    const data = await eventsService.getUsersByEventName(
      parseInt(offset, 10),
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