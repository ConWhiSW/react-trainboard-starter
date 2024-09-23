import { fareReturnData, faresData } from '../customTypes';

const lnerEndpoint = 'https://mobile-api-softwire2.lner.co.uk/v1/';

// Again don't want to use any type
interface ReadValues {
    done: boolean;
    value: any;
}

export const fetchStations = async () => {
    const response = await fetch('https://mobile-api-softwire2.lner.co.uk/v1/stations', {
        headers: {
            'X-API-KEY': `${process.env.REACT_APP_X_API_KEY}`,
        },
    });
    if (!response.body) {
        throw new Error('No response body');
    }
    const reader = response.body.getReader();

    // eslint-disable-next-line no-constant-condition
    const chunks: Uint8Array[] = [];
    let streamFinished = false;
    while (!streamFinished) {
        const { done, value } = await reader.read();
        if (done) {
            streamFinished = true;
        } else {
            chunks.push(value);
        }
    }

    // Concatenate all chunks into a single Uint8Array
    const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
    const concatenatedChunks = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
        concatenatedChunks.set(chunk, offset);
        offset += chunk.length;
    }

    // Convert Uint8Array to string (assuming UTF-8 encoding)
    const decoder = new TextDecoder('utf-8');
    const text = decoder.decode(concatenatedChunks);

    // Convert to
    const jsonOutput = JSON.parse(text);
    return jsonOutput;
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