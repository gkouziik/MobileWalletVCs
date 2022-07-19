import { AxiosPromise, AxiosResponse, AxiosError } from 'axios';

export const axiosPromiseResult = (axiosPromise: AxiosPromise): Promise<any> =>
  axiosPromise
    .then(({ data }: AxiosResponse) => data)
    .catch((error: AxiosError) => {
      throw error.response ? error.response.data : error;
    });
