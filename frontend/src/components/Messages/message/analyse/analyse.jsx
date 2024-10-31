import "./analyse.css"

export default function AnalyseMessage ({data}) {
    return (
        <div className="analyse_container">
            <h3 className="analyse_container_text">{data.text}</h3>
            <ul className="analyse_container_list">
                <li className="analyse_container_list_item--title"> <em>Tag Title:</em>{data.title}</li>
                <li className="analyse_container_list_item--lang"> <em>Lingua:</em> {data.lang}</li>
                <li className="analyse_container_list_item--links"> <em>Links Externos:</em> {(data.links.external_links).length}</li>
                <li className="analyse_container_list_item--links"> <em>Links Internos:</em> {(data.links.internal_links).length}</li>    
            </ul>
        </div>
    )
}