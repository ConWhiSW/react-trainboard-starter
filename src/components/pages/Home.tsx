import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DateTimePicker } from '@mui/x-date-pickers';
import { addMinutes, format, formatISO } from 'date-fns';
import './home.css';
import { stationDetail } from '../../customTypes';
import Dropdown from '../dropdown/Dropdown';

const Home = () => {

    enum timeMode {
        E_DEPART_TIME,
        E_ARRIVE_TIME,
    }

    const exampleStations : stationDetail[] = [
        {
            displayName: '',
            crs: '',
            nlc: '',
        },
        {
            displayName : 'Manchester Piccadilly',
            crs: 'MAN',
            nlc : '296800',
        },
        {
            displayName : 'London Kings Cross',
            crs: 'KGX',
            nlc : '612100',
        },
        {
            displayName : 'Cambridge',
            crs: 'CBG',
            nlc : '702200',
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

    return (<div className='page'>
        <h1>Welcome To SoftTrainBoardWire. Select stations to get started!</h1>
        <form>
            <h3>From</h3>
            <Dropdown bottomOptions={exampleStations}
                placeholder="Select Station"
                value={from}
                setValue={setFrom} />
            <h3>To</h3>
            <Dropdown bottomOptions={exampleStations}
                placeholder="Select Station"
                value={to}
                setValue={setTo} />
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
                onChange={(newTime) => setTime(newTime!)}
                views={['year', 'day', 'hours', 'minutes']}
                ampm={false}
                disablePast={true}

            />
            <br />
            <Link className="main-button" to={'/Station/' + from + '/'
                + to + '/' + formatISO(time) + '/' + departArriveTime }>
                <div>
                    <h3>Find Available Routes</h3>
                </div>
            </Link>
        </form>

    </div>);
};

export default Home;