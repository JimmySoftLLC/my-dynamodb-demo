import React, { Fragment, useContext } from 'react';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const MyDynamoTable = () => {
  const dataAndMethodsContext = useContext(DataAndMethodsContext);
  return (
    <Fragment>
      <code className='hljs dos display-linebreak'>{dataAndMethodsContext.amazonResponse}</code>
      <div className='grid-4 page-bottom-margin '></div>
    </Fragment>
  );
};

export default MyDynamoTable;
