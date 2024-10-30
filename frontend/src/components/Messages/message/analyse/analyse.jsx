import "./analyse.css"

export default function AnalyseMessage ({data}) {
    return (
        <div className="analyse_container">
            <h3 className="analyse_container_text">{data.text}</h3>
            <ul className="analyse_container_list">
                <li className="analyse_container_list_item--title">{data.title}</li>
                <li className="analyse_container_list_item--lang">{data.lang}</li>    
            </ul>
        </div>
    )
}