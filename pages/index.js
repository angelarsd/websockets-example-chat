import React from 'react';
import fetch from 'isomorphic-fetch';
import config from '../config';
import Component from "../src/Component";

const HomePage = ({initialData}) => <Component initialData={initialData}/>

HomePage.getInitialProps = async () => {
  const res = await fetch(`${config.server}/messages`);
  const json = await res.json();
  return {initialData: json};
}

export default HomePage;
