import {React, useState, useEffect} from "react";

import ReactDatePicker from "react-datepicker";
import { ACCESS_TOKEN_NAME } from "../constants";
import { Endpoints } from "../api/endpoints";
import "../css/statistics.css"
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const Statistics = () => {

    const defaultFilteerProps = {
        useDate: false,
        useMaterial: false,
        useCompany: false,
        useCertainPlaceAddress: false,
        useMaterialPrice: false,
        useAddPrice: false,
        useAllPrice: false,
        dateFrom: new Date(), 
        dateTo: new Date(), 
        material: "",
        company: "",
        certainPlaceAddress: "",
        materialPriceFrom: "",
        materialPriceTo: "",
        addPriceFrom: "",
        addPriceTo: "",
        allPriceFrom: "",
        allPriceTo: ""
    }

    const [eventsList, setEventsList] = useState([])

    const [useFilter, setUseFilter] = useState(false)
    const [update, setUpdate] = useState(false)

    const [filterProps, setFilterProps] = useState(defaultFilteerProps)


    useEffect(()=>{

        updateEventsList()

        let intervalId = setInterval(updateEventsList, 10000)

        return ()=>{
            clearInterval(intervalId)
            // console.log("clear updateUsersList")   
        }

    }, [useFilter, update])


    const updateEventsList = () => {

        let accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
      
        const config = {
          headers:{
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json;charset=utf-8'
          }
        };

        let filterObject = {
            "dateFrom": ((useFilter && filterProps.useDate)? (filterProps.dateFrom.toISOString()): ""),
            "dateTo": ((useFilter && filterProps.useDate)? (filterProps.dateTo.toISOString()): ""),
            "companyName": ((useFilter && filterProps.useCompany)? (filterProps.company): ""),
            "certainPlaceAddress": ((useFilter && filterProps.useCertainPlaceAddress)? (filterProps.certainPlaceAddress): ""),
            "materialPriceFrom": ((useFilter && filterProps.useMaterialPrice)? (filterProps.materialPriceFrom): -1),
            "materialPriceTo": ((useFilter && filterProps.useMaterialPrice)? (filterProps.materialPriceTo): -1),
            "addPriceFrom": ((useFilter && filterProps.useAddPrice)? (filterProps.addPriceFrom): -1),
            "addPriceTo": ((useFilter && filterProps.useAddPrice)? (filterProps.addPriceTo): -1),
            "allPriceFrom": ((useFilter && filterProps.useAllPrice)? (filterProps.allPriceFrom): -1),
            "allPriceTo": ((useFilter && filterProps.useAllPrice)? (filterProps.allPriceTo): -1),
            "materials": ((useFilter && filterProps.useMaterial)? (filterProps.material): ""),
            "type": ""
        }

        // console.log(filterObject)

        axios.post(Endpoints.API.FILTERED_CALC_EVENTS, JSON.stringify(filterObject), config).then((res) => {

            let data = res.data

            
            console.log(res.data)
             setEventsList(data)
          
        }).catch((error) =>{

          console.log(error)
        }); 

    }

    const downloadXlsFile = () => {

        let accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
      
        const config = {
          headers:{
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json;charset=utf-8'
          }
        };
        
        let filterObject = {
            "dateFrom": ((useFilter && filterProps.useDate)? (filterProps.dateFrom.toISOString()): ""),
            "dateTo": ((useFilter && filterProps.useDate)? (filterProps.dateTo.toISOString()): ""),
            "companyName": ((useFilter && filterProps.useCompany)? (filterProps.company): ""),
            "certainPlaceAddress": ((useFilter && filterProps.useCertainPlaceAddress)? (filterProps.certainPlaceAddress): ""),
            "materialPriceFrom": ((useFilter && filterProps.useMaterialPrice)? (filterProps.materialPriceFrom): -1),
            "materialPriceTo": ((useFilter && filterProps.useMaterialPrice)? (filterProps.materialPriceTo): -1),
            "addPriceFrom": ((useFilter && filterProps.useAddPrice)? (filterProps.addPriceFrom): -1),
            "addPriceTo": ((useFilter && filterProps.useAddPrice)? (filterProps.addPriceTo): -1),
            "allPriceFrom": ((useFilter && filterProps.useAllPrice)? (filterProps.allPriceFrom): -1),
            "allPriceTo": ((useFilter && filterProps.useAllPrice)? (filterProps.allPriceTo): -1),
            "materials": ((useFilter && filterProps.useMaterial)? (filterProps.material): ""),
            "type": ""
        }


        axios.post(Endpoints.API.FILTERED_CALC_EVENTS_FILE, JSON.stringify(filterObject), config).then((res) => {


            // console.log(res.data)
            // setEventsList(data)


            axios({
                url: res.data.fileDownloadUri, //your url
                method: 'GET',
                headers: {            
                    'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json;charset=utf-8'},
                responseType: 'blob', // important
                data: filterObject
            }).then((response) => {
                // create file link in browser's memory
                const href = URL.createObjectURL(response.data);
            
                // create "a" HTML element with href to file & click
                const link = document.createElement('a');
                link.href = href;
                link.setAttribute('download', res.data.fileName); //or any other extension
                document.body.appendChild(link);
                link.click();
            
                // clean up "a" element & remove ObjectURL
                document.body.removeChild(link);
                URL.revokeObjectURL(href);
            });
          
        }).catch((error) =>{

          console.log(error)
        }); 

    }

    return(
        <>
                <h2 className="header">Статистика</h2>
                <div className="container_statistics">
                    <div className="container_inner">

                        <div className="filter_onoff">
                            <div>
                                <input id="filter_use" type="checkbox" checked={useFilter} onChange={e=>{setUseFilter(e.target.checked)}}/>
                                <span>Использовать фильтр</span>
                            </div>
                            <div>
                                <input type="button" value="Download .xls "  onClick={() => downloadXlsFile()}/>
                            </div>
                        </div>

                        <div className="container_filter">
                            <div className="filter">
                                <div className="filter_column1">
                                    <div className="filter_row">
                                        <input id="date_use" type="checkbox" checked={filterProps.useDate} onChange={e => {setFilterProps(filterProps => ({...filterProps, ...{useDate:e.target.checked}}))}}/>
                                        <span >Дата</span>
                                        <ReactDatePicker id="date_from" type="date" selected={filterProps.dateFrom} onChange={date => {setFilterProps(filterProps =>({...filterProps, ...{dateFrom:date}}))}}/>
                                        <span className="sdd">-</span>
                                        <ReactDatePicker id="date_to" type="date" selected={filterProps.dateTo} onChange={date => {setFilterProps(filterProps =>({...filterProps, ...{dateTo:date}}))}}/>

                                    </div>
                                    <div className="filter_row">
                                        <input id="material_use" type="checkbox" checked={filterProps.useMaterial} onChange={e => {setFilterProps(filterProps => ({...filterProps, ...{useMaterial:e.target.checked}}))}}/>
                                        <span>Камень</span>
                                        <input id="materials" type="text" value={filterProps.material} onChange={e => {setFilterProps(filterProps => ({...filterProps, ...{material: e.target.value}}))}}/>
                                    </div>
                                    <div className="filter_row">
                                        <input id="shop_use" type="checkbox" checked={filterProps.useCompany} onChange={e => {setFilterProps(filterProps => ({...filterProps, ...{useCompany:e.target.checked}}))}}/>
                                        <span>Салон</span>
                                        <input id="shop" type="text" value={filterProps.company} onChange={e => {setFilterProps(filterProps => ({...filterProps, ...{company: e.target.value}}))}}/>

                                    </div>
                                    <div className="filter_row">
                                        <input id="certain_address_use" type="checkbox" checked={filterProps.useCertainPlaceAddress} onChange={e => {setFilterProps(filterProps => ({...filterProps, ...{useCertainPlaceAddress:e.target.checked}}))}}/>
                                        <span>Магазин</span>
                                        <input id="certainAddress" type="text" value={filterProps.certainPlaceAddress} onChange={e => {setFilterProps(filterProps => ({...filterProps, ...{certainPlaceAddress: e.target.value}}))}}/>

                                    </div>
                                </div>
                                <div className="filter_column2">
                                    <div className="filter_row">
                                        <input id="material_price_use" type="checkbox" checked={filterProps.useMaterialPrice} onChange={e => {setFilterProps(filterProps => ({...filterProps, ...{useMaterialPrice:e.target.checked}}))}}/>
                                        <span>Цена материала</span>
                                        <span>от</span>
                                        <input id="materialPriceFrom" type="text" value={filterProps.materialPriceFrom} onChange={e => {setFilterProps(filterProps => ({...filterProps, ...{materialPriceFrom: e.target.value}}))}}/>
                                        <span>до</span>
                                        <input id="materialPriceTo" type="text"  value={filterProps.materialPriceTo} onChange={e => {setFilterProps(filterProps => ({...filterProps, ...{materialPriceTo: e.target.value}}))}}/>
                                        <span>руб.</span>

                                    </div>
                                    <div className="filter_row">
                                        <input id="add_price_use" type="checkbox" checked={filterProps.useAddPrice} onChange={e => {setFilterProps(filterProps => ({...filterProps, ...{useAddPrice:e.target.checked}}))}}/>
                                        <span>Цена доп. работ</span>
                                        <span>от</span>
                                        <input id="addPriceFrom" type="text" value={filterProps.addPriceFrom} onChange={e => {setFilterProps(filterProps => ({...filterProps, ...{addPriceFrom: e.target.value}}))}}/>
                                        <span>до</span>
                                        <input id="addPriceTo" type="text" value={filterProps.addPriceTo} onChange={e => {setFilterProps(filterProps => ({...filterProps, ...{addPriceTo: e.target.value}}))}}/>
                                        <span>руб.</span>

                                    </div>
                                    <div className="filter_row">
                                        <input id="all_use" type="checkbox" checked={filterProps.useAllPrice} onChange={e => {setFilterProps(filterProps => ({...filterProps, ...{useAllPrice:e.target.checked}}))}}/>
                                        <span>Цена общая</span>
                                        <span>от</span>
                                        <input id="allPriceFrom" type="text" value={filterProps.allPriceFrom} onChange={e => {setFilterProps(filterProps => ({...filterProps, ...{allPriceFrom: e.target.value}}))}}/>
                                        <span>до</span>
                                        <input id="allPriceTo" type="text" value={filterProps.allPriceTo} onChange={e => {setFilterProps(filterProps => ({...filterProps, ...{allPriceTo: e.target.value}}))}}/>
                                        <span>руб.</span>

                                    </div>
                                </div>


                            </div>

                        </div>

                        <div className="updateBtnContainer"><input id="updateButton" type="button" value="Обновить" onClick={()=> setUpdate(!update)}/></div>

                        <div className="table_container_statistics">

                            <table className="table_statistics">

                                <colgroup>
                                    <col style={{width:"7%"}}/>
                                    <col style={{width:"10%"}}/>
                                    <col style={{width:"6%"}}/>
                                    <col style={{width:"10%"}}/>
                                    <col style={{width:"29%"}}/>
                                    <col style={{width:"5%"}}/>
                                    <col style={{width:"5%"}}/>
                                    <col style={{width:"8%"}}/>
                                    <col style={{width:"8%"}}/>
                                    <col style={{width:"8%"}}/>
                                </colgroup>

                                

                                <thead>
                                    <tr>
                                        <th>Дата</th>
                                        <th>Салон</th>
                                        <th>Пользователь</th>
                                        <th>Тип события</th>
                                        <th>Материал (тип-коллекция-цвет)</th>
                                        <th>Кол-во слэбов</th>
                                        <th>Площадь изделия (м2)</th>
                                        <th>Цена материала (₽)</th>
                                        <th>Цена доп. работ (₽)</th>
                                        <th>Цена счета (₽)</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {eventsList.map((item, index) =>
                                        <tr key={index}>
                                            <td>{new Date(item.activityTime).toLocaleString()}</td>
                                            <td>{item.companyName}</td>
                                            <td>{item.userLogin}</td>
                                            <td>{item.type}</td>
                                            <td>{item.materials}</td>
                                            <td>{item.slabs.toFixed(2)}</td>
                                            <td>{item.productSquare.toFixed(2)}</td>
                                            <td>{item.materialPrice.toFixed(2)}</td>
                                            <td>{item.addPrice.toFixed(2)}</td>
                                            <td>{item.allPrice.toFixed(2)}</td>
                                        </tr>
                                )}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
        </>
    )
    
}

export default Statistics