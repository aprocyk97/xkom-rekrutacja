import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { FormPage } from './components/FormPage/FormPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { addReservation } from './actions/reservationsActions';
import { useDispatch } from 'react-redux';
import { getSeats } from './actions/seatActions';
import { ReservationPage } from './components/SeatMapPage/ReservationPage';
import { TicketsPage } from './components/TicketsPage/TicketsPage';

const Wrapper = styled.div`
    max-height: 100vh;
`;

type GetSeats = ReturnType<typeof getSeats>

export const App: FC = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<GetSeats>(getSeats())
  }, [])

  return (
    <Wrapper>
      <Router>
        <Switch>
          <Route exact path='/'>
            <FormPage />
          </Route>
          <Route path='/seats'>
            <ReservationPage />
          </Route>
          <Route path='/tickets'>
            <TicketsPage />
          </Route>

        </Switch>
      </Router>


    </Wrapper>
  );
}

export default App;
