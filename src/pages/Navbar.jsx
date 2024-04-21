import { useEffect } from "react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching categoties", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading....</p>;

  return (
    <div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {categories.map((category) => (
            <li key={category}>
              <Link to={`/category/${category}`}>{category}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
