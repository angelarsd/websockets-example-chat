import React from 'react';
import fetch from 'isomorphic-fetch';
import config from '../config';
import Component from "../src/Component";

const HomePage = ({initialData, host}) => <Component initialData={initialData} host={host}/>

HomePage.getInitialProps = async ({req}) => {
  const host = `http://${req.headers.host}`;
  const res = await fetch(`${host}/messages`);
  const json = await res.json();
  return {initialData: json, host: host};
}

export default HomePage;
