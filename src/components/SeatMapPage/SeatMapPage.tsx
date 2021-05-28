import React, { FC, useEffect, useState } from 'react'

import styled from 'styled-components'

import { ISingleSeat } from '../../entities/seat';

import { SingleSeat } from './SingleSeat';


import { ISingleReservation } from '../../entities/reservations';
import { Modal } from 'antd';
import { useHistory } from 'react-router-dom';



const SeatMap = styled.div`
    min-height: 90vh;
    width: 100%;

    display: flex;
    flex-direction: row;

    justify-content: center;

    @media (max-width: 425px) {
        width: 100vw;
        min-height: auto;
    }

    
`;

const SeatMapColumn = styled.div`
    display: flex;
    flex-direction: column;
`;


interface ISeatMap {
    seatMap: ISingleSeat[];
    reservation: ISingleReservation;
    setReservedSeats: any;
    setResSeatsLeft: any;
}

export const SeatMapPage: FC<ISeatMap> = (props) => {


    const [error, setError] = useState<boolean>();

    const [loading, setLoading] = useState<boolean>(true);

    const [reservationsLeft, setReservationsLeft] = useState<number>(props.reservation.seatsNumber);

    const [reservedSeats, setReservedSeats] = useState<any[]>([]);

    const [seatSuggestionList, setSeatSuggestionList] = useState<any[][]>([]);





    useEffect(() => {
        if (props.seatMap.length === 0) {
            setError(true);
        } else {
            seatSuggestion(mapGenerator(props.seatMap));
        }

        setLoading(false);

    }, [])

    useEffect(() => {
        props.setResSeatsLeft(reservationsLeft);
    }, [reservationsLeft])


    useEffect(() => {
        props.setReservedSeats(reservedSeats);
    }, [reservedSeats])

    // Funkcja generująca mapę siedzen w 2 wymiarowej tablicy
    // Przejścia zawierają wartośc '', a siedzenia zarezerowane bądź wole mają za wartośc obiekt
    const mapGenerator = (arr: ISingleSeat[]) => {

        const size = mapSize(props.seatMap);

        const seatMap: any[][] = [];

        for (let x = 0; x < size.mapWidth; x++) {

            const column: any[] = [];

            for (let y = 0; y < size.mapHeight; y++) {
                column.push('');
            }
            seatMap.push(column);

        }

        arr.map(item => {
            seatMap[item.cords.x][item.cords.y] = { ...item, choice: false };

        })


        return seatMap;
        // setGenMap(seatMap);
    }


    // Funkcja generująca tablice zawierające sugerowane miejsca
    // Przeszukuje tablice w poszukiwaniu odpowiedniej ilości miejsc wolnych koło siebie
    const seatSuggestion = (arr: any[][]) => {
        const tempArr = arr;
        console.log(tempArr);
        const size = mapSize(props.seatMap);

        let list: any[][] = [];
        if (props.reservation.areSeatsAdjacent) {
            list = pickAdjacentSeats(tempArr, size.mapHeight, size.mapWidth);
        }
        else {
            list.push(pickRandomSeats(arr, size.mapWidth, size.mapHeight));
        }
        setSeatSuggestionList(applySuggestedSeats(arr, list));


    }

    const pickAdjacentSeats = (arr: any[][], mapHeight: number, mapWidth: number) => {

        let list: any[][] = [];

        for (let y = 0; y < mapHeight; y++) {
            let seatCounter = 0;

            for (let x = 0; x < mapWidth; x++) {



                if (arr[x][y] === '') {
                    seatCounter = 0;
                    continue;
                }
                if (arr[x][y].reserved === false) {
                    ++seatCounter;
                }
                if (seatCounter === props.reservation.seatsNumber) {
                    let suggestions: any[] = [];

                    //Kiedy uda nam się znaleźć miejsce dodajemy poprzednio sprawdzone miejsca do tablicy
                    // po czym następnie tablica ta zostaje umieszczona w kolejnej jako jeden z możliwych wyborów miejsc
                    for (let i = 0; i <= props.reservation.seatsNumber - 1; i++) {
                        suggestions.push({ x: x - i, y: y })
                    }
                    list.push(suggestions);

                    seatCounter = 0;
                    // Przewijamy pętle o ilośc miejsc w rezerwacji + 1, aby móc znaleźć więcej możliwych wyborów miejsc
                    x = x - props.reservation.seatsNumber + 1;
                    continue;
                }


                if (arr[x][y].reserved === true) {
                    seatCounter = 0;
                    continue;
                }

            }
        }
        return list;
    }

    const pickRandomSeats = (arr: any[][], xmax: number, ymax: number) => {
        let picksLeft: number = props.reservation.seatsNumber;
        let suggestion: any[] = [];

        while (picksLeft > 0) {

            let x = Math.floor(Math.random() * xmax);
            let y = Math.floor(Math.random() * ymax);
            const sugg = { x: x, y: y };

            if (arr[x][y] === '' || arr[x][y].reserved === true || suggestion.includes(sugg)) {
                continue;
            } else {

                suggestion.push(sugg);
                picksLeft--;

            }

        }
        return suggestion;
    }

    // Funkcja ustalająca wielkośc tablicy na podstawie maksymalnych koordynatów miejsc
    const mapSize = (arr: ISingleSeat[]) => {

        let maxHeight: number = 0;
        let maxWidht: number = 0;

        arr.map(item => {

            if (item.cords.x > maxWidht) {
                maxWidht = item.cords.x;
            }

            if (item.cords.y > maxHeight) {
                maxHeight = item.cords.y
            }
        })
        return { mapWidth: maxWidht + 1, mapHeight: maxHeight + 1 }

    }

    // Funkcja nanosząca jedną losowo wybraną mozliwośc na tablicę i wysyłająca ją dalej
    const applySuggestedSeats = (arr: any[][], seatSuggestionList: any[][]) => {
        let randomSuggestion = Math.floor(Math.random() * seatSuggestionList.length);
        let suggestionArr = arr;



        seatSuggestionList[randomSuggestion].map(item => {

            suggestionArr[item.x][item.y].choice = true;
        })
        setReservationsLeft(0);


        return suggestionArr;



    }


    const seatGen = (arr: any[][]) => {
        const size = mapSize(props.seatMap);


        return arr.map(column => {
            return (
                <SeatMapColumn>
                    {
                        column.map(seat => {

                            return (

                                seat === '' ?
                                    <SingleSeat
                                        width={size.mapWidth}
                                        height={size.mapHeight}
                                        isEmpty={true}
                                    />
                                    :
                                    <>

                                        <SingleSeat
                                            width={size.mapWidth}
                                            height={size.mapHeight}
                                            isEmpty={false}
                                            item={seat}
                                            choice={seat.choice}
                                            reservationsLeft={reservationsLeft}
                                            setReservationLeft={setReservationsLeft}
                                            setReservedSteat={setReservedSeats}
                                            reservedSeats={reservedSeats}
                                        />

                                    </>

                            )
                        })
                    }
                </SeatMapColumn>
            )
        })
    }

    const history = useHistory();

    const routeChange = () => {
        let path = `/`;
        history.push(path);
    }

    return (
        <>
            {
                loading ?
                    <SeatMap>
                        ...Loading
                    </SeatMap>
                    :
                    <>
                        {
                            error ?
                                <SeatMap>

                                    <Modal
                                        wrapClassName='error'
                                        title="Błąd!"
                                        visible={true}
                                        onOk={routeChange}
                                        closable={false}
                                        cancelButtonProps={{ hidden: true }}
                                    >
                                        <p>Wystąpił błąd podczas pobierania danych z serwera!</p>
                                        <p>Przycisk skieruje Cie do Strony Głównej.</p>
                                    </Modal>
                                </SeatMap>
                                :
                                <SeatMap>

                                    {
                                        seatGen(seatSuggestionList)
                                    }

                                </SeatMap>

                        }
                    </>
            }

        </>

    )
}
