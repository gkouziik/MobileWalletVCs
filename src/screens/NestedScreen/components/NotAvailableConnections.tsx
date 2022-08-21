import React from 'react';
import {
  NoConnectionsText,
  NotAvailableConnectionsContainerView,
} from './NotAvailableConnections.style';

const NotAvailableConnections: React.FC = () => (
  <NotAvailableConnectionsContainerView>
    <NoConnectionsText style={{ textAlign: 'center' }} color="secondary">
      You have no Active Connections yet!
    </NoConnectionsText>
  </NotAvailableConnectionsContainerView>
);

export default NotAvailableConnections;
