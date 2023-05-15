import Axios, { AxiosRequestConfig } from 'axios';

export async function getMetadata(url: string) {
  return Axios(url).then((r) => {
    console.log(r.data);
    r.data;
  });
}
