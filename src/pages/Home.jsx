import React, {useEffect , useState} from 'react'
import { useFirebase } from '../context/firebase'
import Cards from '../components/Cards';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const firebase = useFirebase();
    const navigate = useNavigate();

    const handleLogout = async() => {
        await firebase.logout();
        navigate('/login');
        }

    const [profiledata, setProfileData] = useState(null);
    const [profile, setProfile] = useState(null);
    useEffect(() => {
        if(!(firebase.isLoggedIn)) {
            //naggigate to home page
            navigate("/register");
    
        }
      },[firebase, navigate]);

    useEffect(() => {
        firebase.listAllBooks().then((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => doc.data());
            setProfileData(data);
            // firebase.listAllBooks().then((profiledata) => setProfileData(profiledata));
            // firebase.listAllBooks().then((docs) => console.log(docs.docs[0].data()));
            // console.log("this is profiling",profiledata.docs[0].data());
          });
        }, [firebase]);
        



  
    // console.log("this is user details",firebase.user.email)
    useEffect(() => {
        let time = 0;
        if (profiledata !== null  && firebase.user && firebase.user.email) {
          for (let i = 0; i < profiledata.length; i++) {
            if (firebase.user.email === profiledata[i].userEmail && time < profiledata[i].timestap) {
              console.log("inside if of for")
              setProfile(profiledata[i]);
              time = profiledata[i].timestap;
            }
          }
        }
      }, [profiledata, firebase]);

    
    

//   console.log(profiledata) 
  return (
<div className='container mt-5'>
<button onClick={handleLogout} id="logout-btn">Logout</button>
<br/><br/><br/>
      <h1>Profile Data</h1>
      {profiledata === null ? (
        <h3>Fetching data...</h3>
      ) : profiledata.length > 0 ? (
        <Cards key={profile?.id} {...profile} />
      ) : (
        <h3>No profile data available.</h3>
      )}
    </div>
  );
}

export default Home