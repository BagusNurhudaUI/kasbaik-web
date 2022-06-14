import React , {useState, useEffect} from 'react';
import Navbar from '../../components/Navbar'
import Table, {AvatarCell} from './TablePeminjaman'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import foto from '../../assets/png/account1.png'
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';
import client from '../../config.js'

const User =  () => {
    const [peminjaman, setPeminjaman] = useState([])
    const [isAuth, setisAuth] = useState(true);

    const getUser = async () => {
        const data = []
        try {
            const token = localStorage.getItem("token2");
            await client.get('/listBorrower', {
                headers :
                    {      
                        "authorization": token,      
                    }  
            })
            .then((response) => {
              setisAuth(true)
              const obj = response.data.peminjaman
              console.log(obj);
              console.log('peminjaman',peminjaman);
              obj.forEach(p => {
                console.log('masuk');
                let image = ''
                let total_payment ;
                if(p.foto_diri === null){
                  image= `${foto}`
                }else {
                  image=`${p.foto_diri}`
                }
                if(p.total_payment === null){
                  total_payment= 'not payment'
                } else {
                  total_payment = `Rp. ${p.total_payment.toLocaleString("id-ID")}`
                }
                const data1 = {
                  id_user : p.id_user,
                  id_borrower : p.id_borrower,
                  name : p.nama_lengkap,
                  imgUrl : image,
                  email : p.email,
                  loan_amount : `Rp. ${p.loan_amount.toLocaleString("id-ID")}`,
                  pinjaman_ke : p.pinjaman_ke,
                  phone : p.phone,
                  profesi : p.profesi,
                  total_payment : total_payment,
                  createdAt : p.createdAt.split("T")[0],
                  status : p.status,
                  tenor : p.tenor,                 }
              data.push(data1)
              })
              setPeminjaman(data)
              console.log('peminjaman',peminjaman);
            }) 

        } catch (err) {
            console.log(err);
        }
        
        return [...[...peminjaman]] 
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
      Header: "Jumlah Pinjaman",
      accessor: 'loan_amount',
      },
      {
        Header: "Status",
        accessor: 'status',
      },
      {
      Header: "Pinjaman Ke",
      accessor: 'pinjaman_ke',
      //Cell: StatusPill,
      },
      {
      Header: "Phone",
      accessor: 'phone',
      },
      {
        Header: "Tenor",
        accessor: 'tenor',
      },
      {
      Header: "Total Pembayaran",
      accessor: 'total_payment',
      //Filter: SelectColumnFilter,  // new
      filter: 'includes',
      },
      {
        Header: "Tanggal",
        accessor: 'createdAt',
        //Filter: SelectColumnFilter,  // new
        filter: 'includes',
        },
    ], [])  
   
    
    const data = React.useMemo(() => peminjaman, [peminjaman])

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
          <div className="App" style={{ height: "100%" }}>
          <div className="max-w-sm mx-auto min-h-screen bg-gray-100 text-gray-900">
          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                      <div className="col-span-1  flex justify-center my-5">
                          <h2 className="text-md md:text-lg text-gray-700 font-bold tracking-wide md:tracking-wider">
                              Informasi List Peminjaman
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