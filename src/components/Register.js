import {React, useState, useEffect} from "react"
import { Link, useNavigate } from "react-router-dom"
import { Endpoints } from "../api/endpoints"
import axios from "axios"
import "../css/registration.css"

const Register = () =>{

    let userDataDefault = {
        password:"",//
        login: "",//
        email:"",//
        fullName:"",//
        companyName:"",//
        phoneNumber:"",
        address:"",
        certainPlaceAddress:"",
        appAccess:"k",
        desiredRole:"USER"
    }
    const [userData, setUserData] = useState(userDataDefault)

    const [password2, setPassword2] = useState("")

    const navigate = useNavigate()

    useEffect(()=>{ console.log(userData)}, [userData])

    const validatePassword = (e) => {
        let passwordField1 = document.getElementById("passwordField1")
        let passwordField2 = document.getElementById("passwordField2")

        if(e.target.id === "passwordField1") setUserData(userData => ({...userData, ...{password: e.target.value}}))
        else if(e.target.id === "passwordField2") setPassword2(e.target.value)

        if(passwordField1.value !== passwordField2.value){
            passwordField1.style.color = "red"
            passwordField2.style.color = "red"
        }else{
            passwordField1.style.color = "black"
            passwordField2.style.color = "black"
        }
    }

    const registerNewUser = () => {
        let passwordField1 = document.getElementById("passwordField1")
        let passwordField2 = document.getElementById("passwordField2")

        if(passwordField1.value !== passwordField2.value){
            passwordField1.style.color = "red"
            passwordField2.style.color = "red"
            return;
        }else{
            passwordField1.style.color = "black"
            passwordField2.style.color = "black"
        }

        // let accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
      
        const config = {
          headers:{
            // 'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json;charset=utf-8'
          }
        };

        console.log(userData)

        axios.post(Endpoints.API.REGISTER, JSON.stringify(userData), config).then((res) => {

            console.log(res.data)


            navigate("/login")
            // showMessage("msg_password", "Пароль успешно изменен", 3000)

        }).catch((error) =>{

          console.log(error)

        //   showMessage("msg_password", "Произошла ошибка", 5000)
        }); 

    }




    return (    
        <>

            <div className="reg_container">
                <div className="form_reg_block">
        
                    <div className="logo"></div>
                    <p className="form_reg_block_header">Регистрация</p>
        
        
                        <form id="reg_form" className="form_reg_style" method="post">
        
                            <div className="form_reg_block_content">
                                <div>
                                    <div className="center">
                                        <div className="reg_field_container">
                                            <p>Выберите тип учетной записи:</p>
                                            <select className="role_selector" name="reg_role" value={userData.desiredRole} onChange={e => {setUserData(userData => ({...userData, ...{desiredRole: e.target.value}}))}}>
                                                <option value="USER">Дизайнер</option>
                                                <option value="SHOP">Салон</option>
                                                <option value="SUPPLIER">Поставщик материала</option>
                                            </select>
                                        </div>
                                    </div>
        
                                    <div className="center">
                                        <div className="reg_field_container">
                                            <p>Логин:</p>
                                            <input className="textfield" type="text" name="reg_login" placeholder="Введите логин" required value={userData.login} onChange={e => {setUserData(userData => ({...userData, ...{login: e.target.value}}))}}/>
                                        </div>
                                    </div>
        
                                    <div className="center">
                                        <div className="reg_field_container">
                                            <p>Пароль:</p>
                                            <input id="passwordField1" className="textfield" type="password" name="reg_password" placeholder="Введите пароль" required value={userData.password} onChange={e => {validatePassword(e)}}/>
                                        </div>
                                    </div>
                                    <div className="center">
                                        <div className="reg_field_container">
                                            <p>Повторите пароль:</p>
                                            <input id="passwordField2"  className="textfield" type="password" name="reg_password_repeat" placeholder="Повторите пароль" required value={userData.password2} onChange={e => {validatePassword(e)}}/>
                                        </div>
                                    </div>
                                </div>
                                <div>
        
                                    <div className="center">
                                        <div className="reg_field_container">
                                            <p>Email:</p>
                                            <input className="textfield" type="email" name="reg_email" placeholder="Введите email" required value={userData.email} onChange={e => {setUserData(userData => ({...userData, ...{email: e.target.value}}))}}/>
                                        </div>
                                    </div>
                                    <div className="center">
                                        <div className="reg_field_container">
                                            <p>ФИО:</p>
                                            <input className="textfield" type="text" name="reg_fullName" placeholder="ФИО" required value={userData.fullName} onChange={e => {setUserData(userData => ({...userData, ...{fullName: e.target.value}}))}}/>
                                        </div>
                                    </div>
                                    <div className="center">
                                        <div className="reg_field_container">
                                            <p>Компания:</p>
                                            <input className="textfield" type="text" name="reg_company" placeholder="Компания" required value={userData.companyName} onChange={e => {setUserData(userData => ({...userData, ...{companyName: e.target.value}}))}}/>
                                        </div>
                                    </div>
                                    <div className="center">
                                        <div className="reg_field_container">
                                            <p>Адрес:</p>
                                            <input className="textfield" type="text" name="reg_certain_place_address" placeholder="Адрес" required value={userData.address} onChange={e => {setUserData(userData => ({...userData, ...{address: e.target.value}}))}}/>
                                        </div>
                                    </div>
                                    <div className="center">
                                        <div className="reg_field_container">
                                            <p>Номер телефона:</p>
                                            <input className="textfield" type="text" name="reg_phone_number" placeholder="Номер телефона" required value={userData.phoneNumber} onChange={e => {setUserData(userData => ({...userData, ...{phoneNumber: e.target.value}}))}}/>
                                        </div>
                                    </div>
        
                                </div>
                            </div>
        
        
        
                            <button className="form_reg_button" type="submit" name="form_reg_submit" onClick={e=> {e.preventDefault(); registerNewUser()}}>Зарегистрироваться</button>
                        </form>
        
        
            
        
        
                    <div className="forgot_link"><Link to="/login"> Уже зарегистрированы?</Link></div>
                </div>
            </div>


        </>

    )
}

export default Register