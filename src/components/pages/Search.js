import React, { useEffect, useContext, useState } from 'react';
import AlertContext from '../../context/alert/alertContext';
import GithubContext from '../../context/gitHub/gitHubContext';

const Search = ({
  showClear,
  setOnMyTeamPage,
  setRedirectTo,
}) => {
  const gitHubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);
  const [text, setText] = useState('');

  useEffect(() => {
    // in place of component did mount
    setOnMyTeamPage(false);
    setRedirectTo('');
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
      gitHubContext.searchUsers(text);
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
      {showClear && (
        <button className='btn btn-light btn-block' onClick={gitHubContext.clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
