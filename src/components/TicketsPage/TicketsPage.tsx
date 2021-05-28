import React, { FC, useEffect } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { IState } from '../../reducers';
import { ISeatReducers } from '../../reducers/seatsReducers';


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;

    width: 100vw;
    height: 100vh;
    flex-wrap: wrap;

    
    justify-content: center;

    @media (max-width: 425px) {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        height: auto;
        width: 100vw;
    }
`;
const TicketWrapper = styled.div`
    display: flex;
    flex-direction: column;

    height: 40vh;
    width: 20vw;
    flex-wrap: wrap;
    
    @media (max-width: 425px) {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        height: auto;
        width: 100vw;
        align-items: center;
    }

    

    
`;
interface ITitle {
    fontSize: string;
    textAlign: string;
}

const Title = styled.h1<ITitle>`
    font-size: ${props => props.fontSize};
    margin-bottom: 2vh;

    text-align: ${props => props.textAlign};
`;

const Ticket = styled.div`
    display: flex;
    flex-direction: column;


    width: 20vw;
    height: 10vh;

    border: 2px solid gray;
    border-radius: 10px;

    margin: 1.5vh 1vw;

    @media (max-width: 425px) {
        display: flex;
        flex-direction: column;
        
        width: 90vw;
        height: 10vh;
    }
    


    div{
        display: flex;
        flex-direction: row;

        font-size: 1.5rem;
        justify-content: space-around;

        margin-top: 1vh;

    }
    h1{
        text-align: center;
        font-size: 1.5rem;
        margin: auto 0 1vh 0;
    }
`;

export const TicketsPage: FC = () => {

    const { reservedSeatList } = useSelector<IState, ISeatReducers>(globalState => globalState.reservedSeatList);

    useEffect(() => {
        console.log(reservedSeatList);
    }, [])


    return (

        <Wrapper>
            <Title textAlign='center' fontSize='2.5rem'>Twoja rezerwacja przebiegła pomyślnie!</Title>
            <Title textAlign='normal' fontSize='2rem'>Twoje bilety: </Title>
            <TicketWrapper>
            {
                reservedSeatList.map(item => {
                    return (
                        <Ticket>
                            <div>
                                <p>Rząd: {item.cords.y+1}</p>
                                <p>Miejsce: {item.cords.x+1}</p>
                            </div>
                            <h1>
                                {item.id}
                            </h1>

                        </Ticket>
                    )
                })
            }
            </TicketWrapper>
            <Title textAlign='center' fontSize='2rem'>Dziękujemy! W razie problemów prosimy o kontakt z działem administracji. </Title>
        </Wrapper>
    )
}
