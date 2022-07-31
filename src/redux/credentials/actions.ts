import { ThunkDispatchType } from '../../redux/utils';
import axios from 'axios';

export const getUseCredentialsAction = (userToken: string, stopLoading?: () => void) => {
  return async (dispatch: ThunkDispatchType): Promise<void> => {
    // https://api.mt.vsk.gr/
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };
    axios
      .get('https://api.mt.vsk.gr/issue-credential-2.0/records', { headers })
      .then((response) => {})
      .catch((error) => {
        console.log(error, 'to error');
      })
      .finally(() => stopLoading && stopLoading());
  };
};
