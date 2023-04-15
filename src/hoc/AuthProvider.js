import { createContext, useEffect, useState } from "react";
import { Navigate, useNavigate, Location, useLoaderData, useLocation } from "react-router-dom";
import axios from "axios";
import { Endpoints } from '../api/endpoints'
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '../constants'

export const AuthContext = createContext(null)

export const AuthProvider = ({children}) =>{

    const navigate = useNavigate()
    const location = useLocation()
    const [user, setUser] = useState(null);


    
    

    useEffect(() => {
        
        let intervalId = setInterval(()=>{
            console.log("check auth")
            checkAuth()
            checkAccessToken()
            checkRefreshToken()
        }, 5000)

        return ()=>{
            clearInterval(intervalId)
            console.log("clear")
        }

    }, [])

    useEffect(() =>{
        console.log("change location")
        checkAuth()
    }, [location])

    const signin = (login, password, successCb, faultCb) =>{

        let loginData = {
            "login": login,
            "password":password
        }
      
        // console.log(loginData)
      
        const config = {
          headers:{
              'Content-Type': 'application/json;charset=utf-8'
          }
        };
        axios.post(Endpoints.AUTH.LOGIN, JSON.stringify(loginData), config).then((res) => {
      
          let accessToken = res.data[ACCESS_TOKEN_NAME]
          let refreshToken = res.data[REFRESH_TOKEN_NAME]

          setUser(JSON.parse(atob(accessToken.split('.')[1])))
      
          console.log(user)
          // console.log(JSON.parse(atob(accessToken.split('.')[1])))
      
          localStorage.setItem(ACCESS_TOKEN_NAME, accessToken)
          localStorage.setItem(REFRESH_TOKEN_NAME, refreshToken)
      
          successCb(user);
          
        }).catch((error) =>{
          faultCb();
          console.log(error)
        }); 
    }

    const signout = (cb) =>{

        localStorage.removeItem(ACCESS_TOKEN_NAME)
        localStorage.removeItem(REFRESH_TOKEN_NAME)

        setUser(null);
        // navigate("/login", {replace: true})
        cb();
    }

    const checkAuth = () => {
    
        let accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
        let refreshToken = localStorage.getItem(REFRESH_TOKEN_NAME);

         
      
        if(accessToken === null || accessToken === undefined
            || refreshToken === null || refreshToken === undefined ){
      
                // if(location.pathname !== "/login"){
                    // console.log("go to login")
                    setUser(null)
                    // navigate("/login", {replace: true})
                    
                // }
                return;
        }
      
        const config = {
          headers:{
            'Authorization': 'Bearer ' + accessToken
          }
        }
        axios.get(Endpoints.AUTH.ME,config).then((res) =>{
      
            if(user === null)setUser({loginName:res.data['login'], role: res.data['roleName']})
            
            console.log(location)
            if(location.pathname === "/login"){
                navigate("/dashboard", {replace: true})
            }
      
        }).catch((error) =>{
            // setUser(null)
            console.log(error)
            updateAccessToken()
        })
    }

    const updateAccessToken = () => {

        let accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
        let refreshToken = localStorage.getItem(REFRESH_TOKEN_NAME);

        if(accessToken === null){
            return;
        } 
      
        const config = {
          headers:{
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json;charset=utf-8'
          }
        }
      
        axios.post(Endpoints.AUTH.AUPDATE_ATOKEN, `{"${REFRESH_TOKEN_NAME}": "${refreshToken}"}`, config).then((res) =>{
            let newAccessToken = res.data[ACCESS_TOKEN_NAME]
            
            if(newAccessToken == null){
                console.log("FAIL TO UPDATE ACCESS TOKEN")
            }else{
                console.log("SUCCESS UPDATE ACCESS TOKEN")

                localStorage.setItem(ACCESS_TOKEN_NAME, newAccessToken)
            }
               
        }).catch((error) => {
            setUser(null);
            // navigate("/login", {replase:true})
        })
    }

    const updateRefreshToken = () => {

        let accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
        let refreshToken = localStorage.getItem(REFRESH_TOKEN_NAME);

        if(accessToken === null) return;

        const config = {
            headers:{
              'Authorization': 'Bearer ' + accessToken,
              'Content-Type': 'application/json;charset=utf-8'
            }
          }

        axios.post(Endpoints.AUTH.RUPDATE_ATOKEN, `{"${REFRESH_TOKEN_NAME}": "${refreshToken}"}`, config).then((res) =>{

            let newAccessToken = res.data[ACCESS_TOKEN_NAME]
            let newRefreshToken = res.data[REFRESH_TOKEN_NAME]

            localStorage.setItem(ACCESS_TOKEN_NAME, newAccessToken)
            localStorage.setItem(REFRESH_TOKEN_NAME, newRefreshToken)
      
            if(newAccessToken == null){
                  // this.setState({auth:false})
                console.log("FAIL TO UPDATE REFRESH TOKEN")
            }else{
                console.log("SUCCESS UPDATE REFRESH TOKEN")
            }
               
                // this.setState({auth:true})
        }).catch((error) => {
              // this.setState({auth:false})
            setUser(null);
            // navigate("/login", {replase:true})
        })

    }

    const checkAccessToken = () => {

        let accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);

        if(accessToken === null){
           return;
        }

        let decodedToken = JSON.parse(atob(accessToken.split('.')[1]))
    
        let now = new Date();
        let date = new Date (decodedToken.exp*1000);
    
        if(date.getTime() - now.getTime() < 60000){
            updateAccessToken()
        }
    }

    const checkRefreshToken = () => {

        let refreshToken = localStorage.getItem(REFRESH_TOKEN_NAME);

        if(refreshToken === null) return;

        let decodedToken = JSON.parse(atob(refreshToken.split('.')[1]))
    
        let now = new Date();
        let date = new Date (decodedToken.exp*1000);
    
        if(date.getTime() - now.getTime() < 60000){
            updateRefreshToken()
        }
    }

    const value = {user, signin, signout}

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}