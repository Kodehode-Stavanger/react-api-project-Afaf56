import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading ....</p>;

  return (
    <div className={styles.frame}>
      {items.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          {/* <h2>{item.price}$</h2> */}
          <img src={item.image} alt={item.title} />
          {/* <p>{item.description}</p> */}
          <br />
          <Link to={`/item/${item.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
}
