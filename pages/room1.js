import React from 'react';
import fetch from 'isomorphic-fetch';
import Component from "../src/Component";

const room = 'room1';

const HomePage = ({initialData}) => <Component initialData={initialData} room={room} title="Form 1"/>

HomePage.getInitialProps = async ({req}) => {
  const host = `http://${req.headers.host}`;
  const res = await fetch(`${host}/messages/room1`);
  const json = await res.json();
  return {initialData: json, host: host};
}

export default HomePage;
