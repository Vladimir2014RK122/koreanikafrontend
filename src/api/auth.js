import axios from 'axios'
import { Endpoints } from './endpoints'
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '../constants'

// const BASE_URL = 'http://localhost:8080'


export const login = (loginValue, passwordValue, successCallback) => {
  // let login = document.getElementById("inputLogin").value
  // let password = document.getElementById("inputPassword").value

  let loginData = {
      "login": loginValue,
      "password":passwordValue
  }

  // console.log(loginData)

  const config = {
    headers:{
        'Content-Type': 'application/json;charset=utf-8'
    }
  };
  axios.post("http://localhost:8080/auth", JSON.stringify(loginData), config).then((res) => {

    // console.log(res.status)


    let accessToken = res.data[ACCESS_TOKEN_NAME]
    let refreshToken = res.data[REFRESH_TOKEN_NAME]

    let userRole = JSON.parse(atob(accessToken.split('.')[1])).roles

    // console.log(res.data)
    // console.log(JSON.parse(atob(accessToken.split('.')[1])))

    localStorage.setItem(ACCESS_TOKEN_NAME, accessToken)
    localStorage.setItem(REFRESH_TOKEN_NAME, refreshToken)

    successCallback(loginData.login, userRole);
    
  }).catch((error) =>{
    // resultCallBack(0)
    console.log(error)
  });  
}

export const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN_NAME)
  localStorage.removeItem(REFRESH_TOKEN_NAME)

  // window.location.replace("/login")
}

export const checkAuth = () => {
    
  let accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
  let refreshToken = localStorage.getItem(REFRESH_TOKEN_NAME);

  if(accessToken === null || accessToken === undefined
      || refreshToken === null || refreshToken === undefined ){

  
      return;
  }

  const config = {
    headers:{
      'Authorization': 'Bearer ' + accessToken
    }
  }
  axios.get(Endpoints.AUTH.ME,config).then((res) =>{

    let userRole = res.data['roleName']
    let userLogin = res.data['login']  
    console.log(userRole)


  }).catch((error) =>{
    console.log(error)
    updateAccessToken()
  })
}

const updateAccessToken = () => {

  let accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
  let refreshToken = localStorage.getItem(REFRESH_TOKEN_NAME);

  const config = {
    headers:{
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json;charset=utf-8'
    }
  }

  axios.post(Endpoints.AUTH.AUPDATE_ATOKEN, `{"${REFRESH_TOKEN_NAME}": "${refreshToken}"}`, config).then((res) =>{
          let newAccessToken = res.data[ACCESS_TOKEN_NAME]
          localStorage.setItem(ACCESS_TOKEN_NAME, newAccessToken)

          if(newAccessToken == null){
            // this.setState({auth:false})
          }
          console.log("SUCCESS UPDATE ACCESS TOKEN")
          // this.setState({auth:true})
      }).catch((error) => {
        // this.setState({auth:false})
        window.location.replace("/login")
      })
}

