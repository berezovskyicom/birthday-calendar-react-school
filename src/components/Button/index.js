import React from 'react';
import "./style.css";

const Button = ({ className, text, ...props }) => {
  const classNames = ["Button", className].filter(Boolean).join(" ").trim();
  return (
    <button className={classNames} {...props}>{text}</button>
  )
}

export default Button;
