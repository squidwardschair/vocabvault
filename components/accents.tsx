import styles from "../styles/write.module.css";

type roundProps = {
  letter: string | undefined;
  pressed(): void;
  frenchEPressed(accentNum: number): void;
  language: string;
};

const spanishAccents: { [key: string]: string } = {
  a: "á",
  A: "Á",
  e: "é",
  E: "É",
  i: "í",
  I: "Í",
  n: "ñ",
  N: "Ñ",
  o: "ó",
  O: "Ó",
};

const frenchAccents: { [key: string]: string } = {
  a: "à",
  A: "À",
  e: "annoying",
  E: "annoying",
  i: "annoying",
  I: "annoying",
  o: "ô",
  O: "Ô",
  u: "annoying",
  U: "annoying",
  c: "ç",
  C: "Ç",
  é: "e",
  è: "e",
  ê: "e",
  ë: "e",
  É: "E",
  È: "E",
  Ê: "E",
  Ë: "E",
  Ù: "U",
  Ü: "U",
  Û: "U",
  ù: "u",
  ü: "u",
  û: "u",
  î: "i",
  Î: "I",
  ï: "i",
  Ï: "I",
};

const germanAccents: { [key: string]: string } = {
  a: "ä",
  A: "Ä",
  o: "ö",
  O: "Ö",
  u: "ü",
  U: "Ü",
  s: "ß",
};

const lowerEs = ["é", "è", "ê", "ë"];
const capitalEs = ["É", "È", "Ê", "Ë"];
const capitalUs = ["Ù", "Ü", "Û"];
const lowerUs = ["ù", "ü", "û"];
const lowerIs = ["î", "ï"]
const capitalIs = ["Ï", "Î"]

const AccentBox = ({
  letter,
  pressed,
  frenchEPressed,
  language,
}: roundProps) => {
  let allAccents: { [key: string]: string } | undefined;
  let langAccent;
  if (language == "ES") {
    langAccent = spanishAccents;
    allAccents = {
      ...spanishAccents,
      ...Object.entries(spanishAccents).reduce(
        (acc: { [key: string]: string }, [key, value]) => (
          (acc[value] = key), acc
        ),
        {}
      ),
    };
  } else if (language == "FR") {
    langAccent = frenchAccents;
    allAccents = frenchAccents;
  } else if (language == "DE") {
    langAccent = germanAccents;
    allAccents = {
      ...germanAccents,
      ...Object.entries(germanAccents).reduce(
        (acc: { [key: string]: string }, [key, value]) => (
          (acc[value] = key), acc
        ),
        {}
      ),
    };
  }
  if (
    language == "EN" ||
    letter == undefined ||
    langAccent == undefined ||
    allAccents == undefined ||
    (!Object.keys(langAccent).includes(letter) &&
      !Object.values(langAccent).includes(letter))
  ) {
    return (
      <div
        className={`${styles.accentBox} ${styles.hidden}`}
        onClick={pressed}
      ></div>
    );
  } else if (allAccents[letter] == "annoying") {
    let eaccents;
    if (letter == "e") {
      eaccents = lowerEs;
    } else if (letter == "E") {
      eaccents = capitalEs;
    } else if (letter == "u") {
      eaccents = lowerUs;
    } else if (letter == "U") {
      eaccents = capitalUs;
    } else if (letter == "i") {
      eaccents = lowerIs
    } else {
      eaccents = capitalIs
    }
    return (
      <div className={styles.frenchEaccents}>
        {eaccents.map((accent, index) => (
          <div className={styles.accentBox} onClick={() => frenchEPressed(index)}>
            {accent}
          </div>
        ))}
      </div>
    )
  } else if (lowerEs.includes(letter.toLowerCase())) {
    return (
      <div className={styles.accentBox} onClick={pressed}>
        {letter in capitalEs ? "E" : "e"}
      </div>
    );
  } else if (lowerUs.includes(letter.toLowerCase())) {
    return (
      <div className={styles.accentBox} onClick={pressed}>
        {letter in capitalUs ? "U" : "u"}
      </div>
    );
  } else if (lowerIs.includes(letter.toLowerCase())) {
    return (
      <div className={styles.accentBox} onClick={pressed}>
        {letter in capitalIs ? "I" : "i"}
      </div>
    );
  } else {
    return (
      <div className={styles.accentBox} onClick={pressed}>
        {allAccents[letter]}
      </div>
    );
  }
};

export default AccentBox;
