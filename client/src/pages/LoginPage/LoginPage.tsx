import React, { useState } from "react";
import { Button, Input } from "../../components";
import Colors from "../../consts/Colors";
import { useForm } from "react-hook-form";
import { getProtected, loginMutation } from "../../sides/mutations";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Page from "../../components/Page";
import Padding from "../../components/Padding";

type LoginPageProps = {};

const LoginPage: React.FC<LoginPageProps> = ({}) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data: any) => {
    setErrorMsg("");
    const res: any = await loginMutation({
      email: data.email,
      password: data.password,
    });
    console.log("LOGIN RESPONSE", res);

    if (res && res.name === "AxiosError") {
      setErrorMsg("Email address or password not valid");
      return;
    }

    if (res && res?.status === 200) {
      console.log("AAAAAAAAAaa");

      setSuccessMsg("Login Successful !");
    }
  };

  return (
    <Page>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: 400,
          height: 500,
          margin: "auto",
          border: `solid 1px ${Colors.secondary}`,
          borderRadius: "5px",
          boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
        }}
      >
        <img src="./logo-no-background.svg" alt="" height={50} width={50} />
        <div>
          <Input
            type="email"
            name="email"
            label="Email"
            errors={errors}
            register={register}
            required
          />
          <Padding height={8} />

          <Input
            name="password"
            label="Password"
            errors={errors}
            register={register}
            required
          />
          <Padding height={8} />
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {errorMsg && (
              <div
                style={{
                  color: Colors.red,
                  marginBlock: "5px",
                  fontWeight: 100,
                  fontSize: "12px",
                }}
              >
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div
                style={{
                  color: Colors.green,
                  marginBlock: "5px",
                  fontWeight: 100,
                  fontSize: "15px",
                }}
              >
                {successMsg}
              </div>
            )}
          </div>
          <Padding height={8} />
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button title="Login" onClick={handleSubmit(onSubmit)} flat />
          </div>
          <Padding height={14} />
        </div>
      </div>
    </Page>
  );
};

export default LoginPage;
