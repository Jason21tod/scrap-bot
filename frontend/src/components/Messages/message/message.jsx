import jason_profile from './jason-profile.png';
import user_profile from './user-profile.png';

import './message.css'


const PROFILE_PHOTO = jason_profile


export function Message({ data }) {
    let is_user = data.user
    let current_time = new Date();

    let message_styles = verify_subject(is_user)

    return (
        <div className={message_styles}>
        <div className={message_styles+'--image_container'}>
            <img className={message_styles+'--image'} src={PROFILE_PHOTO} alt="Jasonbot"/>
        </div>
        <div className={message_styles+'--text_container'}>
            <div className={message_styles+'--header'}>
                <legend>{data.subject}</legend>
                <time>{current_time.getDate()}/{current_time.getMonth()}/{current_time.getFullYear()} - {current_time.getHours()}:{current_time.getMinutes()}</time>
            </div>
            <div>
                {build_message_body(data)}
            </div>
        </div>
        </div>
    );
}

function AnalyseMessage ({data}) {
    return (
        <>
            <h3>{data.text}</h3>
            <hr/>
            <p>{data.title}</p>
            <p>{data.lang}</p>
            <hr />
        </>
    )
}


function verify_subject (is_user) {
    let message_styles = 'message_styles message_styles';
    if (is_user) {
        return message_styles = 'user_'+message_styles
    } else {
        return message_styles = 'robot_'+message_styles
    }
}

function build_message_body (data) {
    let messages_types = {
        "analyse": <AnalyseMessage data={data}></AnalyseMessage>
    }
    return messages_types[data.request_chat]
}


