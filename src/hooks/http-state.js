import { useReducer } from 'react';

const httpStateReducer = (currentHttpReducer, action) => {
  switch (action.type) {
    case 'SEND_REQUEST':
      return { loading: true, error: null };
    case 'SUCCESS':
      return { loading: false, error: null };
    case 'ERROR':
      return { loading: false, error: action.errorMsg };
    default:
      throw new Error(`Action type not handle correctly ${action.type}`);
  }
};

const useHttpState = initState => {
  const [httpState, dispatchHttpState] = useReducer(httpStateReducer, initState);

  return [httpState, dispatchHttpState];
};

export default useHttpState;
