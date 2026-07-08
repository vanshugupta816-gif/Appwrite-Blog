import { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux'
import authService from './Appwrite/Auth';
import { login, logout } from './Store/AuthSlice';
import { Footer, Header } from './Component/Index';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then( (userData) => {
      if(userData){
        // We ar not storing the entire Appwrite SDK model object into our redux store because it contains methods also...
        // So we Store only the fields that we actually need...
        dispatch(
          login({
            userData: {
              $id: userData.$id,
              name: userData.name,
              email: userData.email,
              emailVerification: userData.emailVerification,
            },
          }),
        );

      }
      else{
        dispatch(logout())
      }

    })
    .finally( () => {
      setLoading(false)
    });
  },[])


      return !loading ? (
        <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
          <div className="w-full block text-center">
            <Header />
              <main>
                <Outlet/>
              </main>
            <Footer />
          </div> 
        </div>
        
      ) : (<div>Loading...</div>);
}

export default App
