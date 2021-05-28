import { ISingleSeat } from '../entities/seat';
import * as actionTypes from '../actions/actionTypes/seatTypes';

export interface ISeatReducers {
    seatList: ISingleSeat[];
    reservedSeatList: ISingleSeat[];
}

const defaultState = (): ISeatReducers => ({
    seatList: [],
    reservedSeatList: []
})

export default (state = defaultState(), action: any) => {
    switch (action.type) {
        case actionTypes.GET_SEATS: {
            const payload: actionTypes.ISeatTypes['GET_SEATS'] = action;
            return {
                ...state,
                seatList: payload.seatList
            }
        }
        case actionTypes.ADD_RESERVEDSEATS : {
            const payload: actionTypes.ISeatTypes['ADD_RESERVEDSEATS'] = action;
            return {
                ...state,
                reservedSeatList: payload.reservedSeatList
            }
        }

        default: {
            return state;
        }
    }
}