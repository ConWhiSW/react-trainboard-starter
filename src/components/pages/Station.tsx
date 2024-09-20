import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import './station.css';
import { faresData, journeyDetail, stationDetail } from '../../customTypes';
import { fetchRoutes } from '../../helpers/ApiCallHelper';
import { organiseResponse } from '../../helpers/HandleApiResponse';

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

    const minutesToHours = (minutes: number) => {
        const fullHours = Math.floor((minutes / 60));
        const remainingMinutes = minutes % 60;
        return String(fullHours).padStart(2,'0') + ':'
            + String(remainingMinutes).padStart(2, '0');
    };
    const exampleStations: stationDetail[] = [
        {
            displayName: '',
            crs: '',
            nlc: '',
        },
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

    const exampleApiRequest : faresData = {
        originStation : from!,
        destinationStation: to!,
        numberOfAdults: '1',
        numberOfChildren: '0',
        journeyType: 'single',
        outboundDateTime: '2024-10-19T15%3A30%3A00.000%2B01%3A00',
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
