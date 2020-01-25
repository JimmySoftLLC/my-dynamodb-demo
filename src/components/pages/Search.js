import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import AlertContext from '../../context/alert/alertContext';
import AlertDialogContext from '../../context/alertDialog/alertDialogContext';

const Search = ({
  searchUsers,
  showClear,
  clearUsers,
  setText,
  search_text,
  setOnMyTeamPage,
  setRedirectTo,
}) => {
  const alertContext = useContext(AlertContext);
  const alertDialogContext = useContext(AlertDialogContext);

  useEffect(() => {
    // in place of component did mount
    setOnMyTeamPage(false);
    setRedirectTo('');
    // eslint-disable-next-line
  }, []);

  const onChange = e => {
    setText(e.target.name, e.target.value);
    alertDialogContext.setAlertDialog(true, 'Please enter something', 'erorr');
  };

  const onSubmit = e => {
    e.preventDefault();
    if (search_text === '') {
      alertContext.setAlert('Please enter something', 'light', 5000);
    } else {
      searchUsers(search_text);
      setText('search_text', '');
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className='form page-top-margin'>
        <input
          type='text'
          name='search_text'
          placeholder='find developers...'
          value={search_text}
          onChange={onChange}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {showClear && (
        <button className='btn btn-light btn-block' onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  search_text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
};

export default Search;
