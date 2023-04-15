import {React, useState, useEffect} from "react";
import axios from "axios";
import { ACCESS_TOKEN_NAME } from "../constants";
import { Endpoints } from "../api/endpoints";
import "../css/userList.css"
import userLogoImg from "../images/user_no_logo.png"

const UsersList = () => {


    const [usersList, setUsersList] = useState([])
    const [selectedUserId, setSelectedUserId] = useState(-1)
    const [selectedUserInfo, setSelectedUserInfo] = useState({address: "Москва Кремль",
        appAccess: ",k,z",
        certainPlaceAddress: "Москва Кремль",
        companyName: "Гугл",
        email: "designer11@mail.ru",
        enabled: true,
        fullName: "Дизайнер от бога №1",
        id: 3,
        keyManagerId: 0,
        login: "designer1",
        phoneNumber: "+7001333",
        roleEntity: {id: 4, name: 'ROLE_KEYMANAGER'}})

    const [userEnable, setUserEnable] = useState(true)
    const [userRole, setUserRole] = useState("")
    const [userLogin, setUserLogin] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [userCompany, setUserCompany] = useState("")
    const [userAddress, setUserAddress] = useState("")
    const [userCertainAddress, setUserCertainAddress] = useState("")
    const [userPhone, setUserPhone] = useState("")

    const [appAccessK, setAppAccessK] = useState("")
    const [appAccessKM, setAppAccessKM] = useState("")
    const [appAccessZ, setAppAccessZ] = useState("")
    const [appAccessPM, setAppAccessPM] = useState("")
    const [appAccessAll, setAppAccessAll] = useState("")

    useEffect(() => {

        updateUsersList()

        let intervalId = setInterval(()=>{
            // console.log("updateUsersList")
            updateUsersList()
            
        }, 10000)

        return ()=>{
            clearInterval(intervalId)
            // console.log("clear updateUsersList")   
        }

    }, [])

    useEffect(()=>{

        if(selectedUserId === -1) {

            if(usersList !== undefined && usersList !== null && usersList.length !== 0 && usersList[0].id !== undefined)setSelectedUserId(usersList[0].id)
        }

    },[usersList])

    useEffect(()=>{
        
        if(selectedUserId !== -1)getUserInfo()
    },[selectedUserId])

    useEffect(()=>{

        // console.log(selectedUserInfo)
        if(selectedUserInfo === null || selectedUserInfo === undefined) {
            return
        }


        setUserEnable(selectedUserInfo.enabled)
        setUserRole(selectedUserInfo.roleEntity.name);
        setUserLogin(selectedUserInfo.login)
        setUserEmail(selectedUserInfo.email)
        setUserName(selectedUserInfo.fullName)
        setUserCompany(selectedUserInfo.companyName)
        setUserAddress(selectedUserInfo.address)
        setUserCertainAddress(selectedUserInfo.certainPlaceAddress)
        setUserPhone(selectedUserInfo.phoneNumber)

        let arr = selectedUserInfo?.appAccess?.split(",") ?? ""

        setAppAccessAll(arr.indexOf("all") !== -1)
        setAppAccessK(arr.indexOf("k") !== -1)
        setAppAccessKM(arr.indexOf("km") !== -1)
        setAppAccessZ(arr.indexOf("z") !== -1)
        setAppAccessPM(arr.indexOf("pm") !== -1)

        // console.log(appAccessAll)

        

    }, [selectedUserInfo])

    const updateUsersList = () =>{

        let accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
      
        const config = {
          headers:{
            'Authorization': 'Bearer ' + accessToken
          }
        };
        axios.get(Endpoints.API.ALL_USERS, config).then((res) => {

            let data = res.data

            // console.log(data)
             data.sort((a, b) => {return a.id - b.id})

            setUsersList(data)
          
        }).catch((error) =>{

          console.log(error)
        }); 
    }

    const getUserInfo = () => {

        // console.log("SHOW USER IFO: " + id)

        let accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
      
        const config = {
          headers:{
            'Authorization': 'Bearer ' + accessToken
          }
        };
        axios.get(Endpoints.API.USER_INFO + selectedUserId, config).then((res) => {

            setSelectedUserInfo(res.data)  

        }).catch((error) =>{

          console.log(error)
        }); 

    }

    const saveUserChanges = (e) =>{

        let userAppAccess = (appAccessK? "++k++":"") + (appAccessKM? "++km++":"") + (appAccessZ? "++z++":"") + (appAccessPM? "++pm++":"")

        userAppAccess = userAppAccess.replaceAll("++++", ",")
        userAppAccess = userAppAccess.replaceAll("++", "")
        

        let newUsersData = {
            "userId":selectedUserId,
            "login":null,
            "email":null,
            "fullName":userName,
            "companyName":userCompany,
            "phoneNumber":userPhone,
            "address": userAddress,
            "certainPlaceAddress":userCertainAddress,
            "appAccess": userAppAccess,
            "newRole":userRole.replace("ROLE_", ""),
            "enabled":userEnable
        }

        // console.log(newUsersData)

        let accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
        
        const config = {
          headers:{
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json;charset=utf-8'
          }
        };
        axios.put(Endpoints.API.USER_EDIT, JSON.stringify(newUsersData), config).then((res) => {
      
      
        //   console.log(res)

          document.getElementById("btnSave").value = "Сохранено"

          setTimeout(()=>{
            let btn= document.getElementById("btnSave");
            btn.value = "Сохранить"; 
        }, 2000)
          
        }).catch((error) =>{

          console.log(error)
        }); 
    }

    


    return(

    
    <>
        <div className="container_external">
                <div className="container_mid">
                    <div className="info_container">

                        <div className="info_header">
                            <img src={userLogoImg} alt=""/>
                            <div className="user_info">
                                <p className="user_name">user</p>
                                <p className="user_company" >COMPANY/ROLE(ADMIN)</p>
                            </div>
                        </div>

                        <div className="info_body">
                            <div className="">

                                <form id="edit_form" className="edit_form" method="post">

                                    <div className="left">
                                        <div><label ><input type="checkbox" id="" name="enable" checked={userEnable} onChange={e=>{setUserEnable(e.target.checked)}}/> Активен </label></div>
                                    </div>

                                    <div className="">
                                        <div className="user_data_container">
                                            <div className="center">
                                                <div className="field_container">
                                                    <p>Тип учетной записи:</p>
                                                    <select className="role_selector" value={userRole} name="role" onChange={(e) => setUserRole(e.target.value)}>
                                                        <option value="ROLE_ADMIN">Администратор</option>
                                                        <option value="ROLE_MODERATOR">Модератор</option>
                                                        <option value="ROLE_SUPPLIER">Поставщик материала</option>
                                                        <option value="ROLE_KEYMANAGER">Менеджер</option>
                                                        <option value="ROLE_SHOP">Салон</option>
                                                        <option value="ROLE_USER">Дизайнер</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="center">
                                                <div className="field_container">
                                                    <p>Логин:</p>
                                                    <input className="textfield" value={userLogin} type="text" name="login" placeholder="Введите логин" onChange= {(e)=>{setUserLogin(e.target.value)}} required disabled/>
                                                </div>
                                            </div>
                                            <div className="center">
                                                <div className="field_container">
                                                    <p>Email:</p>
                                                    <input className="textfield" value={userEmail} type="email" name="email" placeholder="Введите email" onChange= {(e)=>{setUserEmail(e.target.value)}} required disabled/>
                                                </div>
                                            </div>
                                            <div className="center">
                                                <div className="field_container">
                                                    <p>ФИО:</p>
                                                    <input className="textfield" value={userName} type="text" name="fullName" placeholder="ФИО" onChange= {(e)=>{setUserName(e.target.value)}} required/>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="user_data_container">

                                            <div className="center">
                                                <div className="field_container">
                                                    <p>Компания:</p>
                                                    <input className="textfield" value={userCompany} type="text" name="company" placeholder="Компания" onChange= {(e)=>{setUserCompany(e.target.value)}} required/>
                                                </div>
                                            </div>
                                            <div className="center" hidden>
                                                <div className="field_container">
                                                    <p>Адрес компании:</p>
                                                    <input className="textfield" value={userAddress} type="text" name="address" placeholder="Адрес" onChange= {(e)=>{setUserAddress(e.target.value)}} required/>
                                                </div>
                                            </div>
                                            <div className="center">
                                                <div className="field_container">
                                                    <p>Адрес местонахождения:</p>
                                                    <input className="textfield" value={userCertainAddress} type="text" name="certain_place_address" placeholder="Адрес" onChange= {(e)=>{setUserCertainAddress(e.target.value)}} required/>
                                                </div>
                                            </div>
                                            <div className="center">
                                                <div className="field_container">
                                                    <p>Номер телефона:</p>
                                                    <input className="textfield" value={userPhone} type="text" name="phone_number" placeholder="Номер телефона" onChange= {(e)=>{setUserPhone(e.target.value)}} required/>
                                                </div>
                                            </div>
                                            <div className="center">
                                                <div className="field_container">
                                                    <p>Доступные приложения:</p>
                                                    <div className="app_access">
                                                        <div><input type="checkbox" name="all" checked = {appAccessAll} onChange={e=>{setAppAccessAll(e.target.checked)}}/><label>all</label></div>
                                                        <div><input type="checkbox" name="km"  checked = {appAccessKM} onChange={e=>{setAppAccessKM(e.target.checked)}} /><label>KM</label></div>
                                                        <div><input type="checkbox" name="k"  checked = {appAccessK} onChange={e=>{setAppAccessK(e.target.checked)}}/><label>K</label></div>
                                                        <div><input type="checkbox" name="z"  checked = {appAccessZ} onChange={e=>{setAppAccessZ(e.target.checked)}}/><label>Z</label></div>
                                                        <div><input type="checkbox" name="pm"  checked = {appAccessPM} onChange={e=>{setAppAccessPM(e.target.checked)}}/><label>PM</label></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <input id="btnSave" className="form_save_button" type="button" value="Сохранить" onClick={(e)=>{e.preventDefault(); saveUserChanges()}}/>
                                    
                                </form>
                            </div>
                        </div>

                    </div>

                    <div className="list_container">

                        <div className="user_filter">
                            <div>
                                <input type="checkbox" name="" id="use_filter" value=""/>
                                <span>Фильтр</span>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="filter_full_name" value="ABJ"/>
                                <span>ФИО</span>
                                <input type="text" name="" id="input_full_name"/>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="filter_shop" value=""/>
                                <span>Салон</span>
                                <input type="text" name="" id="input_shop"/>
                            </div>
                        </div>
                        <div className="users_list">
                            <ul>
                                { usersList.map((user)=>
                                    <li key={user.id}>
                                        <div className={ (selectedUserId === user.id)?"user_row user_row_selected":"user_row"} onClick={() => {setSelectedUserId(user.id)}}>
                                            <img src={userLogoImg} alt=""/>
                                            <div className="user_info">
                                                <p className="user_name">{user.login}</p>
                                                <p className="user_name">{user.fullName}</p>
                                                <p className="user_company" >{user.companyName}</p>
                                                <span id="id" hidden>id:{user.id}</span>
                                            </div>
                                        </div>
                                    </li>
                                    )
                                }
                               
                            </ul>
                        </div>


                    </div>
                </div>




        </div>
    </>
    )

}

export default UsersList