const express = require("express");
const router = express.Router();
const usersService = require("../services/users.service");

// TODO: CHANGE CONTROLLER NAMES

router.get("/users-by-country", async (req, res) => {
    try {
        const { offset, start_date: startDate, end_date: endDate } = req.query;

        if (!offset || !startDate || !endDate) {
            return res.status(400).json({ message: "Missing required parameters" });
        }

        const data = await usersService.getUsersByCountry(
            parseInt(offset, 10),
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
        const { offset, start_date: startDate, end_date: endDate } = req.query;

        if (!offset || !startDate || !endDate) {
            return res.status(400).json({ message: "Missing required parameters" });
        }

        const data = await usersService.getUsersByCity(
            parseInt(offset, 10),
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
        const { offset, start_date: startDate, end_date: endDate } = req.query;

        if (!offset || !startDate || !endDate) {
            return res.status(400).json({ message: "Missing required parameters" });
        }

        const data = await usersService.getUsersByDeviceType(
            parseInt(offset, 10),
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
        const { offset, start_date: startDate, end_date: endDate } = req.query;

        if (!offset || !startDate || !endDate) {
            return res.status(400).json({ message: "Missing required parameters" });
        }

        const data = await usersService.getUsersByBrowser(
            parseInt(offset, 10),
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
        const { offset, start_date: startDate, end_date: endDate } = req.query;

        if (!offset || !startDate || !endDate) {
            return res.status(400).json({ message: "Missing required parameters" });
        }

        const data = await usersService.getUsersByOperatingSystem(
            parseInt(offset, 10),
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