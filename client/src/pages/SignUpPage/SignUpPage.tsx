import React, { useState } from "react";
import { Input } from "../../components";
import Colors from "../../consts/Colors";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { getProtected, signUp } from "../../sides/mutations";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthContext } from "../../contexts/AuthContext";
import Page from "../../components/Page";

type SignUpPageProps = {};

const SignUpPage: React.FC<SignUpPageProps> = ({}) => {
  const { isLoggedIn } = useAuthContext();
  console.log(isLoggedIn);

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(32).required(),
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
      AAA{isLoggedIn ? 1 : 0}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: 400,
          height: 500,
          margin: "auto",
          border: "solid 1px #00ADB5",
          borderRadius: "5px",
        }}
      >
        <img src="./logo-no-background.svg" alt="" height={50} width={50} />
        <div>
          <Input
            validationSchema={{}}
            type="email"
            name="email"
            label="Email"
            errors={errors}
            register={register}
            required
          />
          <Input
            validationSchema={{}}
            // type="email"
            name="password"
            label="Password"
            errors={errors}
            register={register}
            required
          />

          <button
            onClick={() => {
              handleSubmit(onSubmit)();
              console.log("AAAA", getValues(), errors);
            }}
          >
            LOGIN
          </button>
        </div>
        <div
          onClick={async () => {
            const res = await getProtected();
          }}
        >
          check if logged in
        </div>
      </div>
    </Page>
  );
};

export default SignUpPage;
