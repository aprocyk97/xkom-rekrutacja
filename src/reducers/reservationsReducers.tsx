import {ISingleReservation} from '../entities/reservations';
import * as actionTypes from '../actions/actionTypes/reservationTypes';

export interface IReservationReducers {
    reservation: ISingleReservation;
    
}

const defaultState = (): IReservationReducers => ({
    reservation: {seatsNumber: 1, areSeatsAdjacent: false}
    
});

export default (state = defaultState(), action: any) => {
    switch(action.type) {
        case actionTypes.ADD_RESERVATION: {
            
            const payload: actionTypes.IReservationTypes['ADD_RESERVATION'] = action;
            return {
                ...state,
                reservation: payload.reservation
            }
        }

        default: {
            return state;
        }
    }
}