import * as types from "./actionTypes";
const initState = {
  user: [],
  isLoading: false,
  isError: false,
};

const reducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.REGISTER_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: payload,
      };
    case types.LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: payload,
      };
    default:
      return state;
  }
};
export { reducer };
