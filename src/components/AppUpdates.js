import {React, useState, useEffect} from "react";
import { Endpoints } from "../api/endpoints";
import { ACCESS_TOKEN_NAME } from "../constants";
import axios from "axios";

import "../css/appUpdates.css"

const AppUpdates = () => {

    const [updatesList, setUpdatesList] = useState([])
    const [newFileAppAccess, setNewFileAppAccess] = useState({all: false, km: true, k: false, z:false, pm:false})
    const [newFileInfo, setNewFileInfo] = useState("")


    useEffect(()=>{

        getUpdatesList()

        let intervalId = setInterval(getUpdatesList, 5000)
        return () =>{
            clearInterval(intervalId)
        }
    }, [])

    const getUpdatesList = () => {
        let accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
      
        const config = {
          headers:{
            'Authorization': 'Bearer ' + accessToken,
          }
        };

        axios.get(Endpoints.API.UPDATE_FILES_ALL, config).then((res) => {

            console.log(res.data)
            res.data.sort((a,b) => {return (new Date(b.uploadDate).getTime() -  new Date(a.uploadDate).getTime())})
            setUpdatesList(res.data)
          
        }).catch((error) =>{

          console.log(error)
        }); 

    }

    const downloadUpdateFile = (url, fileName) => {

        let accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
        
        axios({
            url: url, //your url
            method: 'GET',
            headers: {            
                'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json;charset=utf-8'},
            responseType: 'blob', // important
        }).then((response) => {
            // create file link in browser's memory
            const href = URL.createObjectURL(response.data);
        
            // create "a" HTML element with href to file & click
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', fileName); //or any other extension
            document.body.appendChild(link);
            link.click();
        
            // clean up "a" element & remove ObjectURL
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        });

    }

    const deleteUpdateFile = (id) => {

        let accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
      
        const config = {
          headers:{
            'Authorization': 'Bearer ' + accessToken,
          }
        };

        axios.delete(Endpoints.API.UPDATE_FILE_DELETE + id, config).then((res) => {

            getUpdatesList()
          
        }).catch((error) =>{

          console.log(error)
        }); 

    }

    const editUpdateFileInfo = (id, newInfo, row, appAccess) => {

        let accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
      
        const config = {
          headers:{
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json;charset=utf-8'
          }
        };

        let arr = row.forClients.split(",")
        let appAccessAll = arr.indexOf("all") != -1
        let appAccessKM = arr.indexOf("km") != -1
        let appAccessK = arr.indexOf("k") != -1
        let appAccessZ = arr.indexOf("z") != -1
        let appAccessPM = row.forClients.split(",").indexOf("pm") != -1

        if(appAccess.indexOf("+") != -1){
            //add
            let app = appAccess.replace("+", "")
            if(app == "all") appAccessAll = true
            else if(app == "km") appAccessKM = true
            else if(app == "k") appAccessK = true
            else if(app == "z") appAccessZ = true
            else if(app == "pm") appAccessPM = true
            
            
        }else{
            //remove
            let app = appAccess.replace("-", "")
            if(app == "all") appAccessAll = false
            else if(app == "km") appAccessKM = false
            else if(app == "k") appAccessK = false
            else if(app == "z") appAccessZ = false
            else if(app == "pm") appAccessPM = false
        }

        let newAccess = []
        if(appAccessAll) newAccess.push("all")
        if(appAccessKM) newAccess.push("km")
        if(appAccessK) newAccess.push("k")
        if(appAccessZ) newAccess.push("z")
        if(appAccessPM) newAccess.push("pm")



        let dataObj = {
            info: newInfo,
            forClients: newAccess.join(",")
        }

        console.log(arr)
        console.log(dataObj)

        axios.post(Endpoints.API.UPDATE_FILE_EDIT + id, JSON.stringify(dataObj), config).then((res) => {

            getUpdatesList()
          
        }).catch((error) =>{

          console.log(error)
        }); 

    }


    const onUploadProgress = event => {
        const percentCompleted = Math.round((100 * event.loaded) / event.total);

        const uploadProgress = document.getElementById("upload-progress");
        const progressState = document.getElementById("progress_state");
        const btnUpload = document.getElementById("uploadBtn");

        uploadProgress.value = percentCompleted/100.0
        progressState.innerText = percentCompleted + "%"

        if(percentCompleted == 100){
            uploadProgress.hidden = true
            btnUpload.disabled = false
            progressState.innerText = "Загрузка прошла успешно"
            setTimeout(() => {progressState.hidden = true}, 2000)
        } 
    };
    
    const uploadUpdateFile = () => {

    
        let accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);

        const uploadProgress = document.getElementById("upload-progress");
        const progressState = document.getElementById("progress_state");
        const btnUpload = document.getElementById("uploadBtn");

        uploadProgress.hidden = false
        progressState.hidden = false
        btnUpload.disabled = true

        const formData = new FormData();
        const fileField = document.getElementById("fileInput");
        const textArea = document.getElementById("newFileInfo");

        let newAccess = []
        if(newFileAppAccess.all) newAccess.push("all")
        if(newFileAppAccess.km) newAccess.push("km")
        if(newFileAppAccess.k) newAccess.push("k")
        if(newFileAppAccess.z) newAccess.push("z")
        if(newFileAppAccess.pm) newAccess.push("pm")

        let appAccess = newAccess.join(",")

        formData.append('file', fileField.files[0]);
        formData.append('info', textArea.value);
        formData.append('forClients', appAccess);

        console.log(fileField.files[0])
        console.log(textArea.value)
        console.log(appAccess)
        console.log(formData)

        let config = {
            
            headers:{
                'Authorization': 'Bearer ' + accessToken,
                // "Content-Type": "multipart/form-data",
            },
            onUploadProgress
        }
    


        axios.post(Endpoints.API.UPDATE_FILE_UPLOAD, formData, config).then((res) =>{
        
            console.log(res)
            console.log('Upload complete');
            getUpdatesList()
        }).catch((error)=>{
            console.log('Upload DROPPED');
            console.error(error);

            uploadProgress.hidden = true
            btnUpload.disabled = false
        });

    }


    return(<>
        <div className="container_file_settings container">
                <div className="container_file_settings_content">

                    <div className="file_settings">
                        <div className="file_link">
                            <div>
                                <h4>Загрузите файл:</h4>
                            </div>
                            <div>
                                <input id="fileInput" type="file"/>
                                <progress id="upload-progress" hidden></progress>
                                <p id="progress_state"  hidden>state</p>
                            </div>
                            <div>
                                <p>Описание:</p>
                            </div>
                            <div>
                                <textarea id="newFileInfo" className="info" maxLength="1000" placeholder="Введите информацию об обновлении" wrap="hard"  name="" cols="30" rows="10" value={newFileInfo} onChange={e => {setNewFileInfo(e.target.value)}}></textarea>
                            </div>
                        </div>

                        <div>
                            <h4>Доступно для салонов:</h4>
                        </div>

                        <div className="file_clients upload_file_access">

                            
                            <div>
                                <input type="checkbox" name="all" checked={newFileAppAccess.all} onChange={e => {setNewFileAppAccess(newFileAppAccess => ({...newFileAppAccess, ...{all:e.target.checked}}))}}/>
                                <label >Все</label>
                            </div>
                            <div>
                                <input type="checkbox" name="km" checked={newFileAppAccess.km} onChange={e => {setNewFileAppAccess(newFileAppAccess => ({...newFileAppAccess, ...{km:e.target.checked}}))}}/>
                                <label>Koreanika master</label>
                            </div>
                            <div>
                                <input type="checkbox" name="k" checked={newFileAppAccess.k} onChange={e => {setNewFileAppAccess(newFileAppAccess => ({...newFileAppAccess, ...{k:e.target.checked}}))}}/>
                                <label>Koreanika</label>
                            </div>
                            <div>
                                <input type="checkbox" name="zetta" checked={newFileAppAccess.z} onChange={e => {setNewFileAppAccess(newFileAppAccess => ({...newFileAppAccess, ...{z:e.target.checked}}))}}/>
                                <label>Zetta</label>
                            </div>
                            <div>
                                <input type="checkbox" name="proMebel" checked={newFileAppAccess.pm} onChange={e => {setNewFileAppAccess(newFileAppAccess => ({...newFileAppAccess, ...{pm:e.target.checked}}))}}/>
                                <label>ПроМебель</label>
                            </div>
                        </div>
                    </div>

                    <div id="uploadBtn" className="file_btn" onClick={() => {uploadUpdateFile()}}>
                        <input  type="button" value="Загрузить"/>
                    </div>

                    
                </div>
        </div>
    
        <div className="container">
                <div className="container_mid">
                    <div className="files">

                        <div className="table_caption"><h4>Уже загружены</h4></div>

                        <div className="table_container">
                            <table>

                                <colgroup>
                                    <col style={{width:"20%"}}/>
                                    <col style={{width:"25%"}}/>
                                    <col style={{width:"30%"}}/>
                                    <col style={{width:"12%"}}/>
                                    <col style={{width:"12%"}}/>
                                </colgroup>

                                <thead>

                                    <tr>
                                        <th>Дата</th>
                                        <th>Доступ</th>
                                        <th>Имя</th>
                                        <th>Скачать</th>
                                        <th>Удалить</th>
                                    </tr>

                                </thead>

                                <tbody>
                                    {
                                        updatesList.map((item)=>
                                            
                                            <tr key={item.id}>
                                                <td>{new Date(item.uploadDate).toISOString()}</td>
                                                <td>
                                                    <div className="file_access">

                                                        <div><input type="checkbox" name="all" checked={item.forClients.split(",").indexOf("all") != -1}  onChange={(e) => {editUpdateFileInfo(item.id, item.info, item, (e.target.checked)? "+all": "-all")}}/> <label>all</label></div>
                                                        <div><input type="checkbox" name="KM" checked={item.forClients.split(",").indexOf("km") != -1}  onChange={(e) => {editUpdateFileInfo(item.id, item.info, item, (e.target.checked)? "+km": "-km")}}/> <label>KM</label></div>
                                                        <div><input type="checkbox" name="K" checked={item.forClients.split(",").indexOf("k") != -1}  onChange={(e) => {editUpdateFileInfo(item.id, item.info, item, (e.target.checked)? "+k": "-k")}}/> <label>K</label></div>
                                                        <div><input type="checkbox" name="Z" checked={item.forClients.split(",").indexOf("z") != -1}  onChange={(e) => {editUpdateFileInfo(item.id, item.info, item, (e.target.checked)? "+z": "-z")}}/> <label>Z</label></div>
                                                        <div><input type="checkbox" name="PM" checked={item.forClients.split(",").indexOf("pm") != -1}  onChange={(e) => {editUpdateFileInfo(item.id, item.info, item, (e.target.checked)? "+pm": "-pm")}}/> <label>PM</label></div>

                                                    </div>

                                                </td>
                                                <td>{item.name}</td>
                                                <td><a className="a_download" href="##" onClick={() => {downloadUpdateFile(item.url, item.name)}}>скачать</a></td>
                                                <td><a className="a_delete"href="##" onClick={() => {deleteUpdateFile(item.id)}}>удалить</a></td>
                                            </tr>

                                        )
                                    }




                                </tbody>

                            </table>
                        </div>

                    </div>
                </div>
        </div>
    </>)
    
}

export default AppUpdates