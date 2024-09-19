import { faresData } from '../customTypes';

const lnerEndpoint = 'https://mobile-api-softwire2.lner.co.uk/v1/';

export const fetchStations = () => {
    return fetch('https://mobile-api-softwire2.lner.co.uk/v1/stations', {
        headers: {
            'X-API-KEY': `${process.env.REACT_APP_X_API_KEY}`,
        },
    });
};

export const fetchRoutes = async (callData: faresData) => {
    const callEndpoint = lnerEndpoint + 'fares?originStation=' + callData.originStation + '&destinationStation='
        + callData.destinationStation + '&noChanges=' + callData.noChanges + '&numberOfAdults='
        + callData.numberOfAdults + '&numberOfChildren' + callData.numberOfChildren + '&journeyType='
        + callData.journeyType + '&outboundDateTime=' + callData.outboundDateTime + '&outboundIsArriveBy='
        + callData.outboundIsArriveBy;

    const response = await fetch(callEndpoint, {
        method: 'GET',
        headers: {
            'X-API-KEY': `${process.env.REACT_APP_X_API_KEY}`,
        },
    });

    return (await response.json());
};