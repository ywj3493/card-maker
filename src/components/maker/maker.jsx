import firebase from "firebase";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "../editor/editor";
import Footer from "../footer/footer";
import Header from "../header/header";
import Preview from "../preview/preview";
import styles from "./maker.module.css";

const Maker = ({ FileInput, authService, cardRepository }) => {
  const navigate = useNavigate();
  const navigateState = navigate.state;
  //진짜 중요 객체도 배열처럼 사용 하게 된다면 중간 변경하기 쉽다.
  const [cards, setCards] = useState({});
  const [userId, setUserId] = useState(navigateState && navigateState.id);

  //useCallback은 props, state가 변해도 이전 것을 사용한다.
  //즉 dependency가 있는 경우에는 반드시 넣어줘야 의도대로 동작 할 것
  const onLogout = useCallback(() => {
    authService.logout();
  }, [authService]);

  //sync card
  useEffect(() => {
    if (!userId) {
      return;
    }
    const stopSync = cardRepository.syncCards(userId, (cards) => {
      setCards(cards);
    });
    return () => stopSync();
  }, [userId, cardRepository]);

  //login logic
  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        navigate("/");
      }
    });
  }, [authService]);

  const createOrUpdateCard = (card) => {
    //진짜 중요, updated 는 이전 state 값인데, 이는 비동기적으로 동작할 수 있다.
    //동기적으로 동작하게 만들려면 setState에 callback 함수로 state를 넣으면 된다.
    setCards((cards) => {
      const updated = { ...cards };
      //만약 객체에 id가 없으면 추가된다.
      updated[card.id] = card;
      return updated;
    });
    cardRepository.saveCard(userId, card);
  };

  const deleteCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      //만약 객체에 id가 없으면 추가된다.
      delete updated[card.id];
      return updated;
    });
    cardRepository.removeCard(userId, card);
  };

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor
          FileInput={FileInput}
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
