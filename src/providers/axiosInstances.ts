import axios, { Method } from 'axios';

import { axiosPromiseResult } from '../utils/common';

const GET = 'get';
const POST = 'post';
const PUT = 'put';
const PATCH = 'patch';
const DELETE = 'delete';

export const METHODS = { GET, POST, PUT, DELETE, PATCH };

export const comeTogetherAxios = axios.create({
  baseURL: 'http://1c29-87-228-188-34.ngrok.io',
});

export const request = (
  method: string,
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: any,
  withoutBase = false,
  headers = {}
) => {
  const cancelTokenSource = axios.CancelToken.source();
  headers = { ...headers }; //overwrite header with the Accept-Language before every request
  const config = {
    method: method as Method,
    url,
    cancelToken: cancelTokenSource.token,
    data: params,
    params: method === METHODS.GET ? params : undefined,
    headers,
  };

  const request = () =>
    withoutBase ? axiosPromiseResult(axios(config)) : axiosPromiseResult(comeTogetherAxios(config));
  return { request, cancelTokenSource };
};
export const setAxiosToken = (token: string): void => {
  const hasToken = token !== '';
  comeTogetherAxios.defaults.headers.common.Authorization = hasToken ? `Bearer${token}` : '';
};
