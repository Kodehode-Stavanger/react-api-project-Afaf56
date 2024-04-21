// import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./CategoryItem.module.css";

export default function CategoryItems() {
  const { categoryName } = useParams();
  console.log("Category Name:", categoryName);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/category/${categoryName}`)

      .then((response) => {
        console.log(response.data);
        setItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching category items", error);
        setLoading(false);
      });
  }, [categoryName]);

  if (loading) {
    return <p>Loading... </p>;
  }

  return (
    <div className={styles.div}>
      <h2>{categoryName}</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link to={`/item/${item.id}`} className={styles.a}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
