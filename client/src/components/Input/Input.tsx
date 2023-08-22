import * as React from "react";
import { ChangeEventHandler } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
// import styled from "@emotion/styled";
// import Errors from "../Errors";
// import Icon from "../Icon";

type InputProps = {
  errors?: any;
  disabled?: boolean;
  name: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  label?: string;
  register: UseFormRegister<FieldValues | any>;
  validationSchema: any;
} & React.HTMLProps<HTMLInputElement>;

const Input: React.FC<InputProps> = ({
  register,
  errors,
  disabled = false,
  name,
  onChange,
  placeholder,
  required,
  type,
  value,
  label,
  validationSchema,
}) => {
  const inputRef = React.useRef(null);

  const handleClick = () => {
    // @ts-expect-error
    if (inputRef && inputRef.current) inputRef.current.focus();
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,

        // height: "65px",
        position: "relative",
        width: "100%",
        // backgroundColor: "#454545",
      }}
    >
      <div
        onClick={handleClick}
        className="container"
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          flexDirection: "column",
          flex: 1,
          // backgroundColor: "#787878",
        }}
      >
        {/* {icon && <Icon dataTestId={`icon-${name}`} type={icon} />} */}
        <label htmlFor={name}>
          {label}
          {required && "*"}
        </label>
        <input
          style={{
            display: "flex",
            flex: 1,
            width: "92%",
            // color: "#f7f7f7",
            padding: "12px 0 12px 17px",
            // width: "99%",
            fontSize: "15px",
            border: "1px solid #000",
            // border: "1px solid #e80700",
            borderRadius: "5px",
            transition: "border, color 0.2s ease-in-out",
            background: "transparent",
          }}
          // ref={inputRef}
          aria-label={name}
          data-testid={name}
          tabIndex={0}
          type={type}
          // name={name}
          // onChange={onChange}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          {...register(name, validationSchema)}
        />
        {errors && errors[name] && (
          <span className="error" style={{ color: "red" }}>
            {errors[name]?.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
