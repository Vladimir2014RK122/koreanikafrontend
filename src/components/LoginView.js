import axios from "axios";
import React, { useState } from "react";
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from "../constants";
import { useAuth } from "../hook/useAuth";
import "../css/loginView.css"
import { Link, useNavigate } from "react-router-dom";

const LoginView  = ()=>{

    const {signin} = useAuth()
    const navigate = useNavigate()

    const [loginValue, setLogin] = useState("")
    const [passwordValue, setPassword] = useState("")
    const [wrongPassword, setWrongPassword] = useState(false)

    // constructor(props){
    //     super(props)

    //     this.state = {
    //         login:"",
    //         password:"",
    //         wrongPassword : false
    //     }

    //     this.loginResult = this.loginResult.bind(this)
    // }

    
    const loginFault = ()=>{
        setWrongPassword(true)
        setTimeout(()=>{
            setWrongPassword(false)
        }, 4000);
    }

    
     return (
        <div className="auth_container">
            <div className="form_auth_block">

                <div className="logo"></div>

                <p className="form_auth_block_header">Авторизация</p>

                 <form className="login_form" onSubmit={(e) => {e.preventDefault(); signin(loginValue, passwordValue, ()=>{navigate("/dashboard", {replace: true})},loginFault)}}>
                    <div className="center">
                        <div className="form_auth_login_block">
                            <p>Логин:</p>
                            <div className="auth_icon_block"><i className="fa-solid fa-user"></i></div>
                            <input id="inputLogin" className="textfield" type="text" onChange={(e)=>setLogin(e.target.value)} name="auth_login" placeholder="Логин или email" required/>
                        </div>
                    </div>


                    <div className="center">
                        <div className="form_auth_password_block">
                            <p>Пароль:</p>
                            <div className="auth_icon_block"><i className="fa-solid fa-lock"></i></div>
                            <input id="inputPassword" className="textfield" type="password" onChange={(e)=>setPassword(e.target.value)} name="auth_password" placeholder="Введите пароль" required/>
                        </div>
                    </div>
                    <input id="btn_submit" className="form_auth_button" type="submit"  name="form_auth_submit" value="Войти"></input>

                </form>
                            
                <form id="auth_form" className="form_auth_style" method="post"></form>
                <div className="fogot_link"><Link to="/register"> Зарегистрироваться</Link></div>
                <div className="fogot_link"><Link to="/forgotPassword"> Забыли пароль?</Link></div>
                <div id="message" className="wrong_password" > {wrongPassword? "Неверный Логин или пароль":""}</div>
            </div>
        </div>
    )
    

}

export default LoginView