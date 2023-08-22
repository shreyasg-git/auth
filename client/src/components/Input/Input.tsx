import * as React from "react";
import { useMemo, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import Colors from "../../consts/Colors";
import Padding from "../Padding";

type InputProps = {
  errors?: any;
  disabled?: boolean;
  name: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  label?: string;
  register: UseFormRegister<FieldValues | any>;
  validationSchema?: any;
} & React.HTMLProps<HTMLInputElement>;

const Input: React.FC<InputProps> = ({
  register,
  errors,
  disabled = false,
  name,
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

  const { labelColor, borderColor, textColor } = useMemo(() => {
    if (errors && errors[name]) {
      return {
        labelColor: Colors.red,
        borderColor: Colors.red,
        textColor: Colors.red,
      };
    }

    return {
      labelColor: Colors.primary,
      borderColor: Colors.primary,
      textColor: Colors.primary,
    };
  }, [errors, name]);

  const registered = register(name, validationSchema);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        position: "relative",
        width: "100%",
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
        }}
      >
        <label htmlFor={name} style={{ color: labelColor }}>
          {label}
          {required && "*"}
        </label>
        <Padding height={8} />
        <input
          style={{
            display: "flex",
            flex: 1,
            width: "92%",
            padding: "12px 0 12px 17px",
            fontSize: "15px",
            border: "1px solid #000",
            borderRadius: "5px",
            transition: "border, color 0.2s ease-in-out",
            background: "transparent",
            borderColor,
            color: textColor,
          }}
          aria-label={name}
          data-testid={name}
          tabIndex={0}
          type={type}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          {...registered}
        />
        {errors && errors[name] && (
          <span
            style={{
              color: Colors.red,
              marginBlock: "5px",
              fontWeight: 100,
              fontSize: "12px",
            }}
          >
            {errors[name]?.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
