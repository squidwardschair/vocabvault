import styles from "../styles/write.module.css";
import {Set} from "@prisma/client"
import { VocabVaultLogoB } from "./vocabvaultlogoB";
import { useState, useEffect } from "react";
import Router from "next/router";

type setData = {
  sets: Set[]
};

const HomeSets = ({ set }: { set: Set}) => {

    const onClick = () => {
        Router.push(`/sets/${set.id}`)
    }
    return (
        <div className={styles.homeSet} onClick={onClick}>
            <span className={styles.homeSetName}>{set.name}</span>
            <span className={styles.homeSetDesc}>{set.description}</span>
        </div>
    )
}
const Home = ({ sets }: setData) => {
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }
  return (
    <div className={styles.homePage}>
        <div className={styles.homePgHeader}>
            <span className={styles.homeTitle}>A Better Way to Study Vocab</span>
            <span className={styles.homeDesc}>No ads. No AI generation. No revolutionary new methods. Build your memory for vocab with easy to use flashcards, write mode, and an intuitive learn feature.</span>
            <a className={styles.homeCreate} href="/create">Create a set today</a>
            <VocabVaultLogoB></VocabVaultLogoB>
        </div>
        <div className={styles.homeSets}>
            <span className={styles.homeSetTitle}>Explore Top Sets</span>
            <div className={styles.homeSetHolder}>
                {sets.map((s, index) => (<HomeSets set={s} />))}
            </div>
        </div>

    </div>
  );
};
export default Home;
