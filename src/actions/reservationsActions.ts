import { Dispatch } from 'redux';
import *  as actionTypes from './actionTypes/reservationTypes'

import { ISingleReservation } from '../entities/reservations';


export const addReservation = (reservation: ISingleReservation) => ((dispatch: Dispatch) => {

    dispatch({
        type: actionTypes.ADD_RESERVATION,
        reservation: reservation
    })
}) as any;

export const addRes = (reservation: ISingleReservation, dispatch: Dispatch)  => {
    dispatch({
        type: actionTypes.ADD_RESERVATION,
        reservation: reservation
    })
};
