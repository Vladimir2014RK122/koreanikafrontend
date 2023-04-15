import {React, useEffect, useState} from "react";
import "../css/dashboard.css"
import { ACCESS_TOKEN_NAME } from "../constants";
import { Endpoints } from "../api/endpoints";
import axios from "axios";


const Dashboard = () => {


    const [activities, setActivities] = useState()
    const [startTime, setStartTime] = useState()
    const [workTime, setWorkTime] = useState()
    const [usesMemory, setUsesMemoty] = useState()

    const [usersOnline, setUsersOnline] = useState()
    const [usersOffline, setUsersOffline] = useState()
    const [usersNumber, setUsersNumber] = useState()


    useEffect(() => {
        updateUserActivities();
        updateStartTime();
        updateWorkTime();
        updateMemoryInfo();
        updateUsersNumber()
        updateUsersOnline();
        


        let intervalId = setInterval(()=>{
            // console.log("updateEvents")
            updateUserActivities()
            updateStartTime()
            updateWorkTime()
            updateMemoryInfo()
            updateUsersNumber()
            updateUsersOnline()
            
        }, 10000)

        return ()=>{
            clearInterval(intervalId)
        }

    }, [])

    useEffect(()=>{
        if(usersNumber != undefined && usersOnline != undefined){
            setUsersOffline(usersNumber - usersOnline)
        }
    }, [usersNumber, usersOnline])

    const updateUserActivities = () => {

        let accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
      
        // console.log(loginData)
      
        const config = {
          headers:{
            'Authorization': 'Bearer ' + accessToken
          }
        };
        axios.get(Endpoints.API.USER_ACIVITIES, config).then((res) => {

            setActivities( res.data.map((row, index) =>

                    <tr key={index}>
                                                
                        <td >{new Date(row.activityTime).toLocaleDateString()}</td>
                        <td >{row.userLogin}</td>
                        <td >{row.activityType}</td>
                        <td >{row.activityMessage}</td>
                    
                    </tr>
                )   
            )
          
        }).catch((error) =>{

          console.log(error)
        }); 

    }

    const updateStartTime = () =>{

        let accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
      
      
        const config = {
          headers:{
            'Authorization': 'Bearer ' + accessToken
          }
        };
        axios.get(Endpoints.API.APP_START_TIME, config).then((res) => {

            setStartTime(res.data)
            // console.log(res.data)
          
        }).catch((error) =>{

          console.log(error)
        }); 
    }

    const updateWorkTime = () =>{

        let accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
      
      
        const config = {
          headers:{
            'Authorization': 'Bearer ' + accessToken
          }
        };
        axios.get(Endpoints.API.APP_WORK_TIME, config).then((res) => {

            setWorkTime(res.data)
          
        }).catch((error) =>{

          console.log(error)
        }); 
    }

    const updateMemoryInfo = () =>{

        let accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
      
      
        const config = {
          headers:{
            'Authorization': 'Bearer ' + accessToken
          }
        };
        axios.get(Endpoints.API.APP_MEM_INFO, config).then((res) => {

            setUsesMemoty(res.data)
          
        }).catch((error) =>{

          console.log(error)
        }); 
    }

    
    const updateUsersNumber = () =>{

        let accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
      
      
        const config = {
          headers:{
            'Authorization': 'Bearer ' + accessToken
          }
        };
        axios.get(Endpoints.API.ALL_USERS, config).then((res) => {

            setUsersNumber(res.data.length)
          
        }).catch((error) =>{

          console.log(error)
        }); 
    }

    const updateUsersOnline = () =>{

        let accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
      
      
        const config = {
          headers:{
            'Authorization': 'Bearer ' + accessToken
          }
        };
        axios.get(Endpoints.API.USERS_STATS, config).then((res) => {

            setUsersOnline(res.data.length)
          
        }).catch((error) =>{

          console.log(error)
        }); 
    }

    
    return(
        <>

            <div className="system_info_container_external">
                    <div className="system_info_container">
                        <div className="system_info_element">
                            <p className="info_header"> О системе</p>
                            <div className="sys_start_date">
                                <p>Дата запуска:</p>
                                <p>{startTime}</p>
                            </div>
                            <div className="sys_work_time">
                                <p>Время работы сервера:</p>
                                <p>{workTime}</p>
                            </div>
                            <div className="sys_memory">
                                <p>Память:</p>
                                <p>{usesMemory}</p>
                            </div>

                        </div>

                        <div className="users_info_element">
                            <p className="info_header"> О пользователях</p>
                            <div className="users_all">
                                <p>Всего :</p>
                                <p>{usersNumber}</p>
                            </div>
                            <div className="users_online">
                                <p>Онлайн:</p>
                                <p>{usersOnline}</p>
                            </div>
                            <div className="users_offline">
                                <p>Оффлайн:</p>
                                <p>{usersOffline}</p>
                            </div>
                        </div>


                    </div>
            </div>
            <div className="container">
                    <div className="container_mid">
                        <div className="events">
                            <div className="table_caption"><h4>События портала</h4></div>

                            <div className="table_container">
                                <table>

                                    <colgroup>
                                        <col style={{width:"20%"}}/>
                                        <col style={{width:"20%"}}/>
                                        <col style={{width:"20%"}}/>
                                        <col style={{width:"40%"}}/>

                                    </colgroup>

                                    <thead>
                                        <tr>
                                            <th>Дата</th>
                                            <th>Пользователь</th>
                                            <th>Операция</th>
                                            <th>Дополнительно</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {activities}
                                    </tbody>

                                </table>
                            </div>


                        </div>
                    </div>
            </div>
        </>
    )
    
}

export default Dashboard