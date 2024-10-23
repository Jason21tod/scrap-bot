import jason_profile from './jason-profile.png';
import user_profile from './user-profile.png';

import './message.css'

export function Message({ data }) {
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

