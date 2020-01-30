import React, { useEffect, useContext, useState } from 'react';
import AlertContext from '../../context/alert/alertContext';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const Search = () => {
  const dataAndMethodsContext = useContext(DataAndMethodsContext);
  const alertContext = useContext(AlertContext);

  const [text, setText] = useState('');

  const onChange = e => {
    setText(e.target.value);
  };

  useEffect(() => {
    // in place of component did mount
    dataAndMethodsContext.setOnMyTeamPage(false);
    dataAndMethodsContext.setRedirectTo(' ');
    // eslint-disable-next-line
  }, []);

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
