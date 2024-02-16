import { data } from "autoprefixer"; // ?
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { BookMarkContext } from "@/BookMarkContext";

// https://newsdata.io/api-key
/* 
kan gå in på länken nedanför för att se APIt
https://newsdata.io/api/1/news?apikey=pub_382120086c1799d089c0da41a4c9ee4d8a9ec&q=pizza
 */

const myAPI_KEY = "pub_382120086c1799d089c0da41a4c9ee4d8a9ec"; // 200 hämtningar per dag?

export default function News() {
  const [articles, setArticles] = useState([]);
  const { state, dispatch } = useContext(BookMarkContext);

  useEffect( () => { // OBS VI KOMMER ANVÄNDE EN HÄMTNING VARJE GÅNG VI LADDAR OM HEMSIDAN!!!
    fetch (
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&q=pizza`
    ).then(res => res.json()).then(data => setArticles(data.results)) // kanske dåligt att göra massa "then", kan inte console logga data nu? eller går det i själv .then?

  }, []) 

  console.log(articles);


  function addBookmark(article) {
    dispatch( {
      type: "add",
      id: article.article_id,
    })
  }

  return (
    <div>
      <p>saved articles: 
        {/* // state.bookmarks by itself doesnt work apparently, error */}
        {state.bookmarks.map(bookmark => ( // mappar igenom istället
          <span key={bookmark.id}> {bookmark.id}</span> 
        ))}
        
      </p>
      <ul>
        {articles.map(article => (
            <li key={article.article_id}  >
              <button onClick={() => (
                addBookmark(article)
                )}>Bookmark</button> {/* // skickar hela article objektet ifall vi vill komma åt mer än bara id sen? */}
              <Link href={`/article/${article.article_id}`}><h2>{article.title}</h2></Link>
              <img src={article.image_url} alt="" /> {/* // hittar vad saker heter i det vi fetchade */}
            </li>
          )
        )}
      </ul>
    </div>
  )
}