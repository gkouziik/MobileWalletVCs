import { AxiosPromise, AxiosResponse, AxiosError } from 'axios';

export const axiosPromiseResult = (axiosPromise: AxiosPromise): Promise<any> =>
  axiosPromise
    .then(({ data }: AxiosResponse) => data)
    .catch((error: AxiosError) => {
      console.log(error, 'mesa edw sto axios promise result');
      throw error.response ? error.response.data : error;
    });
