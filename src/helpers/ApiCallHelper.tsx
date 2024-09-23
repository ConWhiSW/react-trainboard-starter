import { fareReturnData, faresData, stationCall } from '../customTypes';

const lnerEndpoint = 'https://mobile-api-softwire2.lner.co.uk/v1/';

export const fetchStations = async () => {
    const response = await fetch('https://mobile-api-softwire2.lner.co.uk/v1/stations', {
        headers: {
            'X-API-KEY': `${process.env.REACT_APP_X_API_KEY}`,
        },
    });

    const responseData = await response.json();
    console.log(responseData);
    const output = responseData.stations;
    return output as stationCall[];
};

export const fetchRoutes = async (callData: faresData) => {
    const callEndpoint = lnerEndpoint + 'fares?originStation=' + callData.originStation + '&destinationStation='
        + callData.destinationStation + '&numberOfAdults=' + callData.numberOfAdults + '&numberOfChildren'
        + callData.numberOfChildren + '&journeyType=' + callData.journeyType + '&outboundDateTime='
        + callData.outboundDateTime + '&outboundIsArriveBy=' + callData.outboundIsArriveBy;

    const response = await fetch(callEndpoint, {
        method: 'GET',
        headers: {
            'X-API-KEY': `${process.env.REACT_APP_X_API_KEY}`,
        },
    });

    return (await response.json() as fareReturnData);
};