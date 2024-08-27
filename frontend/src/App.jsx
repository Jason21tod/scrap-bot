import './reset.css'
import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';


function App() {
  const [messages, setMessages] = useState([]);

  const addMessage = (newMessage) => {
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  return (
    <section>
      <h3>I'm Jason Bot</h3>
      <ServerStatus />
      <MessageField messages={messages} />
      <UserMessageFields addMessage={addMessage} />
    </section>
  );
}

function MessageField({ messages }) {
  return (
    <div>
      {/* Aqui criamos uma expressão diratemante dentro de uma DIV */}
      {messages.map((message, index) => (
        <Message key={index} data={message} />
      ))}
    </div>
  );
}

function Message({ data }) {
  return (
    <div>
      <p>{data.text}</p>
      <p>{data.title}</p>
      <p>{data.lang}</p>
    </div>
  );
}

function ServerStatus () {
  const [server_status, setServerStatus] = useState('');

  useEffect(() => {
    axios.post('http://localhost:5000/analyse', { text: 'hello' })
      .then((res) => {
        console.log(res.data);
        setServerStatus('Connection established');
      })
      .catch((error) => {
        console.error('Cannot connect', error);
        setServerStatus('Could not connect to the server');
      });
  }, []);

  return (
    <p>{server_status}</p>
  );
}


function UserMessageFields({ addMessage }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    let sender_message = { text: message };
    const formated_text = 'User: '+ message;
    axios.post('http://localhost:5000/analyse', sender_message)
      .then((res) => {
        console.log(res.data);
        sender_message.text = formated_text;
        addMessage(sender_message);
        res.data.text = 'Robot: ' + res.data.text;
        addMessage(res.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <hr />
        <input 
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Write Your Message'
        />
      </label>
      <button type='submit'>Submit</button>
    </form>
  );
}

export default App;
