import React, { useReducer } from 'react';
import AlertDialogContext from './alertDialogContext';
import AlertDialogReducer from './alertDialogReducer';
import { SET_ALERT_DIALOG, CLOSE_ALERT_DIALOG } from '../types';

const AlertDialogState = props => {
  const initialState = {
    alertOpen: false,
    alertMessage: '',
    alertTitle: '',
  };

  const [state, dispatch] = useReducer(AlertDialogReducer, initialState);

  const setAlertDialog = (alertOpen, alertMessage, alertTitle) => {
    dispatch({
      type: SET_ALERT_DIALOG,
      payload: {
        alertOpen,
        alertMessage,
        alertTitle,
      },
    });
  };

  const setAlertToClosed = () => {
    dispatch({ type: CLOSE_ALERT_DIALOG });
  };

  return (
    <AlertDialogContext.Provider
      value={{
        alertOpen: state.alertOpen,
        alertMessage: state.alertMessage,
        alertTitle: state.alertTitle,
        setAlertDialog,
        setAlertToClosed,
      }}
    >
      {' '}
      {props.children}{' '}
    </AlertDialogContext.Provider>
  );
};

export default AlertDialogState;
