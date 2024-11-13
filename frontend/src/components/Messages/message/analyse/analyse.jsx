import "./analyse.css"

export default function AnalyseMessage ({data}) {
    return (
        <div className="analyse_container">
            <h3 className="analyse_container_text">{data.text}</h3>
            <ul className="analyse_container_list">
                <li className="analyse_container_list_item--title"> <em>Tag Title:</em>{data.content.title}</li>
                <li className="analyse_container_list_item--lang"> <em>Language:</em> {data.content.lang}</li>
                <li className="analyse_container_list_item--links"> <em>External Links:</em> {(data.content.links.external_links).length}</li>
                <li className="analyse_container_list_item--links"> <em>Internal Links:</em> {(data.content.links.internal_links).length}</li>
                <li className="analyse_container_list_item--links"> <em>Image Tags</em> {(data.content.imgs)}</li>
            </ul>
        </div>
    )
}