import React from "react";

const InputBox = ({
  name,
  title,
  type,
  value,
  handleChange,
  placeholder,
  titleDescription,
  doHalf,
}) => {
  return (
    <>
      <label className={doHalf ? "inputLabelHalf" : "inputLabel"}>
        <p>
          {title} :<span className="inputDescription">{titleDescription}</span>
        </p>
        <input
          className={doHalf ? "inputBoxHalf" : "inputBox"}
          name={name}
          type={type ? type : "text"}
          value={value}
          onChange={(e) => handleChange(e)}
          placeholder={placeholder}
        />
      </label>
    </>
  );
};

export default InputBox;
