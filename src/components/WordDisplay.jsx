export function WordDisplay({words}) {

    return (
        <div className="container" id="wordDisplay">
            <ul>
                <div className="row">
                    {words.split(' ').map((word) => 
                    <li className="col-3" key={crypto.randomUUID()}><b>{word.charAt(0).toUpperCase() + word.slice(1)}</b></li>)}
                </div>
            </ul>
        </div>
    )
}