import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components';
import { ISingleSeat } from '../../entities/seat';

interface ISeatWrapper {
    width: string;
    height: string;
    isEmpty: boolean;
    background: string;
}


const SeatWrapper = styled.div<ISeatWrapper>`
    width: ${props => props.width};
    height: ${props => props.height};

    margin: 0.5vh 0.5vw;
    /* width: 10vw;
    height: 10vh; */
    @media (max-width: 425px) {
        
        width: 3vh;
        height: 3vh;
        
    }

    border: ${props => props.isEmpty ? 'none' : '1px solid black'};
    background-color: ${props => props.background};
`;
interface ISeat {
    width: number;
    height: number;
    isEmpty: boolean;
    item?: any;
    choice?: boolean;
    setReservationLeft?: any;
    reservationsLeft?: number;
    setReservedSteat?: any;
    reservedSeats?: any[];
}

export const SingleSeat: FC<ISeat> = (props) => {

    const [choice, setChoice] = useState<boolean>(false);
    const [background, setBackground] = useState<string>('transparent');


    //TODO: PRZYGOTOWANIE DANYCH DO WYSŁANIA

    const updateSeatReservation = () => {
        props.setReservedSteat(props.reservedSeats?.filter(item => item != props.item))
    }

    const handleClick = () => {
        if (props.item?.reserved === false && props.isEmpty === false) {

            if (props.reservationsLeft! > 0) {

                choice ?
                    <>
                        {props.setReservationLeft((prevState: number) => ++prevState)}
                        {setChoice(!choice)}
                        {updateSeatReservation()}
                    </>
                    :
                    <>
                        {props.setReservationLeft((prevState: number) => --prevState)}
                        {setChoice(!choice)}
                        {props.setReservedSteat([...props.reservedSeats!, props.item])}
                    </>

            } else if (props.reservationsLeft === 0) {
                if (choice) {
                    props.setReservationLeft((prevState: number) => ++prevState)
                    { updateSeatReservation() }
                    setChoice(!choice);

                }
            }


        }

    }

    useEffect(() => {
        choice ?
            setBackground('orange')
            :
            setBackground('transparent');
    }, [choice])

    useEffect(() => {
        if(props.item != undefined){
            delete props.item?.choice;
        }
        if (props.item?.reserved) {
            setBackground('#292929');
        }
        if (props.choice) {
            setBackground('orange');
            setChoice(true);
            props.reservedSeats?.push(props.item);
            
        }
    }, [])




    return (

        <SeatWrapper
            height={Math.floor((100 / props.height)) - 1 + 'vh'}
            width={Math.floor((60 / props.width)) - 1 + 'vw'}
            isEmpty={props.isEmpty}
            background={background}
            onClick={handleClick}
        />

    )


}
