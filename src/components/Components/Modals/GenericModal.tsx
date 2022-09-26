import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import { getGenericModal } from '../../../redux/genericModal';
import ModalContent from './ModalContent';

const GenericModal: React.FC = () => {
  const modal = useSelector(getGenericModal, shallowEqual);
  return modal ? <ModalContent params={modal} /> : null;
};

export default GenericModal;
