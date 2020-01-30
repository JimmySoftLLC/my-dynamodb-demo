import React, { Fragment, useContext } from 'react';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import AlertDialog from '../layout/AlertDialog';
import MyTableButtonsAndFields from '../layout/MyTableButtonsAndFields';

const MyDynamoTable = () => {
  const dataAndMethodsContext = useContext(DataAndMethodsContext);
  return (
    <Fragment>
      <AlertDialog />
      <MyTableButtonsAndFields />{' '}
      <code className='hljs dos display-linebreak'>{dataAndMethodsContext.amazonResponse}</code>
      <div className='grid-4 page-bottom-margin '></div>
    </Fragment>
  );
};

export default MyDynamoTable;
