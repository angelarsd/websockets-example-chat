import React from 'react';
import '../src/styles.css';

const App = ({Component, pageProps}) => {
  return <Component {...pageProps} />
}

export default App;
