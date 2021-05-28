import { ISingleReservation } from '../../entities/reservations';

export const ADD_RESERVATION = 'ADD_RESERVATION';


export interface IReservationTypes {
    ADD_RESERVATION: {
        reservation: ISingleReservation;
    }

    
}