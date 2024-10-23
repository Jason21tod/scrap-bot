import { useRef, useEffect } from "react";

import './root.css';
import { Message } from "./message/message";

export default function MessageField({ messages }) {

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

