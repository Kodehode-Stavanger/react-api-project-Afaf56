import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./ItemDetails.module.css";

export default function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setItem(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error fetching data", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading....</p>;
  }

  const renderStars = (rating) => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<span>⭐</span>);
      } else {
        stars.push(<span> ✰</span>);
      }
    }
    return stars;
  };

  return (
    <div className={styles.card}>
      <img src={item.image} alt={item.title} />
      <div>
        <h2>{item.title}</h2>
        <div className={styles.stars}>
          {renderStars(item.rating.rate)}{" "}
          <span>{item.rating.count} reviews</span>{" "}
        </div>
        <p>
          Description: <span>{item.description}</span>{" "}
        </p>
        <p>Price: ${item.price}</p>
        <p>
          Category: <span>{item.category}</span>{" "}
        </p>
      </div>
    </div>
  );
}
