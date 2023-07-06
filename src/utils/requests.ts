import Axios, { AxiosRequestConfig } from 'axios';

export async function getMetadata(url: string): Promise<any> {
  return Axios(url).then((r) => r.data);
}
