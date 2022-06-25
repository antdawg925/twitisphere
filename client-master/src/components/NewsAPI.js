// \\\\\\<$A$>///////\\\\\\<$A$>///////  ___________  IMPORTS  _____________ \\\\\\<$A$>///////\\\\\\<$A$>///////
//                                    -----------------------------------------
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/HomePage.css";
import { useHistory } from 'react-router-dom'

// ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ
// ----------------------------------------------------------------------------------------------------------
// ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ

const NewsAPI = () => {

  //  history.push("/") is used to navigate to other routes
  const history = useHistory()
  // STATE VARIABLE
  const [news, setNews] = useState([]);

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  //                               RETRIEVING NY TIMES NEWS FROM API
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  const axiosNews = () => {
    const newsCatcher = [];
    axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?q=new+york+times&page=2&sort=oldest&api-key=Uh8kclNaPnGtLJAhGbU5hTStY36qZz8z")
      .then((res) => {
        if (localStorage.getItem("logged_in") != "yes") {
          history.push('/')
        }
        for (let i = 0, count = 0; count < 8; i++) {
          if (res.data.response.docs[i].headline.print_headline.length < 200) {
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
// ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


  return (
    <div id="news">
      {
        news.map((headline, idx) => {
          return (
            <div className="news-box min-h-fit lg:h-1/8 pb-6 shadow-xl shadow-blue-300 bg-slate-200" key={idx}>

              <h2 className="news-title text-l font-bold shadow-lg text-slate-200 shadow-blue-300"> {news[idx].headline.print_headline} </h2>
              <h5 className="news-feed text-base md:text-xs  p-5 md:pb-0 shadow-xl bg-blue-200 shadow-blue-300"> {news[idx].headline.main} </h5>

            </div>
          )
        })
      }
    </div>
  );
};

export default NewsAPI;
