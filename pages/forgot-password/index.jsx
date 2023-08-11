import { useDispatch, useSelector } from "react-redux";
import { AlertMsg, Button, Img } from "../../src/components/FromElements";
import EmailInput from "../../src/components/FromElements/EmailInput";
import PasswordInput from "../../src/components/FromElements/PasswordInput";
import OtpInput from "../../src/components/FromElements/OtpInput";
import { useForm } from "react-hook-form";
import {
  clear,
  forgotpassword,
  resetOtpVerify,
} from "../../redux/slice/authSlice";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Images from "../../src/components/Images";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, sendOtp, success, msg } = useSelector(
    (state) => state.auth
  );
  const { control, handleSubmit } = useForm();
  useEffect(() => {
    dispatch(clear());
  }, []);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    }
  }, [success]);
  const onSubmit = (data) => {
    if (sendOtp) {
      dispatch(resetOtpVerify(data));
    } else {
      dispatch(forgotpassword(data));
    }
  };
  return (
    <div className="flex-container">
      <Img src={sendOtp ? Images.otp : Images.forgot} alt="img" />
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Img src={Images.logo} alt="logo" />
        <h2>Forgot Password</h2>
        {sendOtp || error ? (
          <AlertMsg type={error ? "error" : "success"} msg={msg} />
        ) : null}
        <EmailInput control={control} disabled={sendOtp} />
        {sendOtp ? (
          <>
            <OtpInput control={control} />
            <PasswordInput control={control} />
          </>
        ) : null}

        <Button
          value={sendOtp ? "verify otp" : "reset password"}
          color={sendOtp ? "secondary" : "primary"}
          type="submit"
          loading={loading || success}
        />
        <p className="reference">
          Back to{" "}
          <Link to="/login" className="link">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
