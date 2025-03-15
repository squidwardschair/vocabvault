import styles from "../styles/write.module.css";
import CreateCardList from "./createCardLists";
import TextareaAutosize from "react-textarea-autosize";
import { useState, useRef } from "react";
import { newCardProps } from "../types/questions";
import Router from "next/router";
import { Turnstile } from "@marsidev/react-turnstile";
import ImportSet from "./createImportModal";
import { ChangeEvent } from "react";

const Create = () => {
  const [turnstileStatus, setTurnstileStatus] = useState<
    "success" | "error" | "expired" | "required"
  >("required");
  const [turnstileToken, setToken] = useState<string>("")
  const [cards, editCards] = useState<newCardProps[]>([]);
  const [errorMsg, editErrorMsg] = useState<string>("");
  const [createDisabled, editCreateDisabled] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [importNotif, setImportNotif] = useState<boolean>(false);
  const [importMatch, setImport] = useState<string[]>([])
  const [defaultTermLang, setDefaultTermLang] = useState<string>("EN")
  const [defaultDefLang, setDefaultDefLang] = useState<string>("EN")

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const boxRef = useRef<HTMLDivElement>(null)

  const addCard = () => {
    editCards([
      ...cards,
      {
        question: "",
        answer: "",
        questionLanguage: defaultTermLang,
        answerLanguage:defaultDefLang,
      },
    ]);
  };

  const editCard = (index: number, isQuestion: number, change: string) => {
    const nextCards = cards.map((card) => {
      if (cards.indexOf(card) == index - 1) {
        if (isQuestion == 0) {
          return {
            ...card,
            question: change,
          };
        } else if (isQuestion == 1) {
          return {
            ...card,
            answer: change,
          };
        } else if (isQuestion == 2) {
          return {
            ...card,
            questionLanguage: change,
          };
        } else {
          return {
            ...card,
            answerLanguage: change,
          };
        }
      } else {
        return card;
      }
    });
    editCards(nextCards);
  };
  const deleteCard = (index: number) => {
    editCards(cards.filter((_, i) => i !== index - 1));
  };

  const termLangSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setDefaultTermLang(e.currentTarget.value)
    let editedCards = cards
    for (let i=0; i<editedCards.length; i++) {
      editedCards[i].questionLanguage = e.currentTarget.value
    }
    editCards(editedCards)
  }


  const defLangSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setDefaultDefLang(e.currentTarget.value)
    let editedCards=cards
    for (let i=0; i<cards.length; i++) {
      editedCards[i].answerLanguage = e.currentTarget.value
    }
    editCards(editedCards)
  }
  
  const createSet = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (turnstileStatus !== "success") {
      editErrorMsg("Please verify you are not a robot");
      return;
    }
    if (cards.length < 5) {
      editErrorMsg(
        "Error creating set - 5 cards or greater are needed to create a set"
      );
      return;
    }
    if (!titleRef.current || !descriptionRef.current) {
      editErrorMsg("Error creating set - Title or description missing");
      return;
    } else if (
      !/\S/.test(titleRef.current.value) ||
      !/\S/.test(descriptionRef.current.value)
    ) {
      editErrorMsg("Error creating set - Title or description missing");
      return;
    }
    if (
      cards.filter((c) => /\S/.test(c.question) && /\S/.test(c.question))
        .length == cards.length
    ) {
      editCreateDisabled(true);
      try {
        const setBody = {
          name: titleRef?.current?.value,
          description: descriptionRef?.current?.value,
          questionLanguage: "EN",
          answerLanguage: "EN",
          cards: cards,
          turnstileToken: turnstileToken,
        };
        const setPost = await fetch("/api/set/post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(setBody),
        });
        const setResponse = await setPost.json();
        if (setPost.ok) {
          await Router.push(`/sets/${setResponse.id}`);
        } else {
          editErrorMsg(setResponse.message);
          editCreateDisabled(false)
        }
      } catch (error) {
        editErrorMsg("An unknown error occured");
        console.error(error);
        editCreateDisabled(false)
      }
    } else {
      editErrorMsg("Error creating set - Card fields are empty");
    }
  };

  return (
    <>
    <div className={styles.createBox} ref={boxRef}>
      <div className={styles.topCreateBox}>
        <div className={styles.topBoxHeader}>
          <span className={styles.createBold}>Create a new flashcard set</span>
          <button
            className={styles.createButton}
            onClick={(e) => createSet(e)}
            disabled={createDisabled}
          >
            <div className={createDisabled ? styles.createLoader : styles.noDisplay}></div>
            <span className={createDisabled ? styles.noDisplay : styles.createButtonText}>Create</span>
          </button>
        </div>
        <div className={styles.turnstileHolder}>
        <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
              onError={(token) => setTurnstileStatus("error")}
              onExpire={() => setTurnstileStatus("expired")}
              onSuccess={(token) => {
                setTurnstileStatus("success"); ; setToken(token)
              }}
            />
        </div>
        <span className={styles.errorBold}>{errorMsg}</span>
        <TextareaAutosize
          ref={titleRef}
          className={styles.createTitle}
          maxLength={100}
          placeholder="Enter a title..."
        ></TextareaAutosize>
        <TextareaAutosize
          ref={descriptionRef}
          className={styles.createDescription}
          maxLength={500}
          placeholder="Enter a description..."
        ></TextareaAutosize>
        <div className={styles.topBoxFooter}>
          <button className={styles.bottomButtons} onClick={() => addCard()}>
            <span className={styles.createButtonText}>Add card</span>
          </button>
          <button className={styles.bottomButtons} onClick={() => setShowModal(true)}>
            <span className={styles.createButtonText}>Import</span>
          </button>
          <span className={`${styles.errorBold} ${styles.importLang} ${importNotif ? styles.visible : ''}`}>Import feature does not detect language - please set language manually</span>
        </div>
        <div className={styles.topBoxFooter}>
          <div id={styles.defaultTermLang}>
          <span className={`${styles.createButtonText} ${styles.defaultLangText}`}>Default term language: </span>
          <select className={styles.languageSelect} tabIndex={-1} onChange={termLangSelect}>
              <option value="EN">EN</option>
              <option value="ES">ES</option>
              <option value="FR">FR</option>
              <option value="DE">DE</option>
          </select>
          </div>
          <div>
          <span className={`${styles.createButtonText} ${styles.defaultLangText}`}>Default definition language: </span>
          <select className={styles.languageSelect} tabIndex={-1} onChange={defLangSelect}>
              <option value="EN">EN</option>
              <option value="ES">ES</option>
              <option value="FR">FR</option>
              <option value="DE">DE</option>
          </select>
          </div>
        </div>
        <CreateCardList
          cards={cards}
          deleteCard={deleteCard}
          editCard={editCard}
          defaultDefLang={defaultDefLang}
          defaultTermLang={defaultTermLang}
        />
      </div>
    </div>
    {showModal &&
            <ImportSet onClose={() => setShowModal(false)} createBox={boxRef?.current} editCards={editCards} cards={cards} setImportNotif={setImportNotif}>
            </ImportSet>
    }
    </>
  );
};

export default Create;
