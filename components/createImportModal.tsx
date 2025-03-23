import styles from "../styles/write.module.css";
import ReactDOM from "react-dom";
import React, { useRef, useState, useEffect } from "react";
import { newCardProps } from "../types/questions";
import { format } from "path";

type importProps = {
  onClose(): void;
  editCards(cards: newCardProps[]): void;
  setImportNotif(notif: boolean): void;
  createBox: HTMLDivElement | null;
  cards: newCardProps[];
};
const ImportSet = ({ onClose, editCards, setImportNotif, createBox, cards }: importProps) => {
  const importText = useRef<HTMLTextAreaElement>(null);
  const errorText = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [errorMsg, setErrorMsg] = useState<boolean>(false);
  const ytVid = (window.screen.width>768 ? <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/p9R5xMdn3h4?si=8w_2bv6hSpn6K5xu"
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  ></iframe> : <a className={styles.importYtButton} href="https://www.youtube.com/watch?v=p9R5xMdn3h4" target="_blank">Youtube Tutorial Link</a>)
  useEffect(() => {
    if (errorMsg) {
      console.log("yeah");
      timeoutRef.current = setTimeout(() => {
        errorText?.current?.classList.remove(styles.visible);
        setErrorMsg(false);
      }, 2000);
      return () => {
        clearTimeout(timeoutRef.current as NodeJS.Timeout);
      };
    }
  }, [errorMsg]);

  const handleCloseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
  };
  const handleImport = (e: React.MouseEvent) => {
    const re = /^(.*?)\t(.*?)$/gm;
    e.preventDefault();
    if (!importText?.current?.value) {
      setErrorMsg(true);
      errorText?.current?.classList.add(styles.visible);
    }
    if (importText?.current) {
      const matches = importText.current.value.match(re);
      if (matches) {
        let formatMatches = [];
        for (const m of matches) {
          const splitM = m.split("\t");
          const newCard = {
            question: splitM[0],
            answer: splitM[1],
            questionLanguage: "EN",
            answerLanguage: "EN",
          };
          formatMatches.push(newCard);
        }
        editCards([...cards, ...formatMatches]);
        setImportNotif(true)
        onClose();
        alert("hahaja");
      } else {
        alert("booo");
        setErrorMsg(true);
        errorText?.current?.classList.add(styles.visible);
      }
    }
  };
  const content = (
    <div className={styles.createImportBox}>
      <div className={styles.createImportHolder}>
        <div className={styles.createImportHeader}>
          <span className={styles.createImportTitle}>Import from Quizlet</span>
          <a className={styles.createImportX} onClick={handleCloseClick}>
            ✖
          </a>
        </div>
        <div className={styles.createImportBody}>
          <div className={styles.createImportVideo}>
            {ytVid}
            <span className={styles.createImportInst}>
              Follow the video tutorial above, or the text instructions below.
              <br></br>
              <br></br>
              1. Add your desired Quizlet set to your library
              <br></br>
              2. Click the three dots menu
              <br></br>
              3. Click the Export button
              <br></br>
              4. Copy text directly as is, do not change any settings
            </span>
          </div>
          <div className={styles.createImportText}>
            <textarea
              className={styles.createImportTextInput}
              ref={importText}
            ></textarea>
            <div className={styles.createImportButHold}>
              <a className={styles.createImportButton} onClick={handleImport}>
                Import
              </a>
              <span className={styles.createImportError} ref={errorText}>
                Text doesn't match required format. Please follow video
                instructions exactly.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (createBox) {
    return ReactDOM.createPortal(content, createBox);
  }
};

export default ImportSet;
