import React, {useRef, useState, useEffect} from "react";
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
const Chats = () => {
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const handleLogout = async () =>{
        await auth.signOut();

        history.push('/');
    }

    const getFile = async(url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg",{ type:"image/jpeg"})
    }
    useEffect(() => {
        if(!user) {
            history.push('/');

            return;
        }
        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id":"a449e103-ba17-435c-b458-5fbd0d3a1778",
                "user-name" :user.email,
                "user-secret": user.uid,
            }
        })
        .then(() => {
            setLoading(false);
        })
        .catch(() => {
            let formdata = new FormData();
            formdata.append('email',user.email);
            formdata.append('username',user.email);
            formdata.append('secret',user.uid);

            getFile(user.photoURL)
                .then((avatar) =>{
                    formdata.append('avatar', avatar, avatar.name);

                    axios.post('https://api.chatengine.io/users/',
                        formdata,
                        {headers:{"private-key":"7178f4ae-0c2f-48cf-b270-0bb63dddf3c1" } }
                    )
                    .then(() => setLoading(false))
                    .catch((error) => console.log(error))
                })
        })
    }, [user , history]);

      if(!user || loading) return '...' ; 

    return(
       
       <div className="chats-page">
           <div className ="nav-bar">
               <div className="logo-tab">
                   Messonger
               </div>
               <div onClick={handleLogout} className="logout-tab">
            
                Sign Out
               </div>
           </div>
           <ChatEngine
                height = "calc(100vh - 66px)"
                projectID="a449e103-ba17-435c-b458-5fbd0d3a1778"
                userName={user.email}
                userSecret={user.uid}
                />
       </div>
    );
}

export default Chats;