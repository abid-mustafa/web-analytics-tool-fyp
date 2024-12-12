const { getConnectionPool } = require("../database");
const db = getConnectionPool();

// TODO: CHANGE SERVICE NAMES

// TODO: Change to Event Name - like this for now because of GA
module.exports.getCountByCategory = async (
  offset,
  startDate,
  endDate
) => {
  try {
    const countByCategoryQuery = `
    SELECT
        event_category AS 'Event Category', COUNT(*) AS \`Event Count\`
    FROM 
        events
    WHERE
        timestamp BETWEEN ? AND ?
    GROUP BY 
        event_category
    ORDER BY 
        \`Event Count\` DESC
    LIMIT 5 OFFSET ?;
    `;

    [values] = await db.query(countByCategoryQuery, [
      startDate,
      endDate,
      offset,
    ]);

    const getTotalQuery = `
    SELECT
        COUNT(*) as Total
    FROM
        events
    WHERE
        timestamp BETWEEN ? AND ?
    `;

    [[totalData]] = await db.query(getTotalQuery, [
      startDate,
      endDate,
    ]);

    if (totalData.Total === 0) {
      return values;
    }

    values.push({ 'Event Category': "Total", 'Event Count': totalData.Total });
    return values;
  } catch (error) {
    throw error;
  }
}

module.exports.getCountByName = async (
  offset,
  startDate,
  endDate
) => {
  try {
    const eventCountQuery = `
    SELECT
        event_action AS 'Event Name', COUNT(*) AS \`Event Count\`
    FROM 
        events
    WHERE
        timestamp BETWEEN ? AND ?
    GROUP BY 
        event_action
    ORDER BY 
        \`Event Count\` DESC
    LIMIT 5 OFFSET ?;
    `;

    [values] = await db.query(eventCountQuery, [
      startDate,
      endDate,
      offset,
    ]);

    const getTotalQuery = `
    SELECT
        COUNT(*) as Total
    FROM
        events
    WHERE
        timestamp BETWEEN ? AND ?
    `;

    [[totalData]] = await db.query(getTotalQuery, [
      startDate,
      endDate,
    ]);

    if (totalData.Total === 0) {
      return values;
    }

    values.push({ 'Event Name': "Total", 'Event Count': totalData.Total });
    return values;
  } catch (error) {
    throw error;
  }
};

// TODO: No need for WHERE event_name != - clause: here because of dataset 
module.exports.getCountByLabel = async (
  offset,
  startDate,
  endDate
) => {
  try {
    const countByLabelQuery = `
      SELECT
          event_name AS 'Event Label', COUNT(*) AS \`Event Count\`
      FROM 
          events
      WHERE
          (timestamp BETWEEN ? AND ?)  AND event_name != '-' 
      GROUP BY 
          event_name
      ORDER BY 
          \`Event Count\` DESC
      LIMIT 5 OFFSET ?;
      `;

    [values] = await db.query(countByLabelQuery, [
      startDate,
      endDate,
      offset,
    ]);

    const getTotalQuery = `
      SELECT
          COUNT(*) as Total
      FROM
          events
      WHERE
          timestamp BETWEEN ? AND ?  AND event_name != '-' 
      `;

    [[totalData]] = await db.query(getTotalQuery, [
      startDate,
      endDate,
    ]);

    if (totalData.Total === 0) {
      return values;
    }

    values.push({ 'Event Label': "Total", 'Event Count': totalData.Total });
    return values;
  } catch (error) {
    throw error;
  }
}

module.exports.getUsersByEventName = async (
  offset,
  startDate,
  endDate
) => {
  try {
    const usersByEventNameQuery = `
  SELECT
      e.event_action AS 'Event Name', COUNT(DISTINCT u.user_id) AS Users
  FROM 
      events as e
  JOIN
      visits as v on v.visit_id = e.visit_id
  JOIN
      users as u on u.visitor_id = v.visitor_id
  WHERE
      timestamp BETWEEN ? AND ?
  GROUP BY 
      event_action
  ORDER BY 
      Users DESC
  LIMIT 5 OFFSET ?;
  `;

    [values] = await db.query(usersByEventNameQuery, [
      startDate,
      endDate,
      offset,
    ]);

    const getTotalQuery = `
    SELECT
        COUNT(DISTINCT u.user_id) as Total
    FROM 
        events as e
    JOIN
        visits as v on v.visit_id = e.visit_id
    JOIN
        users as u on u.visitor_id = v.visitor_id
    WHERE
        timestamp BETWEEN ? AND ?
    `;

    [[totalData]] = await db.query(getTotalQuery, [
      startDate,
      endDate,
    ]);

    if (totalData.Total === 0) {
      return values;
    }

    values.push({ 'Event Name': "Total", Users: totalData.Total });
    return values;
  } catch (error) {
    throw error;
  }
}