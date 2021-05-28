import { Button, Modal } from 'antd';
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { addAcceptedRes } from '../../actions/seatActions';


import { ISingleReservation } from '../../entities/reservations';
import { ISingleSeat } from '../../entities/seat';
import { IState } from '../../reducers';
import { IReservationReducers } from '../../reducers/reservationsReducers';
import { ISeatReducers } from '../../reducers/seatsReducers';
import { SeatMapPage } from './SeatMapPage';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 100vw;
`;
const BottomBar = styled.div`
    min-height: 10vh;
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;

    @media (max-width: 425px) {
        display: flex;
        flex-direction: column;
        width: 90vw;
        
        
    }
`;
const BottomBarItem = styled.div`
    display: flex;
    flex-direction: row;

    height: 100%;
    align-items: center;

    h1{
        font-size: 1.2rem;
    }
    margin-right: 6vw;
    @media (max-width: 425px) {
        display: flex;
        flex-direction: row;
        width: 90vw;
        margin: 1vh 0;
    }
        
`;

interface ISeatDisplay {
    background: string;
}
const SeatDisplay = styled.div<ISeatDisplay>`
    border: 1px solid black;

    margin: 0 1vw;

    width: 8vh;
    height: 8vh;

    @media (max-width: 425px) {
        width: 4vh;
        height: 4vh;
    }

    background-color:${props => props.background};
`;
const StyledButton = styled(Button)`

    font-size: 1.2rem;


    height: 8vh;
    width: 40vh;
    margin: 0 2vw 0 auto;

    @media (max-width: 425px) {
        height: 8vh;
        width: 100vw;
        margin: 0 0;
    }
`;

export const ReservationPage: FC = () => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(true);
    const [seatsList, setSeatsList] = useState<ISingleSeat[]>([]);
    const [res, setRes] = useState<ISingleReservation>();

    const [resSeatsLeft, setResSeatsLeft] = useState<number>(1);
    const [areSeatsUsed, setAreSeatsUsed] = useState<boolean>(false);

    const [reservedSeats, setReservedSeats] = useState<any[]>([]);

    const [error, setError] = useState<boolean>(false);

    const { seatList, reservation } = useSelector<IState, ISeatReducers & IReservationReducers>(globalState => ({
        ...globalState.seatList,
        ...globalState.reservation
    }));

    useEffect(() => {
        const fetchData = async () => {
            setSeatsList(seatList)
            setRes(reservation);
        }

        fetchData()
            .then(() => {
                setLoading(false);
            })
    }, [])

    useEffect(() => {
        resSeatsLeft > 0 ? setAreSeatsUsed(false) : setAreSeatsUsed(true);

    }, [resSeatsLeft])

    // Funkcja pozwalająca dodać wybrane miejca do store
    const sendReservation = () => {
        addAcceptedRes(reservedSeats, dispatch);
    }

    return (
        <Wrapper>
            {
                loading ?
                    <p>Loading</p>
                    :
                    <SeatMapPage
                        seatMap={seatsList}
                        reservation={res!}
                        setReservedSeats={setReservedSeats}
                        setResSeatsLeft={setResSeatsLeft}
                        
                    />

            }
            <BottomBar>
                <BottomBarItem>
                    <SeatDisplay background='transparent' />
                    <h1>
                        Miejsca dostępne
                    </h1>
                </BottomBarItem>
                <BottomBarItem>
                    <SeatDisplay background='#292929' />
                    <h1>
                        Miejsca zarezerwowane
                    </h1>
                </BottomBarItem>
                <BottomBarItem>
                    <SeatDisplay background='orange' />
                    <h1>
                        Twój wybór
                    </h1>
                </BottomBarItem>
                <Link to='/tickets'>
                    <StyledButton size='large' disabled={loading || !areSeatsUsed} onClick={() => { sendReservation() }}>Rezerwuj</StyledButton>

                </Link>
            </BottomBar>

        </Wrapper>
    )
}
