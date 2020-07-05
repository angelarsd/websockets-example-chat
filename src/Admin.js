import React, {useState, useEffect} from 'react';
import socketIOClient from 'socket.io-client';
import config from '../config';

const socket = socketIOClient(config.server);

const Component = ({initialData}) => {

  const [data, setData] = useState(initialData);

  useEffect(() => {
    socket.on('admin', dataUpdate => {
      setData(dataUpdate);
    });
  }, [initialData]);

  return (
    <div>
      {Object.keys(data).map((room, i) =>
        <>
          <h3>Form {i + 1}</h3>
          <table border={1}>
            <tr>
              <th>id</th>
              <th>text</th>
            </tr>
            {data[room].map(d =>
              <tr>
                <td>{d.id}</td>
                <td>{d.text}</td>
              </tr>
            )}
          </table>
          <br/>
        </>
      )}
    </div>
  );
}

export default Component;
