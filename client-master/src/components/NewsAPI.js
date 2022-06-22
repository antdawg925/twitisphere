import React, { useState, useEffect} from "react";
import axios from "axios";
import "../CSS/HomePage.css";
const NewsAPI = () => {

  const [news, setNews] = useState([]);

  // Retrieving NY times news from api
  const axiosNews = () => {
    const newsCatcher=[];
    axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?q=new+york+times&page=2&sort=oldest&api-key=Uh8kclNaPnGtLJAhGbU5hTStY36qZz8z")
      .then((res) => {
        // const {apiData} = res.data; 
        // console.log(res.data)
        // Filtering headlines for shorter than 200 chars
        for( let i=0, count =0; count<8 ; i++ ) {
          // console.log(res.data.response.docs[i].headline.print_headline.length);
          if ( res.data.response.docs[i].headline.print_headline.length < 200){
            newsCatcher.push(res.data.response.docs[i]);
            count++;
          } 
        }
        setNews(newsCatcher);
      })
      .catch(err => console.log(err))
  }

  // useEffect
  useEffect(() => {
    axiosNews();
  }, [])

  return (
    <div id="news">
      {
        news.map((headline, idx) => {
          return(
            <div className="news-box lg:h-1/6 min-h-fit pb-6" key={idx}>
              
             <h2 className="news-title text-l font-bold "> {news[idx].headline.print_headline } </h2>
             <h5 className="news-feed text-base md:text-xs place-center p-5 md:pb-0"> {news[idx].headline.main } </h5>

            </div>
          )
        })
      }
    </div>
  );
};

export default NewsAPI;
