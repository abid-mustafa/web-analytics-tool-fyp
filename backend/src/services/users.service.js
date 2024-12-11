const { getConnectionPool } = require("../database");
const db = getConnectionPool();

// TODO: CHANGE SERVICE NAMES

module.exports.getUsersByCountry = async (
    offset,
    startDate,
    endDate
) => {
    try {
        const usersByCountryQuery = `
            SELECT
                g.country as Country, COUNT(u.visitor_id) AS Users
            FROM 
                visits as v
            JOIN 
                geo as g ON g.geo_id = v.geo_id
            JOIN
                users as u ON u.visitor_id = v.visitor_id 
            WHERE
                session_start >= ? AND session_start < ?
            GROUP BY 
                Country
            ORDER BY
                Users DESC
            LIMIT 5 OFFSET ?;
            `;

        [values] = await db.query(usersByCountryQuery, [
            startDate,
            endDate,
            offset
        ]);

        const getTotalQuery = `
        SELECT
            COUNT(u.visitor_id) as Total
        FROM 
            visits as v
        JOIN 
            geo as g ON g.geo_id = v.geo_id
        JOIN
            users as u ON u.visitor_id = v.visitor_id 
        WHERE
            session_start >= ? AND session_start < ?
          `;

        [[totalData]] = await db.query(getTotalQuery, [
            startDate,
            endDate
        ]);

        if (totalData.Total === 0) {
            return values;
        }

        values.push({ Country: "Total", Users: totalData.Total });
        return values;
    } catch (error) {
        throw error;
    }
}

module.exports.getUsersByCity = async (
    offset,
    startDate,
    endDate
) => {
    try {
        const usersByCityQuery = `
            SELECT
                g.city as City, COUNT(u.visitor_id) AS Users
            FROM 
                visits as v
            JOIN 
                geo as g ON g.geo_id = v.geo_id
            JOIN
                users as u ON u.visitor_id = v.visitor_id 
            WHERE
                session_start >= ? AND session_start < ?
            GROUP BY 
                City
            ORDER BY
                Users DESC
            LIMIT 5 OFFSET ?;
            `;

        [values] = await db.query(usersByCityQuery, [
            startDate,
            endDate,
            offset
        ]);

        const getTotalQuery = `
        SELECT
            COUNT(u.visitor_id) as Total
        FROM 
            visits as v
        JOIN 
            geo as g ON g.geo_id = v.geo_id
        JOIN
            users as u ON u.visitor_id = v.visitor_id 
        WHERE
            session_start >= ? AND session_start < ?
          `;

        [[totalData]] = await db.query(getTotalQuery, [
            startDate,
            endDate
        ]);

        if (totalData.Total === 0) {
            return values;
        }

        values.push({ City: "Total", Users: totalData.Total });
        return values;
    } catch (error) {
        throw error;
    }
}

module.exports.getUsersByDeviceType = async (
    offset,
    startDate,
    endDate
) => {
    try {
        const usersByDeviceTypeQuery = `
            SELECT
                d.device_category as \`Device Category\`, COUNT(u.visitor_id) AS Users
            FROM 
                users as u
            JOIN 
                devices as d ON d.device_id = u.device_id 
            JOIN 
                visits as v ON v.visitor_id = u.visitor_id 
            WHERE
                session_start >= ? AND session_start < ?
            GROUP BY 
                d.device_category
            ORDER BY
                Users DESC
            LIMIT 5 OFFSET ?;
            `;

        [values] = await db.query(usersByDeviceTypeQuery, [
            startDate,
            endDate,
            offset
        ]);

        const getTotalQuery = `
        SELECT
            COUNT(u.visitor_id) as Total
        FROM 
            users as u
        JOIN 
            devices as d ON d.device_id = u.device_id 
        JOIN 
            visits as v ON v.visitor_id = u.visitor_id 
        WHERE
            session_start >= ? AND session_start < ?
          `;

        [[totalData]] = await db.query(getTotalQuery, [
            startDate,
            endDate
        ]);

        if (totalData.Total === 0) {
            return values;
        }

        values.push({ 'Device Category': "Total", Users: totalData.Total });
        return values;
    } catch (error) {
        throw error;
    }
}

module.exports.getUsersByBrowser = async (
    offset,
    startDate,
    endDate
) => {
    try {
        const usersByBrowserQuery = `
            SELECT
                d.browser as Browser, COUNT(u.visitor_id) AS Users
            FROM 
                users as u
            JOIN 
                devices as d ON d.device_id = u.device_id 
            JOIN 
                visits as v ON v.visitor_id = u.visitor_id 
            WHERE
                session_start >= ? AND session_start < ?
            GROUP BY 
                d.browser
            ORDER BY
                Users DESC
            LIMIT 5 OFFSET ?;
            `;

        [values] = await db.query(usersByBrowserQuery, [
            startDate,
            endDate,
            offset
        ]);

        const getTotalQuery = `
        SELECT
            COUNT(u.visitor_id) as Total
        FROM 
            users as u
        JOIN 
            devices as d ON d.device_id = u.device_id 
        JOIN 
            visits as v ON v.visitor_id = u.visitor_id 
        WHERE
            session_start >= ? AND session_start < ?
          `;

        [[totalData]] = await db.query(getTotalQuery, [
            startDate,
            endDate
        ]);

        if (totalData.Total === 0) {
            return values;
        }

        values.push({ Browser: "Total", Users: totalData.Total });
        return values;
    } catch (error) {
        throw error;
    }
}

module.exports.getUsersByOperatingSystem = async (
    offset,
    startDate,
    endDate
) => {
    try {
        const usersByOperatingSystemQuery = `
            SELECT
                d.operating_system as \`Operating System\`, COUNT(u.visitor_id) AS Users
            FROM 
                users as u
            JOIN 
                devices as d ON d.device_id = u.device_id 
            JOIN 
                visits as v ON v.visitor_id = u.visitor_id 
            WHERE
                session_start >= ? AND session_start < ?
            GROUP BY 
                d.operating_system
            ORDER BY
                Users DESC
            LIMIT 5 OFFSET ?;
            `;

        [values] = await db.query(usersByOperatingSystemQuery, [
            startDate,
            endDate,
            offset
        ]);

        const getTotalQuery = `
        SELECT
            COUNT(u.visitor_id) as Total
        FROM 
            users as u
        JOIN 
            devices as d ON d.device_id = u.device_id 
        JOIN 
            visits as v ON v.visitor_id = u.visitor_id 
        WHERE
            session_start >= ? AND session_start < ?
          `;

        [[totalData]] = await db.query(getTotalQuery, [
            startDate,
            endDate
        ]);

        if (totalData.Total === 0) {
            return values;
        }

        values.push({ 'Operating System': "Total", Users: totalData.Total });
        return values;
    } catch (error) {
        throw error;
    }
}