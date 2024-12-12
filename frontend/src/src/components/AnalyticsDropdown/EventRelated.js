import DynamicTable from '../DynamicTable';
import "./AnalyticsDropdown.css";

export default function EventRelated({ countByCategory, countByName, countByLabel, usersByEventName }) {
    return (
        <div className='analytics-related'>
            <DynamicTable title="Event Count by Event Category" data={countByCategory} />
            <DynamicTable title="Event Count by Event Name" data={countByName} />
            <DynamicTable title="Event Count by Event Label" data={countByLabel} />
            <DynamicTable title="Active Users by Event Name" data={usersByEventName} />
        </div>
    );
}
