 // variabel kommer heta 'id', drf vi gjorde [id].js ...

 // individuell artikel sida

import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";

 const myAPI_KEY = "pub_382120086c1799d089c0da41a4c9ee4d8a9ec";

 export default function Article(props) {
  console.log("Article props", props);

  const [article, setArticle] = useState(null);

  const router = useRouter();
  const { id } = router.query; // id är ifrån [id].jsx? 

  useEffect( () => {
    // hämtar allt igen
    fetch (
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&q=pizza`
    ).then(res => res.json()).then(data => {
      const allArticles = data.results;
      // sparar den specika artikeln
      const article = allArticles.find(article => article.article_id == id)

      setArticle(article);
    }) 

  }, [id]) 

  return (
    <div>
      {article && ( // måste göra detta... detta körs typ en millisekund innan vi hunnit fetcha datan och då blir det error.. article är null då dvs..
        <>
        <h2>{article.title}</h2>
        <img src={article.image_url} alt="" />
        </>
      )}
    </div>
  )
 }