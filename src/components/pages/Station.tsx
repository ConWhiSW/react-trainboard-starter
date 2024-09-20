import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format, formatISO } from 'date-fns';
import './station.css';
import { faresData, journeyDetail } from '../../customTypes';
import { fetchRoutes } from '../../helpers/ApiCallHelper';
import { organiseResponse } from '../../helpers/HandleApiResponse';

const Station: React.FC = () => {

    const { from, to, time } = useParams();
    const [response, setResponse] = useState<journeyDetail[] | string>('');

    useEffect(() => {
        fetchRoutes(exampleApiRequest)
            .then((value) => {
                setResponse(organiseResponse(value));
            })
            .catch((err) => setResponse('There has been an error whilst finding your route. Error: ' + err));
    }, []);

    const minutesToHours = (minutes: number) => {
        const fullHours = Math.floor((minutes / 60));
        const remainingMinutes = minutes % 60;
        return String(fullHours).padStart(2,'0') + ':'
            + String(remainingMinutes).padStart(2, '0');
    };

    const apiTimeConvert = (ISOTime: string) => {
        const apicolon = ISOTime.replace(/:/g, '%3A');
        return apicolon.replace(/\+/g, '%2B');
    };

    const exampleApiRequest : faresData = {
        originStation : from!,
        destinationStation: to!,
        numberOfAdults: '1',
        numberOfChildren: '0',
        journeyType: 'single',
        outboundDateTime: apiTimeConvert(formatISO(time!)),
        outboundIsArriveBy: 'false',
    };

    if (typeof(response) === 'string' && response !== '') {
        return (
            <div>
                <h3>
                    {response}
                </h3>
            </div>
        );
    } else if (response === '') {
        return (
            <div>
                <h1>
                    Searching for available routes...
                </h1>
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
                <table>
                    <thead>
                        <tr>
                            <th>From</th>
                            <th>To</th>
                            <th>Departure</th>
                            <th>Arrival</th>
                            <th>Status</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {response.map((route) => {
                            let status = route.status;
                            if (route.status == 'normal') {
                                status = 'On Time';
                            }
                            return (
                                <tr key={response.indexOf(route)}>
                                    <td>
                                        {route.originStation.displayName}
                                    </td>
                                    <td>
                                        {route.destinationStation.displayName}
                                    </td>
                                    <td>
                                        {format(route.departureTime, 'dd/MM/yyyy HH:mm')}
                                    </td>
                                    <td>
                                        {format(route.arrivalTime, 'dd/MM/yyyy HH:mm')}
                                    </td>
                                    <td>
                                        {status}
                                    </td>
                                    <td>
                                        {minutesToHours(route.journeyDurationInMinutes)}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
};

export default Station;
