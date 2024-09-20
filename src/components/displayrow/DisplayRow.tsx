import React from 'react';
import * as dfn from 'date-fns';
import { journeyDetail } from '../../customTypes';

type rowDetailType = {
    route : journeyDetail;
}

const minutesToHours = (minutes: number) => {
    const fullHours = Math.floor((minutes / 60));
    const remainingMinutes = minutes % 60;
    return fullHours + 'hr ' + remainingMinutes + 'min';
};

const DisplayRow = (route : rowDetailType) => {
    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <td>
                            {route.route.originStation.displayName}
                        </td>
                        <td>
                            {route.route.destinationStation.displayName}
                        </td>
                        <td>
                            {dfn.format(route.route.departureTime, 'dd/MM/yyyy HH:mm')}
                        </td>
                        <td>
                            {dfn.format(route.route.arrivalTime, 'dd/MM/yyyy HH:mm')}
                        </td>
                        <td>
                            {route.route.status}
                        </td>
                        <td>
                            {minutesToHours(route.route.journeyDurationInMinutes)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </>);
};

export default DisplayRow;