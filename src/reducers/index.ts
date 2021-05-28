import { combineReducers } from 'redux';

import reservation,  { IReservationReducers } from './reservationsReducers'
import seatList, { ISeatReducers } from './seatsReducers'
import reservedSeatList from './seatsReducers'

export default combineReducers({
    reservation,
    seatList,
    reservedSeatList
})

export interface IState {
    reservation: IReservationReducers;
    seatList: ISeatReducers;
    reservedSeatList: ISeatReducers;
}