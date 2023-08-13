/* eslint-disable react-hooks/exhaustive-deps */
import { AlertMsg, Button, Img } from "../../src/components/FromElements";
import "./index.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import NameInput from "../../src/components/FromElements/NameInput";
import PasswordInput from "../../src/components/FromElements/PasswordInput";
import EmailInput from "../../src/components/FromElements/EmailInput";
import { useDispatch, useSelector } from "react-redux";
import { clear, signup, signupOtpVerify } from "../../redux/slice/authSlice";
import OtpInput from "../../src/components/FromElements/OtpInput";
import Images from "../../src/components/Images";
import { useEffect } from "react";

const SignUp = () => {
  const dispatch = useDispatch();
  const { loading, error, sendOtp, msg } = useSelector((state) => state.auth);
  const { control, handleSubmit } = useForm();
  useEffect(() => {
    dispatch(clear());
  }, []);
  const onSubmit = async (data) => {
    if (sendOtp) {
      await dispatch(signupOtpVerify(data));
    } else {
      await dispatch(signup(data));
    }
  };
  return (
    <div className="flex-container">
      <Img src={sendOtp ? Images.otp : Images.signup} alt="img" />
      <form className="form" onSubmit={handleSubmit(onSubmit)} autoFocus>
        <Img src={Images.logo} alt="logo" />
        <h2>Sign Up</h2>
        {sendOtp || error ? (
          <AlertMsg type={error ? "error" : "success"} msg={msg} />
        ) : null}

        <NameInput control={control} disabled={sendOtp} />
        <EmailInput control={control} disabled={sendOtp} />
        <PasswordInput control={control} disabled={sendOtp} />
        {sendOtp ? <OtpInput control={control} /> : null}

        <Button
          value={sendOtp ? "verify otp" : "sign up"}
          color={sendOtp ? "secondary" : "primary"}
          type="submit"
          loading={loading}
        />
        <p className="reference">
          Already have an account?{" "}
          <Link to="/login" className="link">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
