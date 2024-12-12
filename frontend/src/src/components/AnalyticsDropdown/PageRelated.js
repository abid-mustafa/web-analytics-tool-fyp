import DynamicTable from '../DynamicTable';
import "./AnalyticsDropdown.css";

export default function PageRelated({ viewsByPageTitle, sessionsByPageReferrer, usersByPageTitle, viewsByPageLocation }) {
    return (
        <div className='analytics-related'>
            <DynamicTable title="Views by Page Title" data={viewsByPageTitle} />
            <DynamicTable title="Sessions by Page Referrer" data={sessionsByPageReferrer} />
            <DynamicTable title="Users by Page Title" data={usersByPageTitle} />
            <DynamicTable title="Views by Page Location" data={viewsByPageLocation} />
        </div>
    );
}
