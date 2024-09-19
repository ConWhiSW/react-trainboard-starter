export type faresData = {
    originStation : string;
    destinationStation: string;
    numberOfAdults: string;
    numberOfChildren: string;
    journeyType: string;
    outboundDateTime: string;
    outboundIsArriveBy: string;
};

export type stationDetail = {
    displayName: string;
    nlc : string;
    crs: string;
};

export type journeyDetail = {
    originStation : stationDetail;
    destinationStation : stationDetail;
    departureTime: Date;
    arrivalTime: Date;
    status: string;
    journeyDurationInMinutes: number;
}

export type journeyLegType = {
    legId: string;
    rsid: string;
    origin: stationDetail;
    destination: stationDetail;
    type: string;
    mode: string;
    durationInMinutes: number;
    departureDateTime: string;
    arrivalDateTime: string;
    status: string;
    trainOperator: { code: string; name: string };
    trainFacilities: { name: string; code: string }[];
    additionalFacilitiesInformation: string;
    isAzuma: boolean;
    firstClassDiningOption: string;
    firstClassDiningOptionDetails: { name: string; description: string };
    iptisTripIdentifier: string;
}

export type breakdownType = {
    passenger: string;
    passengerStatus: string;
    ticketCount: number;
    costInPennies: number;
}

export type ticketType = {
    fareId: string;
    fareSignature: string;
    fareOriginLocationName: string;
    fareDestinationLocationName: string;
    fareSource: string;
    ftot: string;
    ticketOptionToken: string;
    ticketType: string;
    ticketClass: string;
    ticketCategory: string;
    name: string;
    description: string;
    priceInPennies: number;
    pricingItem: { subTotalInPennies: number; breakdown: breakdownType[] };
    numberOfTickets: number;
    quotaControlled: string;
    isValidForLoyaltyCredit: boolean;
    isValidForAdr: boolean;
    outboundValidity: string;
    inboundValidity: string;
    isFlexiAdvanceProduct: boolean;
    originFlexiWindowSize: number;
    isCheapestTicket: boolean;
    routeRestriction: { restrictionCode: string; restrictionDisplayName: string; restrictionPrintingName: string };
}

export type bulletinType = {
    id: number;
    title: string;
    description: string;
    category: string;
    severity: string;
    usingDefaultTitle: boolean;
}[]

export type stationMessageType = {
    stationMessageId: string;
    crsList: string[];
    severity: string;
    category: string;
    message: string;
}[]

export type journeyReturnType = {
    journeyOptionToken: string;
    journeyId: string;
    originStation: stationDetail;
    destinationStation: stationDetail;
    departureTime: string;
    arrivalTime: string;
    status: string;
    primaryTrainOperator: { code: string; name: string };
    legs: journeyLegType[];
    tickets: ticketType[];
    journeyDurationInMinutes: number;
    isFastestJourney: boolean;
    isOvertaken: boolean;
    bulletins: bulletinType;
    stationMessages: stationMessageType;
    isEligibleForLoyalty: boolean;
}

export type fareReturnData = {
    numberOfAdults: number;
    numberOfChildren: number;
    outboundJourneys: journeyReturnType[];
};