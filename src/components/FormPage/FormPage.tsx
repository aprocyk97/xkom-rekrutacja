import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components';

import { InputNumber } from 'antd';
import { Checkbox } from 'antd';
import { Button } from 'antd';
import 'antd/dist/antd.css';

import { ISingleReservation } from '../../entities/reservations';
import { addRes } from '../../actions/reservationsActions';
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';



const Wrapper = styled.div`
    display: flex;
    flex-direction: column;

    margin: 40vh 35vw;
    padding: 4vh 2vw;

    border: 2px solid blue;
    border-radius: 5px;

    @media (max-width: 425px) {
        display: flex;
        flex-direction: column;


        width: 100vw;
        
        align-items: center;
        justify-items: center;
        padding: 1vh 1vw;
        margin: 40vh 0;

        border: none;
    }
    @media (max-width: 425px) {
        
    }
`;
const StyledButton = styled(Button)`
    
    @media (max-width: 425px) {
        
        width: 90vw;
        height: 10vh;
        font-size: 1.7rem;
    }
`;
const InputLabel = styled.label`
    display: flex;
    flex-direction: row;

    margin-bottom: 4vh;

    justify-content: center;

    p{
        margin: 0 4vw 0 -1vw;
        font-size: 1.2rem;
        
    }
    .numberInput{

    }
    .checkbox{
        font-size: 1rem;
        display: flex;
        div{
            font-size: 1.1rem;
            margin-left: 1vw;
        }
        
    }

    @media (max-width: 425px) {

        width: 100vw;
        p{
            font-size: 2rem;
            margin-top: 0.5vh;
        }

        .numberInput{
            
            font-size: 2rem;
            
        }
        .checkbox{
        font-size: 1rem;
        display: flex;
        
        div{
            font-size: 1.2rem;
            margin-left: 1vw;
        }
        
    }
    }
`;

export const FormPage: FC = () => {

    const dispatch = useDispatch();

    const [disabled, setDisabled] = useState<boolean>(false);

    const [seatsNumber, setSeatsNumber] = useState<number>(1);
    const [areSeatsAdjacent, setAreSeatsAdjacent] = useState<boolean>(false);

    const [reservationItem, setReservtaionItem] = useState<ISingleReservation>({ seatsNumber: seatsNumber, areSeatsAdjacent: areSeatsAdjacent });

    const onNumberChange = (e: number) => {

        setSeatsNumber(e);
        setReservtaionItem({ ...reservationItem, seatsNumber: e });


    }

    const onCheckboxChange = (e: any) => {
        setAreSeatsAdjacent(e.target.checked);
        setReservtaionItem({ ...reservationItem, areSeatsAdjacent: e.target.checked });
    }

    const handleSubmit = () => {
        addRes(reservationItem, dispatch);
    }
    useEffect(() => {

        if (reservationItem.seatsNumber === null) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [reservationItem])

    return (
        <Wrapper>
            <InputLabel>
                <p>Liczba miejsc: </p>
                <InputNumber
                    min={1}
                    max={8}
                    value={seatsNumber}
                    onChange={e => onNumberChange(e)}
                    className='numberInput'
                />

            </InputLabel>
            <InputLabel>
                <Checkbox
                    checked={areSeatsAdjacent}
                    onChange={e => { onCheckboxChange(e) }}
                    className='checkbox'

                >
                    <div>
                        Czy miejsca mają być obok siebie?
                    </div>
                </Checkbox>


            </InputLabel>
            <Link to='/seats' >
                <StyledButton block onClick={() => handleSubmit()} disabled={disabled}>Wybierz miejsca</StyledButton>

            </Link>

        </Wrapper>
    )
}
