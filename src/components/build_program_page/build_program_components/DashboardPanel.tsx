import * as React from 'react';

//Router:
import { useParams } from 'react-router-dom';

const DashboardPanel = () => {
    let { dashboardView } = useParams<{ dashboardView: string }>();
    console.log(dashboardView);
    return <div>{dashboardView || 'dashboard'}</div>;
};

export default DashboardPanel;
