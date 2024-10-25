import './reset.css';
import './App.css';
import React, {useState} from 'react';

import MessageField from './components/Messages/root';
import ServerStatus from './components/Server/status';
import UserMessageFields from './components/Messages/message_fields/message_fields';


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




export default App;
