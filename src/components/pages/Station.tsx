import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { faresData, journeyDetail, stationDetail } from '../../customTypes';
import { fetchRoutes } from '../../helpers/ApiCallHelper';
import { organiseResponse } from '../../helpers/HandleApiResponse';
import DisplayRow from '../displayrow/DisplayRow';

const Station: React.FC = () => {

    const { from, to } = useParams();
    const [response, setResponse] = useState<journeyDetail[] | string>('');

    useEffect(() => {
        fetchRoutes(exampleApiRequest)
            .then((value) => {
                setResponse(organiseResponse(value));
            })
            .catch((err) => setResponse('There has been an error whilst finding your route. Error: ' + err));
    }, []);

    const exampleApiRequest : faresData = {
        originStation : from!,
        destinationStation: to!,
        numberOfAdults: '1',
        numberOfChildren: '0',
        journeyType: 'single',
        outboundDateTime: '2024-10-19T15%3A30%3A00.000%2B01%3A00',
        outboundIsArriveBy: 'false',
    };

    if (typeof(response) === 'string') {
        return (
            <div>
                <h3>
                    {response}
                </h3>
            </div>
        );
    } else {
        return (
            <div>
                <h2>
                    Displaying available routes for: {' '}
                    {response[0].originStation.displayName}
                    {' to '}
                    {response[0].destinationStation.displayName}
                </h2>
                {response.map((route) => {return (<DisplayRow
                    key={response.indexOf(route)} route={route} />);})}
            </div>
        )
    }
};

export default Station;
