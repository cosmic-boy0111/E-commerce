import React,{useState,useEffect,useContext} from 'react'
import SearchIcon from '@material-ui/icons/Search';
import Login from './Payment/Login';
import { UserContext } from '../../App'
import { useHistory } from 'react-router-dom'

const Search = () => {

    const history = useHistory();
    const [search, setSearch] = useState('')
    const [product, setProduct] = useState('');
    const [newArray, setNewArray] = useState([])
    const [show2, setShow2] = useState(false);

    const { setMyObj } = useContext(UserContext)

    const set = (text) =>{

        var myArray = []
        setSearch(text);
        console.log(text);
        if(text===''){
            setShow2(false)
            console.log(myArray);
            setNewArray(myArray);
            return;
        }
        [...product].forEach(e=>{
            if(e.name.toLowerCase().includes(text.toLowerCase())){
                myArray.push(e);
            }
        })
        if(myArray.length!==0){
            setShow2(true)
        }
        setNewArray(myArray)
        console.log(myArray);

    }

    const show = (e) =>{
        console.log(search);
        set('')
    }



    const getProducts = async () => {
        try {
            const res1 = await fetch('/mobiles',{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            })
            const data1 = await res1.json();
            const res2 = await fetch('/electronics',{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            })
            const data2 = await res2.json();
            const res3 = await fetch('/appliances',{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            })
            const data3 = await res3.json();
            const res4 = await fetch('/men',{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            })
            const data4 = await res4.json();
            const res5 = await fetch('/women',{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            })
            const data5 = await res5.json();

            console.log([...data1,...data3,...data2,...data4,...data5]);
            setProduct([...data1,...data3,...data2,...data4,...data5])
            
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
       getProducts();
    }, [])


    const go = (e) =>{
        setMyObj(e);
        localStorage.setItem('obj',JSON.stringify(e));
        history.push('/addtocart');
        set('')
    }

    return (
        <>
            <div className='search_area'>

            <form onSubmit={show} className="search_field">

                <input type="text" name="search" id="" value={search} placeholder="Search for products, brands and more" onChange={(e)=>set(e.target.value)} />
                <button type="submit" style={{
                    border:'none',
                    outline:'none',
                    backgroundColor:'white',
                    borderRadius:'2px'
                }}>

                <SearchIcon style={{
                    color:'#2874f0',
                    margin:'0 .5rem',
                    cursor:'pointer'
                }}/>
                </button>
            </form>
            <div className="bar_container" id='bar' style={{
                display:show2 ?'flex':'none'
            }}>
                
                {
                    newArray.length===0?<div className='s_name'>Result Not Found</div>:
                    newArray.map(e=>{
                        return <div onClick={()=>go(e)} > <span className="extra_search"> <SearchIcon fontSize='small'/> </span> <span className='s_name'> {e.name} </span></div>
                    })
                }



            </div>
            </div>
        </>
    )
}

export default Search
