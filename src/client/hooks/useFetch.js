import { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    // using set time out to emulate call from server.. replace with axios.get() later.
    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
        .then((res) => {
          if (!res.ok) { // error coming back from server
            throw Error('Please refersh the page or try again later.');
          }
          return res.json();
        })
        .then((d) => {
          setIsPending(false);
          setData(d);
          setError(null);
        })
        .catch((err) => {
          if (err.name === 'AbortError') {
            console.log('fetch aborted');
          } else {
          // auto catches network / connection error
            setIsPending(false);
            setError(err.message);
          }
        });
    }, 1000);

    // abort the fetch
    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
