export default function AnalyseMessage ({data}) {
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