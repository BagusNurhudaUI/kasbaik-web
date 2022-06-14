import React , {useState, useEffect} from 'react';
import Navbar from '../../components/Navbar'
import Table, {AvatarCell} from './TableUser'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import foto from '../../assets/png/account1.png'
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';
import client from '../../config'

const User =  () => {
    const [user, setUser] = useState([])
    const [isAuth, setisAuth] = useState(true);

    const getUser = async () => {
        const data = []
        try {
            const token = localStorage.getItem("token2");
            await client.get('/listAkunUser', {
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
                let image = ''
                if(user.foto_diri === null){
                  image= `${foto}`
                }else {
                  image=`${user.profile.foto_diri}`
                }
                console.log(image);
                const data1 = {
                    id_user : user.id_user, 
                    name : user.username,
                    email : user.email,
                    phone : user.phone,
                    pinjaman : user.peminjaman,
                    alamat : user.profile.alamat_tinggal,
                    gender: user.profile.gender,
                    profesi: user.profile.profesi,
                    usia: user.profile.usia,
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
        <Loading loading={loading} />
         : 
        isAuth ? 
        <div className="bg-gray-100">
          <Navbar />
          <div className="App" >
          <div className="max-w-sm mx-auto min-h-screen bg-gray-100 text-gray-900">
          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                      <div className="col-span-1  flex justify-center my-5">
                          <h2 className="text-md md:text-lg text-gray-700 font-bold tracking-wide md:tracking-wider">
                              Informasi List Pengguna
                          </h2>
                      </div>
              <div className="mt-4">
              <Table columns={columns} data={data} />
              {/* <Table columns={columns} data={data} map={mapFly} /> */}
              </div>
          </main>
          </div>
          </div>
          <Footer />
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