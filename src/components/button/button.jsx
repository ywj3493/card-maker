import React, { memo } from "react";
import Styles from "./button.module.css";

const Button = memo(({ name, onClick }) => (
  <button className={Styles.button} onClick={onClick}>
    {name}
  </button>
));
export default Button;
