
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/HomePage.css";
import { useHistory } from 'react-router-dom'


const NewsAPI = () => {

  //  history.push("/") is used to navigate to other routes
  const history = useHistory()
  // STATE VARIABLE
  const [news, setNews] = useState([]);


  //  RETRIEVING NY TIMES NEWS FROM API
  const axiosNews = () => {
    const newsCatcher = [];
    axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?q=new+york+times&page=2&sort=oldest&api-key=Uh8kclNaPnGtLJAhGbU5hTStY36qZz8z")
      .then((res) => {
        if (localStorage.getItem("logged_in") !== "yes") {
          history.push('/')
        }
        for (let i = 0, count = 0; count < 8; i++) {
          if (res.data.response.docs[i].abstract.length < 10) {
            count++
          } else if (res.data.response.docs[i].headline.print_headline.length < 250) {
            newsCatcher.push(res.data.response.docs[i]);
            count++;
          }
        }
        setNews(newsCatcher);
      })
      .catch(err => console.log(err))
  }
  // useEffect-oo
  useEffect(() => {
    axiosNews();
  }, [])



  return (
    <div id="news">
      <h1 className="text-center text-3xl underline hover:underline-offset-4 font-bold h-20 mb-2 pt-5 ">Live NY Times API</h1>
      {
        news.map((headline, idx) => {
          return (
            <div className="news-box min-h-fit lg:h-1/8 pb-6 shadow-xl shadow-blue-300 bg-slate-100" key={idx}>

              <h2 className="news-title text-l font-bold shadow-lg text-slate-200 shadow-blue-300"> {news[idx].headline.main} </h2>
              <h5 className="news-feed text-base md:text-xs  p-5 md:pb-0 shadow-xl bg-blue-200 shadow-blue-300" style={{paddingBottom:"1rem"}}> {news[idx].abstract} </h5>
              <p onClick={() => window.open(news[idx].web_url)} style={{
                textDecoration:"underline",
                padding:"2rem",
                cursor:"pointer",
                textAlign:"center"
              }}> 
                http://www.nytimes.{news[idx].headline.main}.com
              </p>
              

            </div>
          )
        })
      }
    </div>
  );
};

export default NewsAPI;
