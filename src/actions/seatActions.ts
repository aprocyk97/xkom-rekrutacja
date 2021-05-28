import { Dispatch } from 'redux';

import * as actionTypes from './actionTypes/seatTypes';
import { ISingleSeat } from '../entities/seat';

export const getSeats = (): Promise<ISingleSeat[]> => (async(dispatch: Dispatch) => {
    return await fetch('http://localhost:4000/seats')
        .then(respone => respone.json())
        .then((seatList: ISingleSeat[]) => {
            dispatch({
                type: actionTypes.GET_SEATS,
                seatList
            })
        })
}) as any;
export const addAcceptedRes = (reservedSeatList: ISingleSeat[], dispatch: Dispatch)  => {
    dispatch({
        type: actionTypes.ADD_RESERVEDSEATS,
        reservedSeatList: reservedSeatList
    })
};