import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { addMinutes, formatISO } from 'date-fns';
import './home.css';
import { stationCall, stationDetail } from '../../customTypes';
import { fetchStations } from '../../helpers/ApiCallHelper';
import Dropdown from '../dropdown/Dropdown';

const Home = () => {

    enum timeMode {
        E_DEPART_TIME,
        E_ARRIVE_TIME,
    }

    const [stations, setStations] = useState<stationCall[]>([]);

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

    const [from, setFrom] = useState<string>('');
    const [to, setTo] = useState<string>('');
    const [departArriveTime, setDepartArriveTime] = useState<timeMode>(timeMode.E_DEPART_TIME);
    const [time, setTime] = useState<Date>(addMinutes(new Date(), 1));
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);
    const [gotLocation, setGotLocation] = useState<boolean>(false);
    const [locationError, setLocationError] = useState<string>('');

    useEffect(() => {
        if (!navigator.geolocation) {
            setLocationError('Geolocation is not supported by this browser.');
            return;
        }

        const handleSuccess = (position : GeolocationPosition) => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
            setGotLocation(true);
        };

        const handleError = (error : any) => {
            setLocationError(error.message);
        };

        navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    }, []);

    const fromNearest = () => {
        if (!gotLocation) {
            setLocationError('Could not find location.');
        } else {
            setFrom(getNearestStation());
        }
    };

    const toNearest = () => {
        if (!gotLocation) {
            setLocationError('Could not find location.');
        } else {
            setTo(getNearestStation());
        }
    };

    const getNearestStation = () => {
        const nearestStation = stations.reduce((a,b) => haversine(latitude,longitude,a.latitude,a.longitude) < haversine(latitude,longitude,b.latitude,b.longitude) ? a : b);
        return nearestStation.name;
    };

    const haversine = (lat1: number, long1: number, lat2: number, long2: number) => {
        const EARTH_RADIUS = 6371000;
        const lat1rad = lat1 * Math.PI/180;
        const lat2rad = lat2 * Math.PI/180;
        const long1rad = long1 * Math.PI/180;
        const long2rad = long2 * Math.PI/180;

        const stepOne = (1 - Math.cos(lat1rad-lat2rad))/2 + Math.cos(lat1rad)*Math.cos(lat2rad)*(1-Math.cos(long1rad - long2rad));
        const stepTwo = 2 * Math.atan2(Math.sqrt(stepOne), Math.sqrt(1-stepOne));

        return EARTH_RADIUS * stepTwo;
    };

    useEffect(() => {
        const stations = async () => {
            try {
                const response = await fetchStations();
                setStations(response);
            } catch (error: any) {
                console.log(error.message);
            }
        };
        stations();
    }, []);

    return (
        <div className='page'>
            <h1>Welcome To SoftTrainBoardWire. Select stations to get started!</h1>
            <form>
                <h3>From</h3>
                <Dropdown bottomOptions={exampleStations}
                    placeholder="Select Station"
                    value={from}
                    setValue={setFrom} />
                <br />
                <Button variant="contained" onClick={() => fromNearest()}>
                    Set from Nearest Station
                </Button>
                <h3>To</h3>
                <Dropdown bottomOptions={exampleStations}
                    placeholder="Select Station"
                    value={to}
                    setValue={setTo} />
                <br />
                <Button variant="contained" onClick={() => toNearest()}>
                    Set to Nearest Station
                </Button>
                <br />
                {locationError}
                <br />
                <label>
                    <input
                        type="radio"
                        name="timeMode"
                        value={timeMode.E_DEPART_TIME}
                        checked={departArriveTime === timeMode.E_DEPART_TIME}
                        onChange={(e) => setDepartArriveTime(Number(e.target.value))}
                        className="radioSelector"
                    />
                    Depart After
                </label>
                <label>
                    <input
                        type="radio"
                        name="timeMode"
                        value={timeMode.E_ARRIVE_TIME}
                        checked={departArriveTime === timeMode.E_ARRIVE_TIME}
                        onChange={(e) => setDepartArriveTime(Number(e.target.value))}
                        className="radioSelector"
                    />
                    Arrive By
                </label>
                <br />
                <br />
                <DateTimePicker
                    label={departArriveTime === timeMode.E_DEPART_TIME ? 'Depart After' : 'Arrive By'}
                    defaultValue={addMinutes(new Date(), 1)}
                    value={time}
                    onChange={(newTime) => setTime(newTime === null ? new Date() : newTime)}
                    views={['year', 'day', 'hours', 'minutes']}
                    ampm={false}
                    disablePast={true}

                />
                <br />
                <Link className="main-button" to={'/Station/' + from + '/'
                    + to + '/' + formatISO(time) + '/' + departArriveTime}>
                    <div>
                        <h3>Find Available Routes</h3>
                    </div>
                </Link>
            </form>

        </div>);
};

export default Home;