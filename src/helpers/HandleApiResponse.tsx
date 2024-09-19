import { fareReturnData, journeyDetail } from '../customTypes';

export const organiseResponse = (response : fareReturnData) => {
    const numberOfJourneys = response.outboundJourneys.length;
    const prettyResponse : journeyDetail[] = [];
    
    for (let i = 0; i < numberOfJourneys; i++) {
        prettyResponse.push(
            {
                originStation : response.outboundJourneys[i].originStation,
                destinationStation : response.outboundJourneys[i].destinationStation,
                departureTime: new Date(response.outboundJourneys[i].departureTime),
                arrivalTime: new Date(response.outboundJourneys[i].arrivalTime),
                status: response.outboundJourneys[i].status,
                journeyDurationInMinutes: Number(response.outboundJourneys[i].journeyDurationInMinutes),
            });
    }

    return prettyResponse;
    
};