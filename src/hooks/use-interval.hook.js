import React from 'react';

function useInterval(callback, delay) {
  const savedCallback = React.useRef();

  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const useKeydown = (callback) => {
  React.useEffect(() => {
    window.addEventListener('keydown', callback)
    return () => {
      window.removeEventListener('keydown', callback)
    }
  })
}

const useDocumentTitle = (title, fallbackTitle) => {
  React.useEffect(() => {
    document.title = title;
    return () => {
      document.title = fallbackTitle
    }
  }, [title])
}

export { useInterval, useKeydown, useDocumentTitle };
