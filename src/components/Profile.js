import {React, useState, useEffect} from "react";
import { useAuth } from "../hook/useAuth";
import { Endpoints } from "../api/endpoints";
import { ACCESS_TOKEN_NAME } from "../constants";
import axios from "axios";

import "../css/profile.css"

const Profile = () => {

    const [userInfo, setUserInfo] = useState({        

        login: "",
        email: "",
        fullName: "",
        companyName: "",
        phoneNumber: "",
        address: "",
        certainPlaceAddress: ""})

        const [oldPassword, setOldPassword] = useState("")
        const [newPassword1, setNewPassword1] = useState("")
        const [newPassword2, setNewPassword2] = useState("")

    useEffect(() => {

        getUserInfo()

    },[])

    const getUserInfo = () =>{

        let accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
      
        const config = {
          headers:{
            'Authorization': 'Bearer ' + accessToken,
          }
        };

        axios.get(Endpoints.API.USER_OWN_INFO, config).then((res) => {

            console.log(res.data)
            setUserInfo(res.data)
          
        }).catch((error) =>{

          console.log(error)
        }); 

    }

    const editUserInfo = () =>{

        let accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
      
        const config = {
          headers:{
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json;charset=utf-8'
          }
        };

        let newUserData = {
            // email:userInfo.email,
            fullName: userInfo.fullName,
            companyName: userInfo.companyName,
            phoneNumber: userInfo.phoneNumber,
            address: userInfo.address,
            certainPlaceAddress: userInfo.certainPlaceAddress
        }

        console.log(newUserData)

        axios.put(Endpoints.API.USER_OWN_EDIT_INFO, JSON.stringify(newUserData), config).then((res) => {

            console.log(res.data)


            showMessage("msg_profile", "Сохранено", 3000)

        }).catch((error) =>{

          console.log(error)

          showMessage("msg_profile", "Произошла ошибка", 5000)
        }); 

    }

    const showMessage = (elementId, message, time) =>{

        let p = document.getElementById(elementId);
        p.hidden = false
        p.textContent = message
        setTimeout(()=>{
            p.hidden = true
            p.textContent = ""
        }, time)
    }



    const validateNewPassword = (e) => {

        if(e.target.id === "newPasswordField1") setNewPassword1(e.target.value)
        else if(e.target.id === "newPasswordField2") setNewPassword2(e.target.value)

        let field1 = document.getElementById("newPasswordField1")
        let field2 = document.getElementById("newPasswordField2")

        if(field1.value !== field2.value){
            field1.style.color = "red"
            field2.style.color = "red"
        }else{
            field1.style.color = "black"
            field2.style.color = "black"
        }
    }

    const changeOwnPassword = () => {

        let oldPasswordField = document.getElementById("oldPasswordField")

        let newPasswordField1 = document.getElementById("newPasswordField1")
        let newPasswordField2 = document.getElementById("newPasswordField2")

        if(newPasswordField1.value !== newPasswordField2.value){
            newPasswordField1.style.color = "red"
            newPasswordField2.style.color = "red"
            showMessage("msg_password", "Пароли не совпадают", 5000)
            return;
        }else{
            newPasswordField1.style.color = "black"
            newPasswordField2.style.color = "black"
        }


        let accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
      
        const config = {
          headers:{
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json;charset=utf-8'
          }
        };

        let newData = {
            oldPassword: oldPasswordField.value,
            newPassword: newPasswordField1.value
        }

        console.log(newData)

        axios.put(Endpoints.API.USER_CHANGE_OWN_PASSWORD, JSON.stringify(newData), config).then((res) => {

            console.log(res.data)


            showMessage("msg_password", "Пароль успешно изменен", 3000)

        }).catch((error) =>{

          console.log(error)

          showMessage("msg_password", "Произошла ошибка", 5000)
        }); 

    }

    return(
        <>
            <div className="container">
                <div className="container_mid">
                    <div className="container_info">

                        <div className="header"> <p >Профиль пользователя</p></div>

                        <div className="data_body">
                            <div className="user_data_container">
                                {/* <!--                    <div className="center">-->
                                <!--                        <div className="field_container">-->
                                <!--                            <p>Тип учетной записи:</p>-->
                                <!--                            <select className="role_selector" name="role">-->
                                <!--                                <option value="ROLE_ADMIN">Администратор</option>-->
                                <!--                                <option value="ROLE_MODERATOR">Модератор</option>-->
                                <!--                                <option value="ROLE_SUPPLIER">Поставщик материала</option>-->
                                <!--                                <option value="ROLE_SHOP">Салон</option>-->
                                <!--                                <option value="ROLE_USER">Дизайнер</option>-->
                                <!--                            </select>-->
                                <!--                        </div>-->
                                <!--                    </div>--> */}

                                <div className="center">
                                    <div className="field_container">
                                        <p>Логин:</p>
                                        <input className="textfield" type="text" name="login" placeholder="Введите логин" required value={userInfo.login} onChange={e=>{setUserInfo(userInfo => ({...userInfo, ...{login: e.target.value}}))}}/>
                                    </div>
                                </div>
                                <div className="center">
                                    <div className="field_container">
                                        <p>Email:</p>
                                        <input className="textfield" type="email" name="email" placeholder="Введите email" required value={userInfo.email} onChange={e=>{setUserInfo(userInfo => ({...userInfo, ...{email: e.target.value}}))}}/>
                                    </div>
                                </div>
                                <div className="center">
                                    <div className="field_container">
                                        <p>ФИО:</p>
                                        <input className="textfield" type="text" name="fullName" placeholder="ФИО" required value={userInfo.fullName} onChange={e=>{setUserInfo(userInfo => ({...userInfo, ...{fullName: e.target.value}}))}}/>
                                    </div>
                                </div>
                                <div className="center">
                                    <div className="field_container">
                                        <p>Компания:</p>
                                        <input className="textfield" type="text" name="company" placeholder="Компания" required value={userInfo.companyName} onChange={e=>{setUserInfo(userInfo => ({...userInfo, ...{companyName: e.target.value}}))}}/>
                                    </div>
                                </div>

                            </div>
                            <div className="user_data_container">


                                <div className="center" hidden>
                                    <div className="field_container">
                                        <p>Адрес компании:</p>
                                        <input className="textfield" type="text" name="address" placeholder="Адрес компании" required value={userInfo.address} onChange={e=>{setUserInfo(userInfo => ({...userInfo, ...{address: e.target.value}}))}}/>
                                    </div>
                                </div>
                                <div className="center">
                                    <div className="field_container">
                                        <p>Адрес салона продаж:</p>
                                        <input className="textfield" type="text" name="certain_place_address" placeholder="Адрес салона продаж" required value={userInfo.certainPlaceAddress} onChange={e=>{setUserInfo(userInfo => ({...userInfo, ...{certainPlaceAddress: e.target.value}}))}}/>
                                    </div>
                                </div>
                                <div className="center">
                                    <div className="field_container">
                                        <p>Номер телефона:</p>
                                        <input className="textfield" type="text" name="phone_number" placeholder="Номер телефона" required value={userInfo.phoneNumber} onChange={e=>{setUserInfo(userInfo => ({...userInfo, ...{phoneNumber: e.target.value}}))}}/>
                                    </div>
                                </div>
        {/* <!--                        <div className="center">-->
        <!--                            <div className="field_container">-->
        <!--                                <p>Доступные приложения:</p>-->
        <!--                                <div className="app_access">-->
        <!--                                    <div><input type="checkbox" name="all" ${access.all} onclick="changeFileAccess(${idFile})"> <label >all</label></div>-->
        <!--                                    <div><input type="checkbox" name="km" ${access.KM} onclick="changeFileAccess(${idFile})"> <label >KM</label></div>-->
        <!--                                    <div><input type="checkbox" name="k" ${access.K} onclick="changeFileAccess(${idFile})"> <label>K</label></div>-->
        <!--                                    <div><input type="checkbox" name="z" ${access.Z} onclick="changeFileAccess(${idFile})"> <label>Z</label></div>-->
        <!--                                    <div><input type="checkbox" name="pm" ${access.PM} onclick="changeFileAccess(${idFile})"> <label>PM</label></div>-->
        <!--                                </div>-->
        <!--                            </div>-->
        <!--                        </div>--> */}
                            </div>
                        </div>


                        <div className="msg_container" hidden> <p id="msg_profile" > </p></div>

                        <div className="btn_save_container">
                            <input className="btn" type="button" value="Отменить" onClick={() => {getUserInfo()}}/>
                            <input className="btn" type="button" value="Сохранить" onClick={() => {editUserInfo()}}/>
                        </div>

                        <div className="header"> <p>Изменение пароля</p></div>
                        <div className="password_body">
                            <div className="user_data_container">

                                <div className="center">
                                    <div className="field_container">
                                        <p>Старый пароль:</p>
                                        <input id="oldPasswordField" className="textfield" type="password" name="pw" placeholder="Введите старый пароль" required value={oldPassword} onChange={e => {setOldPassword(e.target.value)}}/>
                                    </div>
                                </div>
                            </div>
                            <div className="user_data_container">


                                <div className="center">
                                    <div className="field_container">
                                        <p>Новый пароль:</p>
                                        <input id="newPasswordField1" className="textfield" type="password" name="pw_new" placeholder="Введите новый пароль" required  value={newPassword1} onChange={e => {validateNewPassword(e)}}/>
                                    </div>
                                </div>
                                <div className="center">
                                    <div className="field_container">
                                        <p>Повторите новый пароль:</p>
                                        <input id="newPasswordField2" className="textfield" type="password" name="pw_new_repeat" placeholder="Повторите новый пароль" required  value={newPassword2} onChange={e => {validateNewPassword(e)}}/>
                                    </div>
                                </div>


                            </div>
                        </div>

                        <div className="msg_container" hidden> <p id="msg_password" ></p></div>
                        <div className="btn_change_password_container">

                            <input className="btn" type="button" value="Изменить" onClick={() => { changeOwnPassword()}}/>
                        </div>
                    </div>

                </div>


            </div>
        </>
    )
}

export default Profile