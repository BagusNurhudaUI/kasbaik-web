import React , {useState, useEffect} from 'react';
import Navbar from '../../components/Navbar'
import Table, {AvatarCell} from './TablePembayaran'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import foto from '../../assets/png/account1.png'
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';
const User =  () => {
    const [pembayaran, setPembayaran] = useState([])
    const [isAuth, setisAuth] = useState(true);

    const getPayment = async () => {
        const data = []

        try {
            const token = localStorage.getItem("token2");
            await axios.get('http://localhost:8080/paymentadmin', {
                headers :
                    {      
                        "authorization": token,      
                    }  
            })
            .then((response) => {
              setisAuth(true)
              const obj = response.data.payment
              console.log(obj);
              obj.forEach(p => {
                console.log('masuk');
                let image = ''
                let total_payment
                if(p.foto_diri === null){
                  image= `${foto}`
                }else {
                  image=`${p.foto_diri}`
                }
                if(p.total_payment === null){
                  total_payment= 'not payment'
                } else {
                  total_payment = `Rp. ${p.total_payment}`
                }
                const data1 = {
                  id_user : p.id_user,
                  id_borrower : p.id_borrower,
                  id_payment : p.id_payment,
                  name : p.nama_lengkap,
                  imgUrl : image,
                  email : p.email,
                  loan_amount : `Rp. ${p.loan_amount}`,
                  pinjaman_ke : p.pinjaman_ke,
                  phone : p.phone,
                  profesi : p.profesi,
                  total_payment : total_payment,
                  createdAt : p.createdAt.split("T")[0],
                  status : p.status,
                  payment_ke : p.payment_ke,
                  amount_payment : `Rp. ${p.amount_payment}`,
                  payment_method : p.payment_method,
                 }
              data.push(data1)
              })
              setPembayaran(data)
            })
               
    
        } catch (err) {
            console.log(err);
        }
        
        return [...[...pembayaran] ]
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
      Header: "Jumlah Bayar",
      accessor: 'amount_payment',
      },
      {
      Header: "Pembayaran ke",
      accessor: 'payment_ke',
      //Cell: StatusPill,
      },
      {
        Header: "Metode",
        accessor: 'payment_method',
        //Cell: StatusPill,
        },
      {
        Header: "Tanggal",
        accessor: 'createdAt',
        //Filter: SelectColumnFilter,  // new
        filter: 'includes',
        },
    ], [])  
   
    
    const data = React.useMemo(() => pembayaran, [pembayaran])

    let [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])

    React.useEffect(() => {
      getPayment()
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
                              Informasi List Pembayaran
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
  
    )
}

export default User