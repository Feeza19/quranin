import { Link } from "gatsby";
import React, { useState } from "react";
import { FaExclamationCircle, FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import firebase from "gatsby-plugin-firebase";
import ThemeToggle from "../../components/base/ThemeToggle";
import Button from "../../components/general/button/Button";
import Input from "../../components/data-entry/input/Input";

const Index = () => {
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email yang anda masukkan tidak valid")
      .required("Email belum di isi"),
    password: Yup.string().required("Password belum di isi"),
  });

  const login = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password);
  };

  return (
    <div className="flex relative items-center justify-center min-h-screen w-full text-primary bg-secondary">
      <div className="flex items-center justify-center p-10 text-left  rounded-md">
        <div className="w-80">
          <div className="flex items-center justify-between">
            <h2 className="font-primary text-2xl font-bold text-primary">
              Masuk
            </h2>
            <ThemeToggle />
          </div>
          <div className="flex flex-col space-y-3 my-6">
            <div className="flex space-x-4 items-center bg-primary px-4 py-3 hover:shadow-primary transition duration-300 transform hover:scale-105 cursor-pointer rounded-md">
              <FcGoogle className="text-" />
              <p className="font-primary text-sm text-secondary">
                Login dengan Google
              </p>
            </div>

            <div className="flex space-x-4 items-center bg-primary px-4 py-3 hover:shadow-primary transition duration-300 transform hover:scale-105 cursor-pointer rounded-md">
              <FaFacebookF className="text- text-blue-500" />
              <p className="font-primary text-sm text-secondary">
                Login dengan Facebook
              </p>
            </div>
            <div className="py-2 text-center">
              <p className="font-primary text-sm text-secondary">atau</p>
            </div>

            {/* Email and Password */}
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={LoginSchema}
              onSubmit={({ email, password }) => {
                login(email, password);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="space-y-4">
                    <Field
                      type="text"
                      name="email"
                      placeholder="Email"
                      component={Input}
                    />
                    <ErrorMessage
                      name="email"
                      render={(msg) => (
                        <p className="flex items-center text-red-400 font-primary text-sm">
                          <FaExclamationCircle className="mr-2 text-red-400" />{" "}
                          {msg}
                        </p>
                      )}
                    />
                    <Field
                      type="password"
                      name="password"
                      placeholder="Password"
                      component={Input}
                    />
                    <ErrorMessage
                      name="password"
                      render={(msg) => (
                        <p className="flex items-center text-red-400 font-primary text-sm">
                          <FaExclamationCircle className="mr-2 text-red-400" />{" "}
                          {msg}
                        </p>
                      )}
                    />
                  </div>

                  <div className="flex items-center justify-end mt-2">
                    <Link
                      to="/forgot-password"
                      className="font-primary text-secondary text-xs"
                    >
                      lupa password?
                    </Link>
                  </div>
                  <Button type="button" className="w-full mt-4">
                    Masuk
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <hr />
      </div>

      <p className="absolute top-10 right-10 font-primary">
        Tidak punya akun?{" "}
        <Link to="/register" className="text-green-400 underline">
          Daftar
        </Link>
      </p>
    </div>
  );
};

export default Index;
