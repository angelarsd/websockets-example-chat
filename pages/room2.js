import React from 'react';
import fetch from 'isomorphic-fetch';
import Component from "../src/Component";

const room = 'room2';

const HomePage = ({initialData}) => <Component initialData={initialData} room={room} title="Form 2"/>

HomePage.getInitialProps = async ({req}) => {
  const host = `http://${req.headers.host}`;
  const res = await fetch(`${host}/messages/room2`);
  const json = await res.json();
  return {initialData: json, host: host};
}

export default HomePage;
