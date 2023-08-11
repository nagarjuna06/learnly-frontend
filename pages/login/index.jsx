/* eslint-disable react/no-unescaped-entities */
import { AlertMsg, Button, Img } from "../../src/components/FromElements";
import "../signup/index";
import { Link } from "react-router-dom";
import EmailInput from "../../src/components/FromElements/EmailInput";
import { useForm } from "react-hook-form";
import PasswordInput from "../../src/components/FromElements/PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import { clear, login } from "../../redux/slice/authSlice";
import Images from "../../src/components/Images";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error, msg } = useSelector((state) => state.auth);
  const { control, handleSubmit } = useForm();
  useEffect(() => {
    dispatch(clear());
  }, []);
  const handleGuestAccount = () => {
    const auth = { email: "guest@learnly.com", password: "1234567890" };
    dispatch(login(auth));
  };
  const onSubmit = (data) => dispatch(login(data));
  return (
    <div className="flex-container">
      <Img src={Images.login} alt="login" />
      <form className="form" onSubmit={handleSubmit(onSubmit)} autoFocus>
        <Img src={Images.logo} alt="logo" />
        <h2>Login</h2>
        {error ? <AlertMsg type={"error"} msg={msg} /> : null}
        <EmailInput control={control} />
        <PasswordInput control={control} />
        <Link className="link forgot-link" to="/forgot">
          Forgot Password?
        </Link>
        <Button value="login" color="primary" type="submit" loading={loading} />
        <p className="reference">
          Don't have an account?{" "}
          <Link to="/signup" className="link">
            Sign up
          </Link>
          <br />
          or
        </p>
        <Button
          loading={loading}
          value="use a guest account"
          variant="elevated"
          onClick={handleGuestAccount}
        />
      </form>
    </div>
  );
};

export default Login;
