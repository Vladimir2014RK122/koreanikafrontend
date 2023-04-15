import React, { useState, useEffect } from "react"
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom"
import userLogoImg from "../images/user_no_logo.png"
import "../css/header.css"


import { useAuth } from "../hook/useAuth"

const Header = (props) => {


    const {user, signout} = useAuth()
    const navigate = useNavigate()

    const location = useLocation()


    useEffect(()=>{

        console.log(user)
        if(user.role !== "ROLE_ADMIN" && user.role !== "ROLE_MODERATOR"){
            if(location.pathname !== "/profile")navigate("/profile")
            document.getElementById("linkDashboard").hidden = true;
            document.getElementById("linkUsers").hidden = true;
            document.getElementById("linkStats").hidden = true;
            document.getElementById("linkUpdates").hidden = true;
            document.getElementById("linkPrices").hidden = true;
            document.getElementById("linkNews").hidden = true;

        }else{
            document.getElementById("linkDashboard").hidden = false;
            document.getElementById("linkUsers").hidden = false;
            document.getElementById("linkStats").hidden = false;
            document.getElementById("linkUpdates").hidden = false;
            document.getElementById("linkPrices").hidden = false;
            document.getElementById("linkNews").hidden = false;
        }
    })


    return(
      <>
          <div className="menu_container">
              <div className="menu_container_inner">
                  <div className="menu_container_content">
                      <div className="menu_user_info">
                          <img src={userLogoImg} alt=""/>
                          <div className="menu_user_info_2">
                              <p className="user_name">{user.loginName + "(" + user.role + ")"}</p>
                              <p className="user_info" hidden>COMPANY/ROLE(ADMIN)</p>
                              <Link className="user_logout" onClick={() => {signout(()=>{navigate("/login", {replace: true})})}}>logout</Link>
                          </div>
                      </div>

                      <div className="menu_items">
                          <ul>
                              {/* <li><button className={(this.state.selectedPage === "dashboard")? "menu_btn highlight":"menu_btn"} href="/dashboard" onClick={() => this.changeView("dashboard")}>Информация</button></li>
                              <li><button className={(this.state.selectedPage === "usersList")? "menu_btn highlight":"menu_btn"}href="/usersList" onClick={() => this.changeView("usersList")}>Пользователи</button></li>
                              <li><button className={(this.state.selectedPage === "statistics")? "menu_btn highlight":"menu_btn"} href="/dashboard" onClick={() => this.changeView("statistics")}>Статистика</button></li>
                              <li><button className={(this.state.selectedPage === "appUpdates")? "menu_btn highlight":"menu_btn"} onClick={() => this.changeView("appUpdates")}>Обновления</button></li>
                              <li><button className={(this.state.selectedPage === "pricesUpdates")? "menu_btn highlight":"menu_btn"} href="" onClick={() => this.changeView("pricesUpdates")}>Цены</button></li>
                              <li><button className={(this.state.selectedPage === "news")? "menu_btn highlight":"menu_btn"} onClick={() => this.changeView("news")}>Новости</button></li>
                              <li><button className={(this.state.selectedPage === "profile")? "menu_btn highlight":"menu_btn"} onClick={() => this.changeView("profile")}>Профиль</button></li> */}

                              <li><Link id="linkDashboard" className={(location.pathname === "/dashboard")? "menu_btn highlight":"menu_btn"} to="/dashboard">Информация</Link></li>
                              <li><Link id="linkUsers" className={(location.pathname === "/usersList")? "menu_btn highlight":"menu_btn"} to="/usersList" >Пользователи</Link></li>
                              <li><Link id="linkStats" className={(location.pathname === "/statistics")? "menu_btn highlight":"menu_btn"} to="/statistics" >Статистика</Link></li>
                              <li><Link id="linkUpdates" className={(location.pathname === "/appUpdates")? "menu_btn highlight":"menu_btn"} to="/appUpdates">Обновления</Link></li>
                              <li><Link id="linkPrices" className={(location.pathname === "/pricesUpdates")? "menu_btn highlight":"menu_btn"} to="/pricesUpdates" >Цены</Link></li>
                              <li><Link id="linkNews" className={(location.pathname === "/news")? "menu_btn highlight":"menu_btn"} to="/news" onClick={(e) => {e.preventDefault();/* this.setState({selectedPage: "/news"})*/}}>Новости</Link></li>
                              <li><Link id="linkProfile" className={(location.pathname === "/profile")? "menu_btn highlight":"menu_btn"} to="/profile" >Профиль</Link></li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>

          <Outlet/>
      </>     
    )

}

export default Header