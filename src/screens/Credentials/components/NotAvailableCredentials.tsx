import React from 'react';
import {
  NoConnectionsText,
  NotAvailableConnectionsContainerView,
} from './NotAvailableCredentials.style';

interface Props {
  isAccepted?: boolean;
}

const NotAvailableCredentials: React.FC<Props> = ({ isAccepted }) => (
  <NotAvailableConnectionsContainerView>
    <NoConnectionsText style={{ textAlign: 'center' }} color="secondary">
      {isAccepted ? 'You have no Accepted Requests yet!' : 'You have no Pending Requests yet!'}
    </NoConnectionsText>
  </NotAvailableConnectionsContainerView>
);

export default NotAvailableCredentials;
