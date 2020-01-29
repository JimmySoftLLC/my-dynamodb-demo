import React, { useEffect, useContext, useState } from 'react';
import AlertContext from '../../context/alert/alertContext';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const Search = () => {
  const dataAndMethodsContext = useContext(DataAndMethodsContext);
  const alertContext = useContext(AlertContext);

  const [text, setText] = useState('');

  useEffect(() => {
    // in place of component did mount
    dataAndMethodsContext.setOnMyTeamPage(true);
    dataAndMethodsContext.redirectTo = '';
    // eslint-disable-next-line
  }, []);

  const onChange = e => {
    setText(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (text === '') {
      alertContext.setAlert('Please enter something', 'light', 5000);
    } else {
      dataAndMethodsContext.searchUsers(text);
      setText('');
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className='form page-top-margin'>
        <input
          type='text'
          name='text'
          placeholder='find developers...'
          value={text}
          onChange={onChange}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {dataAndMethodsContext.users.length > 0 && (
        <button className='btn btn-light btn-block' onClick={dataAndMethodsContext.clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
