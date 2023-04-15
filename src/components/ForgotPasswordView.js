import {React, useState, useEffect} from "react"
import { Link, useNavigate } from "react-router-dom"
import { Endpoints } from "../api/endpoints"
import axios from "axios"
import "../css/restorePass.css"

const ForgotPasswordView = () =>{

    const [email, setEmail] = useState("")

    const sendRequest = () => {

        const config = {
            headers:{
              // 'Authorization': 'Bearer ' + accessToken,
              'Content-Type': 'application/json;charset=utf-8'
            }
          };
  
          let data = {
            message:email
          }
          console.log(data)
  
          axios.post(Endpoints.API.FORGOT_PASSWORD, JSON.stringify(data), config).then((res) => {
  
              console.log(res.data)

              // showMessage("msg_password", "Пароль успешно изменен", 3000)
              showMessage("На вашу почту отправлена ссылка для восстановление пароля", 5000)
  
          }).catch((error) =>{
  
            console.log(error)
  
            showMessage("Такой почты не существует", 5000)
          }); 
    }

    const showMessage = (message, time) =>{

        let p = document.getElementById("message");

        p.textContent = message
        setTimeout(()=>{
            p.textContent = ""
        }, time)
    }
    return(
        <>
        <div className="container_forgot_password">
            <div className="form_block_forgot_password">

                <div className="logo"></div>

                <p className="form_block_header">Восстановление пароля</p>

                <form className="formEmail">
                    <div className="center">
                        <div className="form_auth_login_block">
                            <p>Введите email:</p>
                            <input className="textfield" type="email" name="email" placeholder="Введите email" required value={email} onChange={e => {setEmail(e.target.value)}}/>
                        </div>
                    </div>

                    <input id="btn_submit" className="form_auth_button" type="submit" name="form_auth_submit" value="Отправить" onClick={e =>{e.preventDefault(); sendRequest()}}/>

                </form>

                <div className="center"> <p id="message" className="message" ></p> </div>
            </div>
        </div>
        </>
    )
}

export default ForgotPasswordView