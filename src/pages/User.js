import React , {useState, useEffect} from 'react';
import Navbar from '../components/Navbar'
import Table, {AvatarCell} from '../components/TableUser'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";

const User =  () => {
    const [user, setUser] = useState([])
    const [isAuth, setisAuth] = useState(false);

    const getUser = async () => {
        const data = []
        try {
            const token = localStorage.getItem("token2");
            await axios.get('http://localhost:8080/listAkunUser', {
                headers :
                    {      
                        "authorization": token,      
                    }  
            })
            .then((response) => {
              setisAuth(true)
              const obj = response.data
                
              obj.forEach(user => {
                const data1 = {
                    id_user : user.id_user, 
                    name : user.username,
                    email : user.email,
                    phone : user.phone,
                    department: 'Security',
                    status: 'Active',
                    role: user.role,
                    age: 24,
                    imgUrl : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60'
                }
                data.push(data1)
              })
                setUser(data)
                console.log(...[...user]);
            })
    
        } catch (err) {
            console.log(err);
        }
        
        return [...[...user]] 
    }

    const navigate = useNavigate()
    const notAuth = () => {
      console.log('clicked');
      navigate('/');
    } 

    const columns = React.useMemo(() => [
      {
      Header: "Name",
      accessor: 'name',
      Cell: AvatarCell,
      imgAccessor: "imgUrl",
      emailAccessor: "email",
      },
      {
      Header: "Phone",
      accessor: 'phone',
      },
      {
      Header: "Status",
      accessor: 'status',
      //Cell: StatusPill,
      },
      {
      Header: "Age",
      accessor: 'age',
      },
      {
      Header: "Role",
      accessor: 'role',
      //Filter: SelectColumnFilter,  // new
      filter: 'includes',
      },
    ], [])  
   
    
    const data = React.useMemo(() => user, [user])

    let [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])

    React.useEffect(() => {
      getUser()
    }, [])

    return (
      <div> {
        loading ? 
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <ClipLoader 
             loading={loading} css size={100} />
        </div>
         : 
        isAuth ? 
        <>
        <Navbar />
        <div className="App" style={{ height: "100%" }}>
        <div className="min-h-screen bg-gray-100 text-gray-900">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <div className="">
            <h1 className="text-xl">List User Peminjam Kasbaik</h1>
            </div>
            <div className="mt-4">
            <Table columns={columns} data={data} />
            {/* <Table columns={columns} data={data} map={mapFly} /> */}
            </div>
        </main>
        </div>
        </div>
        </>
        : 
            <div>
                <div>anda belum terautentikasi </div>
                <button onClick={notAuth}>go to login page</button>
            </div>
        }
    </div>
  //     <div> {isAuth ? 
  //         <>
  //           <Navbar />
  //           <div className="App" style={{ height: "100%" }}>
  //           <div className="min-h-screen bg-gray-100 text-gray-900">
  //           <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
  //               <div className="">
  //               <h1 className="text-xl">List User Peminjam Kasbaik</h1>
  //               </div>
  //               <div className="mt-4">
  //               <Table columns={columns} data={data} />
  //               {/* <Table columns={columns} data={data} map={mapFly} /> */}
  //               </div>
  //           </main>
  //           </div>
  //       </div>
  //       </>
  //         : 
  //         <div>
  //             <div>anda belum terautentikasi </div>
  //             <button onClick={notAuth}>go to login page</button>
  //         </div>
  //     }
  // </div>
    )
}

export default User