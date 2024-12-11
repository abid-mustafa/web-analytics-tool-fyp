const express = require("express");
const router = express.Router();
const trackingService = require("../services/tracking.service");
const DeviceDetector = require('device-detector-js');
const deviceDetector = new DeviceDetector();
const geoip = require('geoip-lite');

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

router.post('/track-visit', async (req, res) => {
  try {
    const { visit_id, visitor_id, user_id, referrer_url, publicIP } = req.body;

    // Process and store event data
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    let anonymizedIp;
    if (ipAddress === '127.0.0.1') {
      // Anonymize the IP Address (IPv4 example: strip last octet)
      anonymizedIp = publicIP.split('.').slice(0, 3).join('.') + '.0';
    } else {
      // Anonymize the IP Address (IPv4 example: strip last octet)
      anonymizedIp = ipAddress.split('.').slice(0, 3).join('.') + '.0';
    }

    const parsedUA = deviceDetector.parse(req.headers['user-agent']);

    // Perform lookup
    const location = geoip.lookup(anonymizedIp);
    const country = location.country;
    const city = location.city;
    const device_category = parsedUA.device.type;
    const browser = parsedUA.client.name;
    const operating_system = parsedUA.os.name;

    // Save to database
    await trackingService.insertVisit(parseInt(visit_id, 10), visitor_id, user_id, country, city,
      device_category, browser, operating_system, referrer_url);

    res.status(200).send('Visit tracked successfully');
  } catch (error) {
    console.log(
      `An error occured while inserting visit: ${error.message}`
    );
    res.status(500).json({
      message: "An error occurred while inserting visit",
      error: error.message,
    });
  }
});

router.post('/track-pageview', async (req, res) => {
  try {
    const { visit_id, page_title, page_url } = req.body;

    // Save to database
    await trackingService.insertPageview(parseInt(visit_id, 10), page_title, page_url);

    res.status(200).send('Pageview tracked successfully');
  } catch (error) {
    console.log(
      `An error occured while inserting pageview: ${error.message}`
    );
    res.status(500).json({
      message: "An error occurred while inserting pageview",
      error: error.message,
    });
  }
});

router.post('/track-event', async (req, res) => {
  try {
    const { visit_id, event_category, event_action, event_name, event_value, page_title, page_url } = req.body;

    // Save to database
    await trackingService.insertEvent(parseInt(visit_id, 10), event_category, event_action, event_name, event_value, page_title, page_url);

    res.status(200).send('Event tracked successfully');
  } catch (error) {
    console.log(
      `An error occured while inserting event: ${error.message}`
    );
    res.status(500).json({
      message: "An error occurred while inserting event",
      error: error.message,
    });
  }
});

module.exports = router;
