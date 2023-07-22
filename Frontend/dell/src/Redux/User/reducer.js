import * as types from "./actionTypes";
const initState = {
  data: [],
  sortedArray: [],
  isLoading: false,
  isError: false,
};

const reducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.GET_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: payload,
      };
    case types.GET_SORTED_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.GET_SORTED_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_SORTED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sortedArray: payload,
      };
    default:
      return state;
  }
};
export { reducer };
