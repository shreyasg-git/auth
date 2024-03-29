import React, { useState } from "react";
import { Button, Input } from "../../components";
import Colors from "../../consts/Colors";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { getProtected, signUp } from "../../sides/mutations";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthContext } from "../../contexts/AuthContext";
import Page from "../../components/Page";
import Padding from "../../components/Padding";
import { ButtonTypes } from "../../components/Button/Button";

type SignUpPageProps = {};

const SignUpPage: React.FC<SignUpPageProps> = ({}) => {
  const { isLoggedIn } = useAuthContext();
  console.log(isLoggedIn);

  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(8).required("Password is required"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords do not match"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({ resolver: yupResolver(schema) });

  const { data, mutate: signUpMutation } = useMutation(signUp, {
    onSuccess(data, variables, context) {},
  });

  const onSubmit = async (data: any) => {
    const res = await signUpMutation({
      email: data.email,
      password: data.password,
    });
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
            // type="email"
            name="password"
            label="Password"
            errors={errors}
            register={register}
            required
          />

          <Padding height={8} />

          <Input
            // type="email"
            name="confirmPassword"
            label="Confirm Password"
            errors={errors}
            register={register}
            required
          />
          <Padding height={14} />
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button title="SIGNUP" onClick={handleSubmit(onSubmit)} flat />
          </div>
          <Padding height={14} />
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              title="Go To Login Page"
              // onClick={handleSubmit(onSubmit)}
              flat
              type={ButtonTypes.SECONDARY}
            />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default SignUpPage;
