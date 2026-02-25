import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageTitle = ({ title }) => {
    const location = useLocation();

    useEffect(() => {
        document.title = title ? `${title} | TripOS` : 'TripOS | AI-Powered Travel OS';
    }, [location, title]);

    return null;
};

export default PageTitle;
