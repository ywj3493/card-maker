import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "../editor/editor";
import Footer from "../footer/footer";
import Header from "../header/header";
import Preview from "../preview/preview";
import styles from "./maker.module.css";

const Maker = ({ authService }) => {
  const navigate = useNavigate();

  //진짜 중요 객체도 배열처럼 사용 하게 된다면 중간 변경하기 쉽다.
  const [cards, setCards] = useState({
    1: {
      id: "1",
      name: "Ellie1",
      company: "Samsung",
      theme: "dark",
      title: "Software Engineer",
      email: "ellie@gmail.com",
      message: "go for it",
      fileName: "ellie",
      fileURL: "ellie.png",
    },
    2: {
      id: "2",
      name: "Ellie2",
      company: "Samsung",
      theme: "light",
      title: "Software Engineer",
      email: "ellie@gmail.com",
      message: "go for it",
      fileName: "ellie",
      fileURL: "ellie.png",
    },
    3: {
      id: "3",
      name: "Ellie3",
      company: "Samsung",
      theme: "colorful",
      title: "Software Engineer",
      email: "ellie@gmail.com",
      message: "go for it",
      fileName: "ellie",
      fileURL: "ellie.png",
    },
  });

  const onLogout = () => {
    authService.logout();
  };

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (!user) {
        navigate("/");
      }
    });
  });

  const createOrUpdateCard = (card) => {
    //진짜 중요, updated 는 이전 state 값인데, 이는 비동기적으로 동작할 수 있다.
    //동기적으로 동작하게 만들려면 setState에 callback 함수로 state를 넣으면 된다.
    setCards((cards) => {
      const updated = { ...cards };
      //만약 객체에 id가 없으면 추가된다.
      updated[card.id] = card;
      return updated;
    });
  };

  const deleteCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      //만약 객체에 id가 없으면 추가된다.
      delete updated[card.id];
      return updated;
    });
  };

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor
          cards={cards}
          addCard={createOrUpdateCard}
          createOrUpdateCard={createOrUpdateCard}
          deleteCard={deleteCard}
        />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
