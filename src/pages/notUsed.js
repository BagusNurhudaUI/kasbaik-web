import React , {useState} from 'react';
import Navbar from '../components/Navbar'
import Table, {AvatarCell} from '../components/Table'
import axios from 'axios';



// const getData = () => {
//     const data = [
//         {
//         name: 'Jane Cooper',
//         email: 'jane.cooper@example.com',
//         title: 'Regional Paradigm Technician',
//         department: 'Optimization',
//         status: 'Active',
//         role: 'Admin',
//         age: 27,
//         imgUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
//       },{
//         name: 'Cody Fisher',
//         email: 'cody.fisher@example.com',
//         title: 'Product Directives Officer',
//         department: 'Intranet',
//         status: 'Inactive',
//         role: 'Owner',
//         age: 43,
//         imgUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
//       },
      
      
//       {
//         name: 'Esther Howard',
//         email: 'esther.howard@example.com',
//         title: 'Forward Response Developer',
//         department: 'Directives',
//         status: 'Active',
//         role: 'Member',
//         age: 32,
//         imgUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
//       },
//       {
//         name: 'Jenny Wilson',
//         email: 'jenny.wilson@example.com',
//         title: 'Central Security Manager',
//         department: 'Program',
//         status: 'Offline',
//         role: 'Member',
//         age: 29,
//         imgUrl: 'https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
//       },
//       {
//         name: 'Kristin Watson',
//         email: 'kristin.watson@example.com',
//         title: 'Lean Implementation Liaison',
//         department: 'Mobility',
//         status: 'Inactive',
//         role: 'Admin',
//         age: 36,
//         imgUrl: 'https://images.unsplash.com/photo-1532417344469-368f9ae6d187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
//       },
//       {
//         name: 'Cameron Williamson',
//         email: 'cameron.williamson@example.com',
//         title: 'Internal Applications Engineer',
//         department: 'Security',
//         status: 'Active',
//         role: 'Member',
//         age: 24,
//         imgUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
//       },
//     ]
//     return [...data]
//   }

const User = () => {
    const [user, setUser] = useState([])
    

    const getUser = async () => {
        const data = []
        try {
            const token = localStorage.getItem("token2");
            // const profile = await axios.get('http://localhost:8080/listAkunUser')
            await axios.get('http://localhost:8080/listAkunUser', {
                headers :
                    {      
                        "authorization": token,      
                    }  
            })
            .then((response) => {
               //response.data.forEach((user) => {
                //      const data1 = {
                //         id_user: user.id_user,
                //         name : user.username,
                //         email : user.email,
                //         phone : user.phone,
                //         department: 'Security',
                //         status: 'Active',
                //         role: 'Member',
                //         age: 24,
                //         imgUrl : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60'
                //     }
                //     data.push(data1)
                // })
                // setUser(data)
                // console.log(user);
            })
    
        } catch (err) {
            console.log(err);
        }
        
        
    }

    const log= (user_id) => {
        console.log(user_id)
    }
    React.useEffect(() => {
        console.log('useEffect');
        getUser()
    }, [])

    return (
        <>
            <Navbar />
            <div className="App" style={{ height: "100%" }}>
            <div className="min-h-screen bg-gray-100 text-gray-900">
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                <div className="">
                <h1 className="text-xl">List User</h1>
                <button onClick={getUser}>Click to get user</button>
                </div>
                <div className="mt-4">
                    {user.map( (user) => 
                        <a onClick={ () => {log(user.id_user);}}>{user.name}<br></br></a>
                    )}
                </div>
            </main>
            </div>
        </div>
        </>
    )
}

export default User