import React from 'react';
import {
  NoConnectionsText,
  NotAvailableConnectionsContainerView,
} from './NotAvailableCredentials.style';

const NotAvailableCredentials: React.FC = () => (
  <NotAvailableConnectionsContainerView>
    <NoConnectionsText style={{ textAlign: 'center' }} color="secondary">
      You have no Pending Requests yet!
    </NoConnectionsText>
  </NotAvailableConnectionsContainerView>
);

export default NotAvailableCredentials;
