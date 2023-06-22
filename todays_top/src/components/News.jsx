import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    // props.setProgress(10);
    // const url = `${process.env.REACT_APP_API_URL}?country=${props.country}&category=${props.category}&apiKey=${process.env.REACT_APP_API_KEY}&page=${page}&pageSize=${props.pageSize}`;
    // console.log(props.country);
    // console.log(props.category);
    // console.log(page);
    // console.log(props.pageSize);
    const params = {
      country: props.country,
      category: props.category,
      page: page,
      pageSize: props.pageSize,
    };
    // console.log(params);
    setLoading(true);
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    };
    let response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/news`,
      requestOptions
    );
    // console.log(response);
    if (!response.ok) {
      console.log("Failed to fetch news");
    }
    // props.setProgress(30);
    let parsedData = await response.json();
    // console.log(parsedData);
    // let parsedData = await data.json();
    // props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    // props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    // const url = `${process.env.REACT_APP_API_URL}?country=${props.country}&category=${props.category}&apiKey=${process.env.REACT_APP_API_KEY}&page=${page+1}&pageSize=${props.pageSize}`;
    const params = {
      country: props.country,
      category: props.category,
      page: page + 1,
      pageSize: props.pageSize,
    };
    setPage(page + 1);
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    };
    let response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/news`,
      requestOptions
    );
    // console.log(response);
    if (!response.ok) {
      console.log("Failed to fetch news");
    }
    let parsedData = await response.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <div>
      <div className="head">
        <h1>Top {capitalizeFirstLetter(props.category)} Headlines</h1>
      </div>

      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="cards">
          {articles.map((element) => {
            return (
              <div key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
