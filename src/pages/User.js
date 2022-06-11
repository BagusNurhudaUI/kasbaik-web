import React , {useState, useEffect} from 'react';
import Navbar from '../components/Navbar'
import Table, {AvatarCell} from '../components/TableUser'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import foto from '../assets/png/account1.png'
const User =  () => {
    const [user, setUser] = useState([])
    const [isAuth, setisAuth] = useState(true);

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
              console.log(obj);
              obj.forEach((user) => {
                const pinjaman = 0
                let image = ''
                if(user.foto_diri === null){
                  image= `${foto}`
                }else {
                  image=`${user.foto_diri}`
                }
                console.log(image);
                const data1 = {
                    id_user : user.id_user, 
                    name : user.username,
                    email : user.email,
                    phone : user.phone,
                    pinjaman : pinjaman,
                    alamat : user.alamat_tinggal,
                    gender: user.gender,
                    profesi: user.profesi,
                    usia: user.usia,
                    imgUrl : image,
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
      Header: "Usia",
      accessor: 'usia',
      //Cell: StatusPill,
      },
      {
      Header: "Gender",
      accessor: 'gender',
      },
      {
        Header: "Pekerjaan",
        accessor: 'profesi',
      },
      {
      Header: "Alamat",
      accessor: 'alamat',
      //Filter: SelectColumnFilter,  // new
      filter: 'includes',
      },
      {
        Header: "Jumlah Pinjaman",
        accessor: 'pinjaman',
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
        <div className="bg-gray-100">
        <Navbar />
        <div className="App" style={{ height: "100%" }}>
        <div className="max-w-sm mx-auto min-h-screen bg-gray-100 text-gray-900">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <div className="">
            <h1 className="text-xl">List User Peminjam Kasbaik <button onClick={getUser}>click to refresh</button></h1>
            </div>
            <div className="mt-4">
            <Table columns={columns} data={data} />
            {/* <Table columns={columns} data={data} map={mapFly} /> */}
            </div>
        </main>
        </div>
        </div>
        </div>
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