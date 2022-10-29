import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import MusicAPI, { MusicSuccessResponse } from '../util/music-api';

import { AppThunk } from '../util/store';

type InitialState = {
  hasError?: boolean;
  errorMessage?: string | null;
  musicFestival: MusicSuccessResponse;
};

export const initialState: InitialState = {
  hasError: false,
  errorMessage: null,
  musicFestival: [
    {
      name: '',
      bands: [],
    },
  ],
};

const MusicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    getMusicBegin: (state) => {
      return {
        ...state,
        hasErrors: false,
      };
    },

    getMusicSuccess: (state, action: PayloadAction<MusicSuccessResponse>) => {
      return {
        ...state,
        musicFestival: action.payload,
        hasErrors: true,
      };
    },

    getMusicFailure: (state, action: PayloadAction<{ errorMessage: string }>) => {
      return {
        ...state,
        hasErrors: true,
        errorMessage: action.payload.errorMessage,
      };
    },
  },
});

const { getMusicBegin, getMusicSuccess, getMusicFailure } = MusicSlice.actions;
export default MusicSlice.reducer;

// Thunks to show the list of music list

export const displayMusicFestival = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getMusicBegin());

    const fetchMusicFestivalList: MusicSuccessResponse = await MusicAPI.getMusicList();
    dispatch(getMusicSuccess(fetchMusicFestivalList));
  } catch (e: any) {
    console.error(e);
    dispatch(getMusicFailure({ errorMessage: e.message }));
  }
};
