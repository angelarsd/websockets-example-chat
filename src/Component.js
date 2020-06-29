import React, {useState, useEffect} from 'react';
import socketIOClient from 'socket.io-client';
import config from '../config';

const socket = socketIOClient(config.server);

const Component = ({initialData, host}) => {

  const [data, setData] = useState(initialData);
  const [field, setField] = useState('');

  useEffect(() => {
    socket.on('message', dataUpdate => {
      setData(dataUpdate);
    });

  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {id: data.length + 1, text: field}
    socket.emit('message', newData);
    setField('');
    setData((d) => [...d, newData]);
  }

  return (
    <div>
      <ul>
        {data.map(message =>
          <li key={message.id}>{message.text}</li>
        )}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          onChange={e => setField(e.target.value)}
          type='text'
          placeholder='Ingrese Mensaje'
          value={field}
        />
        <button>Enviar</button>
      </form>
    </div>
  );
}

export default Component;
