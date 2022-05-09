import React from "react";
import Button from "../button/button";
import ImageFileInput from "../image_file_input/image_file_input";
import styles from "./card_edit_form.module.css";

const CardEditForm = ({ card }) => {
  const { id, name, company, theme, title, email, message, fileName, fileURL } =
    card;
  const onSubmit = () => {};
  return (
    <form className={styles.form}>
      <input
        className={styles.input}
        type="text"
        name="name"
        id="name"
        value={name}
      />
      <input
        className={styles.input}
        type="text"
        name="company"
        id="company"
        value={company}
      />
      <select className={styles.select} name="theme" id="theme" value={theme}>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
        <option value="colorful">Colorful</option>
      </select>
      <input className={styles.input} type="text" value={title} />
      <input className={styles.input} type="text" value={email} />
      <textarea className={styles.textarea} type="text" value={message} />
      <div className={styles.fileInput}>
        <ImageFileInput></ImageFileInput>
      </div>
      <Button name="Delete"></Button>
    </form>
  );
};

export default CardEditForm;
