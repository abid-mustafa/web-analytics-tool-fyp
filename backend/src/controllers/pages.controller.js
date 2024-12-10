const express = require("express");
const router = express.Router();
const pagesService = require("../services/pages.service");

// TODO: CHANGE CONTROLLER NAMES

router.get('/views-by-page-title', async (req, res) => {
  try {
    const offset = parseInt(req.query.offset);
    const startDate = req.query.start_date;
    const endDate = req.query.end_date;

    const data = await pagesService.getViewsByPageTitle(
      offset,
      startDate,
      endDate
    );

    res.status(200).json(data);
  } catch (error) {
    console.log(
      "An error occured while getting page views by title",
      error.message
    );
    res.status(500).json({
      message: "An error occurred while getting page views by title",
      error: error.message,
    });
  }
});

router.get('/sessions-by-page-referrer', async (req, res) => {
  try {
    const offset = parseInt(req.query.offset);
    const startDate = req.query.start_date;
    const endDate = req.query.end_date;

    const data = await pagesService.getSessionsByPageReferrer(
      offset,
      startDate,
      endDate
    );

    res.status(200).json(data);
  } catch (error) {
    console.log(
      "An error occured while getting sessions by page referrer",
      error.message
    );
    res.status(500).json({
      message: "An error occurred while getting sessions by page referrer",
      error: error.message,
    });
  }
});

router.get('/users-by-page-title', async (req, res) => {
  try {
    const offset = parseInt(req.query.offset);
    const startDate = req.query.start_date;
    const endDate = req.query.end_date;

    const data = await pagesService.getUsersByPageTitle(
      offset,
      startDate,
      endDate
    );

    res.status(200).json(data);
  } catch (error) {
    console.log(
      "An error occured while getting users by page title",
      error.message
    );
    res.status(500).json({
      message: "An error occurred while getting users by page title",
      error: error.message,
    });
  }
});

router.get('/views-by-page-location', async (req, res) => {
  try {
    const offset = parseInt(req.query.offset);
    const startDate = req.query.start_date;
    const endDate = req.query.end_date;

    const data = await pagesService.getViewsByPageLocation(
      offset,
      startDate,
      endDate
    );

    res.status(200).json(data);
  } catch (error) {
    console.log(
      "An error occured while getting views by page location",
      error.message
    );
    res.status(500).json({
      message: "An error occurred while getting views by page location",
      error: error.message,
    });
  }
});

module.exports = router;
