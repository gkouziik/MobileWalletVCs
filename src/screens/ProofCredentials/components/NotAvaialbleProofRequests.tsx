import React from 'react';

import {
  NotAvailableProofRequestsContainerView,
  NoProofRequestsText,
} from './NotAvailableProofRequests.style';

const NotAvailableProofRequests: React.FC = () => (
  <NotAvailableProofRequestsContainerView>
    <NoProofRequestsText style={{ textAlign: 'center' }} color="secondary">
      You have no Proof Requests yet!
    </NoProofRequestsText>
  </NotAvailableProofRequestsContainerView>
);

export default NotAvailableProofRequests;
