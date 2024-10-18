import './reset.css';
import './App.css';
import jason_profile from './jason-profile.png';
import user_profile from './user-profile.png';
import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';


const ERROR_DATA = {
  subject: 'Error Robot',
  text: 'error on connection'
}


function App() {
  const [messages, setMessages] = useState([]);

  const addMessage = (newMessage) => {
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  return (
    <div className='app'>
        <section className='chat_container'>
          <div className='chat_container--header'>
            <ServerStatus />
            <h1>Jason Scrapbot</h1>
          </div>
          <hr />
          <div className='chat_container--chat_area'>
            <MessageField messages={messages} />
          </div>
          <UserMessageFields addMessage={addMessage} />
        </section>
    </div>
  );
}

function MessageField({ messages }) {

  const messages_end_ref = useRef(null);

  useEffect(() => {
    messages_end_ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className='messages_field_container'>
      {messages.map((message, index) => (
        <Message key={index} data={message} />
      ))}
      <div ref={messages_end_ref}></div>
    </div>
  );
}

function Message({ data }) {
  let is_user = data.user
  let message_styles = 'message_styles message_styles'
  let profile_photo = user_profile
  if (is_user) {
    message_styles = 'user_'+message_styles
  } else {
    message_styles = 'robot_'+message_styles
    profile_photo = jason_profile
  }
  let current_time = new Date();
  return (
    <div className={message_styles}>
      <div className={message_styles+'--image_container'}>
        <img className={message_styles+'--image'} src={profile_photo} alt="Jasonbot"/>
      </div>
      <div className={message_styles+'--text_container'}>
        <div className={message_styles+'--header'}>
          <legend>{data.subject}</legend>
          <time>{current_time.getDate()}/{current_time.getMonth()}/{current_time.getFullYear()} - {current_time.getHours()}:{current_time.getMinutes()}</time>
        </div>
        <div>
          <p>{data.text}</p>
          <p>{data.title}</p>
          <p>{data.lang}</p>
        </div>
      </div>
    </div>
  );
}

function ServerStatus () {
  const [server_status_text, setServerStatusText] = useState('connecting...');
  const [server_status, setServerStatus] = useState('server_status server_status--connecting')

  useEffect(() => {
    axios.post('http://127.0.0.1:5000/analyse', { text: 'hello', user: true })
      .then((res) => {
        console.log(res.data);
        setServerStatusText('Connection established');
        setServerStatus('server_status server_status--connected')
      })
      .catch((error) => {
        console.error('Cannot connect', error);
        setServerStatusText('Could not connect to the server');
        setServerStatus('server_status server_status--not_connected')
      });
  }, []);

  return (
    <p className={server_status}>{server_status_text}</p>
  );
}


function UserMessageFields({ addMessage }) {
  const [message, setMessage] = useState('');
  const [awaiting_message, setAwaiting] = useState('message_styles dont_awaiting_message');

  const handleSubmit = (e) => {
    e.preventDefault();

    let sender_message = { text: message, user: true };
    sender_message.subject= 'User';
    addMessage(sender_message);
    setAwaiting('message_styles awaiting_message');
    axios.post('http://127.0.0.1:5000/analyse', sender_message)
      .then((res) => {
        console.log(res.data);
        res.data.subject = 'Robot';
        addMessage(res.data);
        setAwaiting('message_styles dont_awaiting_message');
      })
      .catch((error) => {
        console.error('There was an error!', error);
        addMessage(ERROR_DATA)
      });
    setAwaiting('message_styles dont_awaiting_message');
    setMessage('')
  };

  return (
    <>
      <div className={awaiting_message}></div>
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
    </>
  );
}

export default App;
