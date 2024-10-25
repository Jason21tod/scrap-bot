import "./message_fields.css";
import axios from "axios";
import { useState } from "react";

const API_ADDRESS = process.env.REACT_APP_API_URL;


const ERROR_DATA = {
  subject: 'Error Robot',
  text: 'error on connection'
}


export default function UserMessageFields({ addMessage }) {
    const [message, setMessage] = useState('');
    const [awaiting_message, setAwaiting] = useState('dont_awaiting_message');
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      let sender_message = { text: message, user: true };
      sender_message.subject= 'User';
      addMessage(sender_message);
      setAwaiting('awaiting_message');
      axios.post(API_ADDRESS+'/message_port', sender_message)
        .then((res) => {
          console.log(res.data);
          res.data.subject = 'Robot';
          addMessage(res.data);
          setAwaiting('dont_awaiting_message');
        })
        .catch((error) => {
          console.error('Error on connection!', error);
          addMessage(ERROR_DATA)
        });
      setAwaiting('dont_awaiting_message');
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