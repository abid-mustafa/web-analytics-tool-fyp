const { getConnectionPool } = require("../database");
const db = getConnectionPool();

// TODO: CHANGE SERVICE NAMES

module.exports.getViewsByPageTitle = async (
  offset,
  startDate,
  endDate
) => {
  try {
    const viewsByPageTitleQuery = `
    SELECT
        page_title AS 'Page Title',
        COUNT(*) AS Views
    FROM 
        page_views
    WHERE
        timestamp >= ? AND timestamp < ?
    GROUP BY 
        page_title
    ORDER BY
        Views DESC
    LIMIT 5 OFFSET ?;
      `;

    [values] = await db.query(viewsByPageTitleQuery, [
      startDate,
      endDate,
      offset
    ]);

    const getTotalQuery = `
    SELECT
        COUNT(*) as total
    FROM
        page_views
    WHERE
        timestamp >= ? AND timestamp < ?
    `;

    [[totalData]] = await db.query(getTotalQuery, [
      startDate,
      endDate
    ]);

    const totalValue = {
      'Page Title': 'Total',
      'Views': totalData.total,
    }

    values.push(totalValue);
    return values;

  } catch (error) {
    throw error;
  }
}

module.exports.getSessionsByPageReferrer = async (
  offset,
  startDate,
  endDate
) => {
  try {
    const sessionsByPageReferrerQuery = `
    SELECT
        r.referrer_url AS 'Referrer URL',
        COUNT(DISTINCT v.visitor_id) AS 'Visits'
    FROM 
        referrals r
    JOIN
        visits v ON r.visit_id = v.visit_id
    WHERE
        session_start >= ? AND session_start < ?
    GROUP BY
        r.referrer_url
    ORDER BY
        Visits DESC
    LIMIT 5 OFFSET ?;
      `;

    [values] = await db.query(sessionsByPageReferrerQuery, [
      startDate,
      endDate,
      offset
    ]);

    const getTotalQuery = `
    SELECT
        COUNT(DISTINCT v.visitor_id) as total
    FROM 
        referrals r
    JOIN
        visits v ON r.visit_id = v.visit_id
    WHERE
        session_start >= ? AND session_start < ?
    `;

    [[totalData]] = await db.query(getTotalQuery, [
      startDate,
      endDate
    ]);

    const totalValue = {
      'Referrer URL': 'Total',
      'Visits': totalData.total,
    }

    values.push(totalValue);
    return values;

  } catch (error) {
    throw error;
  }
}

module.exports.getUsersByPageTitle = async (
  offset,
  startDate,
  endDate
) => {
  try {
    const usersByPageTitleQuery = `
    SELECT
        p.page_title AS 'Page Title',
        COUNT(DISTINCT v.visitor_id) AS 'Users'
    FROM 
        page_views as p
    JOIN
        visits as v ON p.visit_id = v.visit_id
    WHERE
        session_start >= ? AND session_start < ?
    GROUP BY
        p.page_title
    ORDER BY
        Users DESC
    LIMIT 5 OFFSET ?;
      `;

    [values] = await db.query(usersByPageTitleQuery, [
      startDate,
      endDate,
      offset
    ]);

    const getTotalQuery = `
    SELECT
        COUNT(DISTINCT v.visitor_id) AS total
    FROM 
        page_views as p
    JOIN
        visits as v ON p.visit_id = v.visit_id
    WHERE
        session_start >= ? AND session_start < ?
    `;

    [[totalData]] = await db.query(getTotalQuery, [
      startDate,
      endDate
    ]);

    const totalValue = {
      'Page Title': 'Total',
      'Users': totalData.total,
    }

    values.push(totalValue);
    return values;

  } catch (error) {
    throw error;
  }
}

module.exports.getViewsByPageLocation = async (
  offset,
  startDate,
  endDate
) => {
  try {
    const usersByPageUrlQuery = `
    SELECT
        page_url AS 'Page URL',
        COUNT(*) AS Views
    FROM 
        page_views
    WHERE
        timestamp >= ? AND timestamp < ?
    GROUP BY 
        page_url
    ORDER BY
        Views DESC
    LIMIT 5 OFFSET ?;
      `;

    [values] = await db.query(usersByPageUrlQuery, [
      startDate,
      endDate,
      offset
    ]);

    const getTotalQuery = `
    SELECT
        COUNT(*) AS total
    FROM 
        page_views
    WHERE
        timestamp >= ? AND timestamp < ?
    `;

    [[totalData]] = await db.query(getTotalQuery, [
      startDate,
      endDate
    ]);

    const totalValue = {
      'Page URL': 'Total',
      'Views': totalData.total,
    }

    values.push(totalValue);
    return values;

  } catch (error) {
    throw error;
  }
}