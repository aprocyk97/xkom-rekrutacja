import { ISingleSeat } from '../../entities/seat';

export const GET_SEATS = 'GET_SEATS';

export const ADD_RESERVEDSEATS = 'ADD_RESERVEDSEATS';

export interface ISeatTypes {
    GET_SEATS: {
        seatList: ISingleSeat[];
    }
    ADD_RESERVEDSEATS: {
        reservedSeatList: ISingleSeat[];
    }
}