export function AnswerBoard({answer}) {
    return (
        <table className='table-sm'>
            <tbody>
                    {answer.map((innerArray) => ( 
                <tr key={crypto.randomUUID()}>
                    {innerArray.map((item) => <td key={crypto.randomUUID()}>{item}</td>)}
                </tr>
            ))}
            </tbody>
        </table>
    )
}