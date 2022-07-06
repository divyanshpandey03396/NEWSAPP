import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import draftToHtml from "draftjs-to-html";
import ReactHtmlParser from "react-html-parser";

const News = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [newsItem, setNewsItem] = useState(null);

  const getData = async () => {
    try {
      const payload = { newsid: params.newsid };
      setLoading(true);
      const result = await axios.post("api/newsitems/getnewsitembyid", payload);
      setNewsItem(result.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err.response);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      {loading ? (
        <Spinner />
      ) : (
        <div className="p-5">
          <h1 className="my-3 text-2xl font-semibold">
            {newsItem !== null && newsItem.title}
          </h1>
          <h1 className="my-3 text-2xl font-semibold">
            {newsItem !== null && newsItem.description}
          </h1>
          <hr />
          {newsItem !== null &&
            ReactHtmlParser(draftToHtml(JSON.parse(newsItem.content)))}
        </div>
      )}
    </Layout>
  );
};

export default News;
