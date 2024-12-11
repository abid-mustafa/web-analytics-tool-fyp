(function () {
    const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
    const apiBaseUrl = `http://127.0.0.1:5000/api`;

    // Helper functions
    function generateUniqueId() {
        return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    }

    function generateUniqueVisitId() {
        const timestamp = Math.floor(Date.now() / 1000); // Current UNIX timestamp in seconds
        const randomPart = Math.floor(Math.random() * 1000); // Random number between 0-999
        const visitId = timestamp + randomPart; // Combine the two parts
        if (visitId > 2147483647) {
            return visitId % 2147483647; // Ensure it fits within the INT range
        }
        return visitId;
    }

    function getVisitorId() {
        let visitorId = localStorage.getItem('visitorId');
        if (!visitorId) {
            visitorId = generateUniqueId();
            localStorage.setItem('visitorId', visitorId);
        }
        return visitorId;
    }

    function getUserId() {
        let userId = localStorage.getItem('userId');
        if (!userId) {
            userId = generateUniqueId();
            localStorage.setItem('userId', userId);
        }
        return userId;
    }

    function getVisitId() {
        const now = Date.now();
        // 10 represents base-10 (decimal)
        const lastActivity = parseInt(localStorage.getItem('lastActivity') || '0', 10);

        if (!lastActivity || now - lastActivity > SESSION_TIMEOUT) {
            const newVisitId = generateUniqueVisitId();
            localStorage.setItem('visitId', newVisitId);
            return newVisitId;
        }

        return localStorage.getItem('visitId');
    }

    // Tracking functions
    async function sendTrackingData(endpoint, data) {
        await fetch(`${apiBaseUrl}/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).catch(error => console.error('Error sending tracking data:', error));
    }

    async function trackVisit() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            publicIP = data.ip;

            const visitor_id = getVisitorId();
            const visit_id = getVisitId();
            const user_id = getUserId();

            localStorage.setItem('lastActivity', Date.now().toString());

            const trackingData = {
                visit_id,
                visitor_id,
                user_id,
                referrer_url: document.referrer,
                publicIP
            }
            await sendTrackingData('tracking/track-visit', trackingData);
        } catch (error) {
            console.error('Error fetching IP:', error);
        }


    }

    async function trackPageView() {
        const visit_id = getVisitId();

        // Always executed on page load or when navigating to a new page
        // Send data to a 'pageview' endpoint
        const trackingData = {
            visit_id,
            page_title: document.title,
            page_url: document.URL
        };
        await sendTrackingData('tracking/track-pageview', trackingData);
    }

    async function trackEvent(event_category, event_action, event_name, event_value) {
        // Executed when specific events occur
        // Send data to an 'event' endpoint
        const visit_id = getVisitId();
        const page_title = document.title;
        const page_url = document.URL;

        const trackingData = { visit_id, event_category, event_action, event_name, event_value, page_title, page_url };
        await sendTrackingData('tracking/track-event', trackingData);
    }

    // Generalized function to attach event listeners
    async function attachEventListeners() {
        // Select all elements with the class 'track-event'
        document.querySelectorAll('.track-event').forEach(element => {
            // Get the event type from the 'data-event' attribute
            const eventType = element.getAttribute('data-event') || 'click';

            // Attach the appropriate event listener
            element.addEventListener(eventType, async function (event) {
                // Prevent default behavior for form submissions
                if (eventType === 'submit') {
                    event.preventDefault();
                }

                const category = element.getAttribute('data-category') || 'Default Category';
                const action = element.getAttribute('data-action') || eventType; // Use eventType as default action
                const name = element.getAttribute('data-name') || 'Unnamed Element';
                const value = element.getAttribute('data-value') || null;

                await trackEvent(category, action, name, value);
            });
        });
    }

    // Execute the tracking when the page is fully loaded
    window.addEventListener('load', async function () {
        try {
            // Ensure trackVisit completes before anything dependent on it
            await trackVisit();

            // Parallelize independent actions
            const pageViewPromise = trackPageView();
            const eventListenersPromise = attachEventListeners();

            await Promise.all([pageViewPromise, eventListenersPromise]); // Wait for both to complete
        } catch (error) {
            console.error("Error during tracking:", error);
        }
    });
})();