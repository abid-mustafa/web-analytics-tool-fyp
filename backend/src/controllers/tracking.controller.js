const express = require("express");
const router = express.Router();
const trackingService = require("../services/tracking.service");

router.post("/insert-event", async (req, res) => {
  try {
    const {
      visit_id,
      visitor_id,
      session_start,
      user_id,

      country,
      city,

      referrer_url,
      page_title,
      page_url,

      event_type,
      event_category,
      event_action,
      event_name,

      timestamp,

      device_category,
      browser,
      operating_system,
    } = req.body;

    result = await trackingService.insertEvent(
      visit_id,
      visitor_id,
      session_start,
      user_id,
      country,
      city,
      referrer_url,
      page_title,
      page_url,
      event_type,
      event_category,
      event_action,
      event_name,
      timestamp,
      device_category,
      browser,
      operating_system
    );
    res.status(201).json("result is" + result);
  } catch (error) {
    console.log("An error occured while inserting the data", error);
    res.status(500).send("An error occured while inserting the data", error);
  }
});

module.exports = router;
