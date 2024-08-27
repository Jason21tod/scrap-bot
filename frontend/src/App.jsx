import './reset.css'
import './App.css';
import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';


function App() {
  const [messages, setMessages] = useState([]);

  const addMessage = (newMessage) => {
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  return (<div>
      <section className='chat_container'>
        <div className='chat_container--header'>
          <ServerStatus />
          <h1>Jason Scrapbot</h1>
        </div>
        <div className='chat_container--chat_area'>
          <MessageField messages={messages} />
        </div>
        <UserMessageFields addMessage={addMessage} />
      </section>
  </div>
  );
}

function MessageField({ messages }) {

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className='messages_field_container'>
      {messages.map((message, index) => (
        <Message key={index} data={message} />
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
}

function Message({ data }) {
  let is_user = data.user
  let message_styles = 'message_styles message_styles'
  if (is_user) {
    message_styles = 'user_'+message_styles
  } else {
    message_styles = 'robot_'+message_styles
  }

  return (
    <div className={message_styles}>
      <legend>{data.subject}</legend>
      <p>{data.text}</p>
      <p>{data.title}</p>
      <p>{data.lang}</p>
    </div>
  );
}

function ServerStatus () {
  const [server_status, setServerStatus] = useState('');

  useEffect(() => {
    axios.post('http://localhost:5000/analyse', { text: 'hello', user: true })
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
    <p className='server_status'>{server_status}</p>
  );
}


function UserMessageFields({ addMessage }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    let sender_message = { text: message, user: true };
    sender_message.subject= 'User';
    addMessage(sender_message);

    axios.post('http://localhost:5000/analyse', sender_message)
      .then((res) => {
        console.log(res.data);
        res.data.subject = 'Robot';
        addMessage(res.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
    setMessage('')
  };

  return (
    <form className='messages_container' onSubmit={handleSubmit}>
      <div className='messages_container--user_fields'>
          <input
            className='messages_container--input'
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Write Your Message'
            />
        <button className='messages_container--sub_button' type='submit'></button>
      </div>
    </form>
  );
}

export default App;
