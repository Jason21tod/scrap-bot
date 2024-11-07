import jason_profile from './jason-profile.png';
import user_profile from './user-profile.png';
import AnalyseMessage from './analyse/analyse';
import CumprimentMessage from './cumpriment/cumpriment';

import './message.css'

let profile_photo = jason_profile


export function Message({ data }) {
    let is_user = data.user
    let current_time = new Date();

    let message_styles = verify_subject(is_user)

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
                {build_message_body(data)}
            </div>
        </div>
        </div>
    );
}




function verify_subject (is_user) {
    let message_styles = 'message_styles message_styles';
    if (is_user) {
        profile_photo = user_profile;
        return message_styles = 'user_'+message_styles
    } else {
        profile_photo = jason_profile;
        return message_styles = 'robot_'+message_styles
    }
}

function build_message_body (data) {
    let messages_types = {
        "analyse": <AnalyseMessage data={data}></AnalyseMessage>,
        "cumpriment": <CumprimentMessage data={data}></CumprimentMessage>,
        "no_response_found": <CumprimentMessage data={data}></CumprimentMessage>
    }
    if (data.subject === "Robot") {
        return messages_types[data.content_type]
    } else {
        return <GenericUserMessage data={data}></GenericUserMessage>
    }
};

function GenericUserMessage({data}) {
    return( 
            <>
                <p>{data.text}</p>
            </>
        )
};


