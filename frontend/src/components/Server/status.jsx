import { useState, useEffect } from "react";
import axios from "axios";


const API_ADDRESS = process.env.REACT_APP_API_URL;



export default function ServerStatus () {
    const [server_status_text, setServerStatusText] = useState('connecting...');
    const [server_status, setServerStatus] = useState('server_status server_status--connecting')
  
    useEffect(() => {
      axios.post(API_ADDRESS+'/message_port', { text: 'hello', user: true })
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