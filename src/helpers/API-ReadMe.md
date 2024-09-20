## API Information

Use `import { fetchRoutes } from '<path>/ApiCallHelper` to import API calls - the function takes a parameter of type
`faresData` which is imported from `customTypes` (this might get renamed in future). `faresData` type is structured as:
```tsx
type faresData = {
    originStation : string;
    destinationStation: string;
    numberOfAdults: string;
    numberOfChildren: string;
    journeyType: string;
    outboundDateTime: string;
    outboundIsArriveBy: string;
};
```
where:
- `originStation` is the three-letter CRS code (can be found in `stationDetails.crs`)
- `destinationStation` is the three-letter CRS code (can be found in `stationDetails.crs`)
- `numberOfAdults` is a string containing the number of adults
- `numberOfChildren` ditto
- `journeyType` is `single` or `return`
- `outboundDateTime` is an ISO standard date and time string, for example from `date-fns.formatISO(Date)`
- `outboundIsArriveBy` is `true` or `false`

API function `fetchRoutes()` returns a response as type `fareReturnData`, which can be handed directly to the function
`organiseResponse` from the file `HandleApiResponse.tsx`. `organiseResponse` returns a type `journeyDetail[]`, where
`journeyDetail` is:
```tsx
type journeyDetail = {
    originStation: stationDetail;
    destinationStation: stationDetail;
    departureTime: Date;
    arrivalTime: Date;
    status: string;
    journeyDurationInMinutes: number;
}
```
where:
- `originStation` and `destinationStation` are of type `stationDetail` (see below)
- `departureTime` and `arrivalTime` are of type `Date` (recommend using `date-fns`)
- `status` is a string (usually `'normal'`)
- `journeyDurationInMinutes` is a `number`

## Other Types

```tsx
type stationDetail = {
    displayName: string;
    nlc : string;
    crs : string;
}
```
Type `stationDetail` contains the name of the station (e.g. 'London Kings Cross'), its NLC code (a number - which is
unused for our purposes) and its CRS code (e.g. 'KGX').

```tsx
type journeyReturnType = {
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
```
```tsx
export type fareReturnData = {
    numberOfAdults: number;
    numberOfChildren: number;
    outboundJourneys: journeyReturnType[];
};
```

Types `journeyReturnType` and `fareReturnData` are to handle the JSON response of the API call. Probably _shouldn't_ be used.

