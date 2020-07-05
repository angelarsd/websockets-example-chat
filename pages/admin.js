import React from 'react';
import fetch from 'isomorphic-fetch';
import Admin from "../src/Admin";

const HomePage = ({initialData}) => <Admin initialData={initialData}/>

HomePage.getInitialProps = async ({req}) => {
  const host = `http://${req.headers.host}`;
  const res = await fetch(`${host}/messages/admin`);
  const json = await res.json();
  return {initialData: json, host: host};
}

export default HomePage;
