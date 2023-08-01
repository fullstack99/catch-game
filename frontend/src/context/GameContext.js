import { createContext } from "react";
import axios from "axios";

import {
  SET_GAME_SCORE,
  GET_GAME_SCORE,
  SET_ERROR,
  SET_LOADING,
} from "./types";
import CreateDataContext from "./CreateDataContext";

export const ContactContext = createContext();
const BASE_API = "http://localhost:4000/api/";

const initialState = {
  scores: [],
  loading: false,
  loaded: false,
  error: null,
};

const setLoading = (dispatch, loading) => {
  dispatch({
    type: SET_LOADING,
    payload: { loading },
  });
};

const getScores = (dispatch) => async () => {
  const path = `${BASE_API}scores`;
  try {
    dispatch({
      type: SET_ERROR,
      payload: null,
    });
    setLoading(dispatch, true);
    const { data } = await axios.get(path);
    dispatch({
      type: GET_GAME_SCORE,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: err,
    });
  } finally {
    setLoading(dispatch, false);
  }
};

const addScore = (dispatch) => async (info) => {
  const path = `${BASE_API}scores`;
  try {
    dispatch({
      type: SET_ERROR,
      payload: null,
    });
    setLoading(dispatch, true);
    await axios.post(path, info);
    dispatch({
      type: SET_GAME_SCORE,
    });
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: err,
    });
  } finally {
    setLoading(dispatch, false);
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      const { loading } = action.payload;

      return {
        ...state,
        loading,
      };
    case SET_GAME_SCORE:
      return {
        ...state,
        loaded: true,
      };

    case GET_GAME_SCORE:
      return {
        ...state,
        scores: action.payload,
        loaded: true,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const dispatch = (dispatch) => async (action) => dispatch(action);

export const { Provider, Context } = CreateDataContext(
  reducer,
  {
    getScores,
    addScore,
    dispatch,
  },
  initialState
);
