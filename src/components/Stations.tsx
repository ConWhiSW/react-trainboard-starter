import React, { useEffect, useState } from 'react';
import { faresData } from '../customTypes';
import { fetchRoutes } from '../helpers/ApiCallHelper';

const Stations: React.FC = () => {

    const [response, setResponse] = useState<string>();

    // at the minute, this just prints the string of the API return to screen
    useEffect(() => {
        fetchRoutes(apiRequest)
            .then((value) => {
                setResponse(JSON.stringify(value));
            })
            .catch((err) => console.log(err))
            .finally(() => console.log('finally'));
    }, []);

    console.log('hello world');

    const apiRequest : faresData = {
        originStation : 'TOD',
        destinationStation: 'LDS',
        noChanges: 'false',
        numberOfAdults: '1',
        numberOfChildren: '0',
        journeyType: 'single',
        outboundDateTime: '2024-10-19T15%3A30%3A00.000%2B01%3A00',
        outboundIsArriveBy: 'false',
    };

    return (
        <div>
            {response}
        </div>
    );
};

export default Stations;
