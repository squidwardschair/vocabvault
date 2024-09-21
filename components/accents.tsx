import styles from "../styles/write.module.css";

type roundProps = {
  letter: string|undefined;
  pressed(): void;
};

const accents: {[key: string]: string} = {
    "a": "á",
    "A": "Á",
    "e": "é",
    "E": "É",
    "i": "í",
    "I": "Í",
    "n": "ñ" ,
    "N": "Ñ",
    "o": "ó",
    "O": "Ó",

}

const AccentBox = ({ letter, pressed }: roundProps) => {
  const allAccents: {[key: string]: string} = { ...accents, ...Object.entries(accents).reduce((acc: {[key: string]: string}, [key, value]) => (acc[value] = key, acc), {})}
  if (letter==undefined||(!Object.keys(accents).includes(letter)&&!Object.values(accents).includes(letter))) {
    return (
      <div className={`${styles.accentBox} ${styles.hidden}`} onClick={pressed}></div>
      );
  } else {
    return (
      <div className={styles.accentBox} onClick={pressed}>{allAccents[letter]}</div>
    );
  }
};

export default AccentBox;
