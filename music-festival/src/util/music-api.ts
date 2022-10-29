import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {MusicAPIType} from "../types/music-api-type";

export type MusicSuccessResponse = Array<MusicAPIType>;

class MusicAPI {
  axiosInstance: AxiosInstance;

  constructor() {
    const axiosConfig: AxiosRequestConfig = {
      baseURL: process.env.REACT_APP_MUSIC_API_URL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    this.axiosInstance = axios.create(axiosConfig);
  }

  getMusicList= async (): Promise<MusicSuccessResponse> => {
    try {
      const url = `/api/v1/music-festival/list`;
      const response = await this.axiosInstance.get<MusicSuccessResponse>(url);
      return response.data;
    } catch (error: any) {
      if (error.isAxiosError) {
        throw new Error(error.message);
      }
      throw error;
    }
  };
}

export default new MusicAPI();
