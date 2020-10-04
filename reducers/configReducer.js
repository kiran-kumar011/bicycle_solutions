import * as actionTypes from './actionTypes';

export const actions = {
  setConfig: (config) => ({
    type: actionTypes.SET_CONFIG,
    config,
  }),
};

export const initialState = {
  deviceWidth: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CONFIG: {
      return {
        ...state,
        ...action.config,
      };
    }
  }

  return state;
};

export default reducer;
