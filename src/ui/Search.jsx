import {useRef, useEffect} from 'react';
import useKey from '../hooks/useKey';

const Search = ({ query, setQuery }) => {
  const inputElement = useRef(null);

  useKey('Enter', function () {
    if (document.activeElement === inputElement.current) return;
    inputElement.current.focus();
    setQuery('');
  });

  useEffect(() => {
    setTimeout(() => {
      inputElement.current?.focus();
    }, 0);
  }, [inputElement]);

  return (
    <div style={{position: 'relative'}}>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputElement}
      />
      {query && (
        <button
          className="clear-button"
          onClick={() => setQuery('')}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-60%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'white',
            fontSize: '1.8rem',
          }}
        >
          &#x2715;
        </button>
      )}
    </div>
  );
};

export default Search;
