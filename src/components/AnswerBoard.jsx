export function AnswerBoard({answer, fSize, cellWidth}) {
    return (
        <table>
            <tbody>
                    {answer.map((innerArray) => ( 
                <tr key={crypto.randomUUID()}>
                    {innerArray.map((item) => <td key={crypto.randomUUID()} className="m-1" style={{fontSize: fSize, width: cellWidth}} >{item}</td>)}
                </tr>
            ))}
            </tbody>
        </table>
    )
}