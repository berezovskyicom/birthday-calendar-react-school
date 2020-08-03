import React from "react";
import "./style.css";

const Stickie = ({ className, children, ...props }) => {
  const classNames = ["Stickie", className].filter(Boolean).join(" ").trim();
  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}

export default Stickie;
