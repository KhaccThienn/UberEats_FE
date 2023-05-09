import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import classNames from "classnames/bind";

import style from "./login.module.css";
import { Link } from "react-router-dom";

const cx = classNames.bind(style);

function Login() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className={cx("container")}>
      <div className="h-100 row justify-content-between align-items-center h-100 p-5">
        <div className={cx("col-lg-12")}>
          <Form
            className="login-form"
            name="basic"
            labelCol={{}}
            wrapperCol={{}}
            style={{
              alignSelf: "center",
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              style={{
                color: "white",
              }}
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              Or <Link to="">register now!</Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
