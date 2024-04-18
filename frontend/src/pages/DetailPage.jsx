
import { useParams } from 'react-router-dom'

function DetailPage() {
    const id = useParams()
    console.log(id.id)

    return <div>DetailPage</div>
}

export default DetailPage

