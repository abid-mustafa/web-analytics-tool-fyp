import { format } from 'date-fns';
import EventRelated from '../components/AnalyticsDropdown/EventRelated';
import PageRelated from '../components/AnalyticsDropdown/PageRelated';
import UserRelated from '../components/AnalyticsDropdown/UserRelated';
import Sidebar from '../components/Sidebar';
import './globals.css';

const baseURL = "http://172.16.83.93:5000/api/";

async function fetchData(endpoint: string) {
    const res = await fetch(endpoint, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error(`Failed to fetch data from ${endpoint}`);
    }
    return res.json();
}

export default async function Home({ searchParams }: { searchParams: { from?: string; to?: string } }) {
    const fromDate = searchParams.from || '2024-10-01';
    const toDate = searchParams.to || '2024-10-02';

    // Fetch data based on dates
    const countByCategory = await fetchData(`${baseURL}events/event-count-by-event-category/?start_date=${fromDate}&end_date=${toDate}&offset=0`);
    const countByName = await fetchData(`${baseURL}events/event-count-by-event-name/?start_date=${fromDate}&end_date=${toDate}&offset=0`);
    const countByLabel = await fetchData(`${baseURL}events/event-count-by-event-label/?start_date=${fromDate}&end_date=${toDate}&offset=0`);
    const usersByEventName = await fetchData(`${baseURL}events/active-users-by-event-name/?start_date=${fromDate}&end_date=${toDate}&offset=0`);

    const viewsByPageTitle = await fetchData(`${baseURL}pages/views-by-page-title/?start_date=${fromDate}&end_date=${toDate}&offset=0`);
    const sessionsByPageReferrer = await fetchData(`${baseURL}pages/sessions-by-page-referrer/?start_date=${fromDate}&end_date=${toDate}&offset=0`);
    const usersByPageTitle = await fetchData(`${baseURL}pages/users-by-page-title/?start_date=${fromDate}&end_date=${toDate}&offset=0`);
    const viewsByPageLocation = await fetchData(`${baseURL}pages/views-by-page-location/?start_date=${fromDate}&end_date=${toDate}&offset=0`);

    const usersByCountry = await fetchData(`${baseURL}users/users-by-country/?start_date=${fromDate}&end_date=${toDate}&offset=0`);
    const usersByCity = await fetchData(`${baseURL}users/users-by-city/?start_date=${fromDate}&end_date=${toDate}&offset=0`);
    const usersByDeviceType = await fetchData(`${baseURL}users/users-by-device-type/?start_date=${fromDate}&end_date=${toDate}&offset=0`);
    const usersByBrowser = await fetchData(`${baseURL}users/users-by-browser/?start_date=${fromDate}&end_date=${toDate}&offset=0`);
    const usersByOperatingSystem = await fetchData(`${baseURL}users/users-by-operating-system/?start_date=${fromDate}&end_date=${toDate}&offset=0`);

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="content">
                <form method="GET" className="date-picker-form">
                    <label>
                        From:
                        <input type="date" name="from" defaultValue={fromDate} required />
                    </label>
                    <label>
                        To:
                        <input type="date" name="to" defaultValue={toDate} required />
                    </label>
                    <button type="submit">Apply</button>
                </form>
                <EventRelated
                    countByCategory={countByCategory}
                    countByName={countByName}
                    countByLabel={countByLabel}
                    usersByEventName={usersByEventName}
                />
                <PageRelated
                    viewsByPageTitle={viewsByPageTitle}
                    sessionsByPageReferrer={sessionsByPageReferrer}
                    usersByPageTitle={usersByPageTitle}
                    viewsByPageLocation={viewsByPageLocation}
                />
                <UserRelated
                    usersByCountry={usersByCountry}
                    usersByCity={usersByCity}
                    usersByDeviceType={usersByDeviceType}
                    usersByBrowser={usersByBrowser}
                    usersByOperatingSystem={usersByOperatingSystem}
                />
            </div>
        </div>
    );
}
