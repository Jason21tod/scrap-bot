import "./who_iam.css"

export default function WhoIAmMessage ({data}) {
    return (<>
        <p className="who_iam--text">{data.text}</p>
        <br />
        <a className="who_iam--button" href={data.content.respository_link}>Click here to access</a>
    </>
    )    
};