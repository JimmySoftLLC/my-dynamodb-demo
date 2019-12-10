import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ searchUsers, showClear, clearUsers, setAlert, setText, search_text }) => {
  const onChange = e => {
    setText(e.target.name, e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (search_text === '') {
      setAlert('Please enter something', 'light', 5000);
    } else {
      searchUsers(search_text);
      setText('search_text','');
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
        <button
          className='btn btn-light btn-block'
          onClick={clearUsers}
        >
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
  setAlert: PropTypes.func.isRequired,
  search_text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
};

export default Search;
