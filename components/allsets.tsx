import styles from "../styles/write.module.css";
import { Set } from "@prisma/client";
import { useState, useEffect } from "react";
import Router from "next/router";

type setData = {
  sets: Set[];
};

const HomeSets = ({ set }: { set: Set }) => {
  const onClick = () => {
    Router.push(`/sets/${set.id}`);
  };
  return (
    <div className={styles.homeSet} onClick={onClick}>
      <span className={styles.homeSetName}>{set.name}</span>
      <span className={styles.homeSetDesc}>{set.description}</span>
    </div>
  );
};

const AllSets = ({ sets }: setData) => {
  const [hydrated, setHydrated] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return null;
  }


  const searchFilter = () => {
    return sets.filter((el) => el.name.toLowerCase().includes(query.toLowerCase()) || el.description?.toLowerCase().includes(query.toLowerCase()));
  };

  const filtered = searchFilter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.homeSets}>
        <span className={styles.homeSetTitle}>Explore Sets</span>
        <input
          className={styles.filterSets}
          type="text"
          placeholder="Search for a set..."
          onChange={handleChange}
        />
        <div className={styles.homeSetHolder}>
          {filtered.length>0 ? filtered.map((s, index) => (
            <HomeSets set={s} />
          )) : "No sets matched your search"}
        </div>
      </div>
    </div>
  );
};
export default AllSets;
