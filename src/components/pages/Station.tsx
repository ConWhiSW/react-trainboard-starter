import React, { useEffect, useState } from 'react';
import { faresData, journeyDetail, stationDetail } from '../../customTypes';
import { fetchRoutes } from '../../helpers/ApiCallHelper';
import { organiseResponse } from '../../helpers/HandleApiResponse';

const Station: React.FC = () => {

    const [response, setResponse] = useState<journeyDetail[] | string>('');

    // at the minute, this just prints the string of the API return to screen
    useEffect(() => {
        fetchRoutes(exampleApiRequest)
            .then((value) => {
                setResponse(organiseResponse(value));
            })
            .catch((err) => setResponse('API ERROR!!! ' + err));
    }, []);

    const exampleStations: stationDetail[] = [
        {
            displayName: 'Manchester Piccadilly',
            crs: 'MAN',
            nlc: '296800',
        },
        {
            displayName: 'London Kings Cross',
            crs: 'KGX',
            nlc: '612100',
        },
        {
            displayName: 'Cambridge',
            crs: 'CBG',
            nlc: '702200',
        },
        {
            displayName: 'Cambridge North',
            crs: 'CMB',
            nlc: '800100',
        },
        {
            displayName: 'Manchester Victoria',
            crs: 'MCV',
            nlc: '297000',
        },
    ];

    const exampleApiRequest: faresData = {
        originStation: 'KGX',
        destinationStation: 'LDS',
        numberOfAdults: '1',
        numberOfChildren: '0',
        journeyType: 'single',
        outboundDateTime: '2024-10-19T15%3A30%3A00.000%2B01%3A00',
        outboundIsArriveBy: 'false',
    };

    if (typeof (response) === 'string') {
        return (
            <div>
                {response}
            </div>
        );
    } else {
        return (
            <div>
                {response[0].originStation.displayName}
            </div>
        );
    }
};

export default Station;
