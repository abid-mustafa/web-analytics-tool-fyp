const { getConnectionPool, getConnection } = require("../database");
const db = getConnectionPool();
let dbConnection;
getConnection().then((conn) => {
  dbConnection = conn;
});

BASE_URL = "http://127.0.0.1:5500/testing-website";

module.exports.insertEvent = async (
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
) => {
  page_url = `${BASE_URL}${encodeURIComponent(page_url)}`;

  try {
    await dbConnection.beginTransaction();

    const checkVisitQuery = `
        SELECT * FROM visits WHERE visit_id = ?;
      `;

    [visitExists] = await dbConnection.query(checkVisitQuery, [visit_id]);

    if (visitExists.length === 0) {
      // geo
      const insertGeoQuery = `
    INSERT INTO geo (city, country) 
    VALUES (?, ?) 
    ON DUPLICATE KEY UPDATE geo_id = LAST_INSERT_ID(geo_id);
    `;
      const [insertGeoResult] = await dbConnection.query(insertGeoQuery, [
        city,
        country,
      ]);
      const geo_id = insertGeoResult.insertId;

      // device
      const insertDeviceQuery = `
    INSERT INTO devices (device_category, browser, operating_system)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE device_id = LAST_INSERT_ID(device_id);
    `;

      await dbConnection.query(insertDeviceQuery, [
        device_category,
        browser,
        operating_system,
      ]);

      const [insertDeviceResult] = await dbConnection.query(insertDeviceQuery, [
        device_category,
        browser,
        operating_system,
      ]);
      const device_id = insertDeviceResult.insertId;

      // user
      const insertUserQuery = `
    INSERT INTO users (user_id, visitor_id, device_id, geo_id)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE user_id = VALUES(user_id);
`;
      await dbConnection.query(insertUserQuery, [
        user_id,
        visitor_id,
        device_id,
        geo_id,
      ]);

      // visit
      // Insert the new visit only if it doesn't already exist

      const insertVisitQuery = `
            INSERT INTO visits (visit_id, visitor_id, session_start, user_id, geo_id)
                VALUES (?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE 
                visitor_id = VALUES(visitor_id), 
                session_start = VALUES(session_start),
                user_id = VALUES(user_id),
                geo_id = VALUES(geo_id);
            `;

      await dbConnection.query(insertVisitQuery, [
        visit_id,
        visitor_id,
        session_start,
        user_id,
        geo_id,
      ]);
    }

    // page view + referral
    if (event_type === "PAGE") {
      if (referrer_url) {
        const insertReferralQuery = `
                INSERT INTO referrals (visit_id, referrer_url)
                VALUES (?, ?)
                `;

        const [result] = await dbConnection.query(insertReferralQuery, [
          visit_id,
          referrer_url,
        ]);
        const referral_id = result.insertId;

        const pageviewQuery = `
                INSERT INTO page_views (visit_id, page_url, page_title, referral_id, timestamp)
                VALUES (?, ?, ?, ?, ?)
                `;

        await dbConnection.query(pageviewQuery, [
          visit_id,
          page_url,
          page_title,
          referral_id,
          timestamp,
        ]);
      } else {
        const pageviewQuery = `
                INSERT INTO page_views (visit_id, page_url, page_title, timestamp)
                VALUES (?, ?, ?, ?)
                `;

        await dbConnection.query(pageviewQuery, [
          visit_id,
          page_url,
          page_title,
          timestamp,
        ]);
      }
    }
    // event
    else {
      const eventQuery = `
            INSERT INTO events (visit_id, event_category, event_name, event_action, page_url, page_title, timestamp)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `;

      await dbConnection.query(eventQuery, [
        visit_id,
        event_category,
        event_name,
        event_action,
        page_url,
        page_title,
        timestamp,
      ]);
    }

    await dbConnection.commit();

    return visitExists;
  } catch (error) {
    // Rollback transaction on error
    await dbConnection.rollback();
    throw error;
  }
};
