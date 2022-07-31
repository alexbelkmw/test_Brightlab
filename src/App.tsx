import React, {useState, useEffect} from "react";
import { Pagination, Input } from "antd";

interface comment {
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string

}

const App: React.FC = () =>{
    const { Search } = Input;
    const PAGE_SIZE = 10
    const [comments, setComments] = useState<comment[]>([])
    const [elem, setElem] = useState<JSX.Element>()
    const [currentPage, setcurrentPage]= useState(1)
    const [email, setEmail] = useState('')

    useEffect(()=>{
        const path = 'https://jsonplaceholder.typicode.com/comments'
        const url = email === '' ? path : path + `?email=${email}`
        fetch(url).then(response => response.json()).then(json => setComments(json))
    },[email])

    useEffect(()=>{
        const start = (currentPage - 1) * PAGE_SIZE
        const end = start + PAGE_SIZE
        const page = comments.slice(start, end)
        const list = <div >{page.map((elem)=>{ 
            return (
            <div style={{width: 600}} >
            <p style={{textAlign:'left', fontWeight: "bold" }}>{elem.email}</p>
            <p style={{textAlign: "justify"}} >{elem.body}</p>
            </div>
            )
          })}</div>
        setElem(list)
    },[comments, currentPage])

    return <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Search
            placeholder="Поиск по email" 
            onSearch={(value)=>setEmail(value)} 
            allowClear 
            enterButton 
        />
        <Pagination 
            style={{display: 'flex'}}
            simple 
            pageSize={PAGE_SIZE} 
            current={currentPage} 
            total={comments.length} 
            onChange={(page) => setcurrentPage(page)}
        />
        {elem}
    </div>
}

export default App;
