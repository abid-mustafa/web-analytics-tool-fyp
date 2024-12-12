import DynamicTable from '../DynamicTable';
import "./AnalyticsDropdown.css";

export default function UserRelated({ usersByCountry, usersByCity, usersByDeviceType, usersByBrowser, usersByOperatingSystem }) {
    return (
        <div className='analytics-related'>
            <DynamicTable title="Users by Country" data={usersByCountry} />
            <DynamicTable title="Users by City" data={usersByCity} />
            <DynamicTable title="Users by Device Type" data={usersByDeviceType} />
            <DynamicTable title="Users by Browser" data={usersByBrowser} />
            <DynamicTable title="Users by Operating System" data={usersByOperatingSystem} />
        </div>
    );
}
