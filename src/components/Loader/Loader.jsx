import React from "react";
import s from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={s.loader__box}>
      <div className={s.wrapper}>
        <div className={s.wrapper__circle}></div>
        <div className={s.wrapper__circle}></div>
        <div className={s.wrapper__circle}></div>
        <div className={s.wrapper__shadow}></div>
        <div className={s.wrapper__shadow}></div>
        <div className={s.wrapper__shadow}></div>
      </div>
      <div className={s.card}>
        <div className={s.card__loader}>
          <p>loading</p>
          <div className={s.card__words}>
            <span className={s.card__words_word}>buttons</span>
            <span className={s.card__words_word}>forms</span>
            <span className={s.card__words_word}>switches</span>
            <span className={s.card__words_word}>cards</span>
            <span className={s.card__words_word}>buttons</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
