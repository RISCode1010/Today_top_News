import React,{useState} from "react";

export default function NewsItem(props) {
  let { title, description, imageUrl, newsUrl, author, date } = props;

  const [tick, setTick] = useState(false)

  const handleTick = ()=>{
      if (tick===true) {
        setTick(false);
      }else{
        setTick(true)
      }
  }

  return (
    <div>
      <div className="card">
        <img
          className="card__image"
          src={
            !imageUrl
              ? "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
              : imageUrl
          }
          alt="Not Found !!"
        />
        <div className="card__content">
          <h5>
            By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}
            aa
          </h5>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="card__info">
          <div className="helo">
           {tick?<i onClick={handleTick} className="fa-solid fa-heart tick"></i>:<i onClick={handleTick} className="fa-regular fa-heart"></i>}
          </div>
          <div>
            <a href={newsUrl} className="card__link">
              View Article
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
