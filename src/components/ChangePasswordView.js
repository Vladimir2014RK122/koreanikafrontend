import {React, useState, useEffect} from "react"
import { Link, useNavigate, useSearchParams, useParams, useLocation} from "react-router-dom"
import { Endpoints } from "../api/endpoints"
import { ACCESS_TOKEN_NAME } from "../constants"

import axios from "axios"
import "../css/restorePass.css"

const ChangePasswordView = () =>{

    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")

    const [valid, setValid] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate()
    const location = useLocation()

    const sendRequest = () => {
        
        //  console.log(searchParams)
        //  console.log(location)
        if(!valid){
            showMessage("Пароли не совпадают", 5000, ()=>{})
        }

        const sParams = new URLSearchParams(location.search);
        console.log(sParams.get('token'));

        let restoreToken = sParams.get('token')

        const config = {
            headers:{
                'Authorization': 'Bearer ' + restoreToken,
                'Content-Type': 'application/json;charset=utf-8'
            }
          };
  
          let data = {
            restoreToken: restoreToken,
            newPassword:password1,
          }
          console.log(data)
  
          axios.put(Endpoints.API.RESTORE_PASSWORD, JSON.stringify(data), config).then((res) => {
  
              console.log(res.data)

              // showMessage("msg_password", "Пароль успешно изменен", 3000)
              showMessage("Пароль успешно восстановлен", 5000, ()=>{navigate("/login")})
  
          }).catch((error) =>{
  
            console.log(error)
  
            showMessage("Пароль не соответствует", 5000, ()=>{})
          }); 
    }

    const showMessage = (message, time, cb) =>{

        let p = document.getElementById("message");

        p.textContent = message
        setTimeout(()=>{
            p.textContent = ""
            cb()
        }, time)
    }

    const validateNewPassword = (e) => {

        if(e.target.id === "password1") setPassword1(e.target.value)
        else if(e.target.id === "password2") setPassword2(e.target.value)

        let field1 = document.getElementById("password1")
        let field2 = document.getElementById("password2")

        if(field1.value !== field2.value){
            field1.style.color = "red"
            field2.style.color = "red"
            setValid(false)
        }else{
            field1.style.color = "black"
            field2.style.color = "black"
            setValid(true)
        }
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
                            <p>Создайте новый пароль:</p>
                            <input id="password1" className="textfield" type="password" name="password" placeholder="Новый пароль" required value={password1} onChange={e => {validateNewPassword(e)}}/>
                            <p>Повторите пароль:</p>
                            <input id="password2" className="textfield" type="password" name="password" placeholder="Повторите пароль" required value={password2} onChange={e => {validateNewPassword(e)}}/>
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

export default ChangePasswordView