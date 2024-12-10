const express = require("express");
const router = express.Router();
const usersService = require("../services/users.service");

// TODO: CHANGE CONTROLLER NAMES

router.get("/users-by-country", async (req, res) => {
    try {
        const offset = parseInt(req.query.offset);
        const startDate = req.query.start_date;
        const endDate = req.query.end_date;

        const data = await usersService.getUsersByCountry(
            offset,
            startDate,
            endDate
        );

        res.status(200).json(data);
    } catch (error) {
        console.log(
            `An error occured while getting users by country: ${error.message}`
        );
        res.status(500).json({
            message: "An error occurred while getting users by country",
            error: error.message,
        });
    }
});

router.get("/users-by-city", async (req, res) => {
    try {
        const offset = parseInt(req.query.offset);
        const startDate = req.query.start_date;
        const endDate = req.query.end_date;

        const data = await usersService.getUsersByCity(
            offset,
            startDate,
            endDate
        );

        res.status(200).json(data);
    } catch (error) {
        console.log(
            `An error occured while getting users by city: ${error.message}`
        );
        res.status(500).json({
            message: "An error occurred while getting users by city",
            error: error.message,
        });
    }
});

router.get("/users-by-device-type", async (req, res) => {
    try {
        const offset = parseInt(req.query.offset);
        const startDate = req.query.start_date;
        const endDate = req.query.end_date;

        const data = await usersService.getUsersByDeviceType(
            offset,
            startDate,
            endDate
        );

        res.status(200).json(data);
    } catch (error) {
        console.log(
            `An error occured while getting users by device type: ${error.message}`
        );
        res.status(500).json({
            message: "An error occurred while getting users by device type",
            error: error.message,
        });
    }
});

router.get("/users-by-browser", async (req, res) => {
    try {
        const offset = parseInt(req.query.offset);
        const startDate = req.query.start_date;
        const endDate = req.query.end_date;

        const data = await usersService.getUsersByBrowser(
            offset,
            startDate,
            endDate
        );

        res.status(200).json(data);
    } catch (error) {
        console.log(
            `An error occured while getting users by operating sytem: ${error.message}`
        );
        res.status(500).json({
            message: "An error occurred while getting users by operating sytem",
            error: error.message,
        });
    }
});

router.get("/users-by-operating-system", async (req, res) => {
    try {
        const offset = parseInt(req.query.offset);
        const startDate = req.query.start_date;
        const endDate = req.query.end_date;

        const data = await usersService.getUsersByOperatingSystem(
            offset,
            startDate,
            endDate
        );

        res.status(200).json(data);
    } catch (error) {
        console.log(
            `An error occured while getting users by operating sytem: ${error.message}`
        );
        res.status(500).json({
            message: "An error occurred while getting users by operating sytem",
            error: error.message,
        });
    }
});


module.exports = router