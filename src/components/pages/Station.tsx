import React, { useEffect, useState } from 'react';
import { faresData } from '../../customTypes';
import { fetchRoutes } from '../../helpers/ApiCallHelper';

const Station: React.FC = () => {

    const [response, setResponse] = useState<string>();

    // at the minute, this just prints the string of the API return to screen
    useEffect(() => {
        fetchRoutes(exampleApiRequest)
            .then((value) => {
                setResponse(JSON.stringify(value));
            })
            .catch((err) => setResponse('API ERROR!!! ' + err));
    }, []);

    const exampleApiRequest : faresData = {
        originStation : 'TOD',
        destinationStation: 'LDS',
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

export default Station;
