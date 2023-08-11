import { useDispatch, useSelector } from "react-redux";
import {
  AlertMsg,
  Button,
  CustomInput,
} from "../../src/components/FromElements";
import "./index.css";
import { clear, logout, updateUser } from "../../redux/slice/authSlice";
import CircleLoading from "../../src/components/Loading/Circle";
import { useEffect } from "react";
import UploadAvatar from "../../src/components/Avatar/UploadAvatar";

const UpdateUserDetails = () => {
  const dispatch = useDispatch();
  const { error, profile, msg, success, loading, guestMode } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    dispatch(clear());
  }, [dispatch]);

  const onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { user_profile } = Object.fromEntries(formData);
    if (user_profile.name === "") {
      formData.delete("user_profile");
    }
    if (guestMode) {
      dispatch(logout());
      return;
    }
    dispatch(updateUser(formData));
  };
  return (
    <>
      <form onSubmit={onsubmit} className="profile-form">
        {profile ? (
          <>
            <UploadAvatar
              src={profile?.avatar}
              alt={profile?.name}
              name="user_profile"
            />
            <div>
              {error || success ? (
                <AlertMsg type={success ? "success" : "error"} msg={msg} />
              ) : null}
              <CustomInput
                label="Email"
                type="email"
                value={profile.email}
                disabled
              />
              <br />
              <CustomInput
                name="name"
                type="text"
                label="Name"
                value={profile.name}
                required={true}
                inputProps={{ minLength: 5 }}
              />
              <br />
              <Button value="save" type="submit" loading={loading} />
            </div>
          </>
        ) : (
          <CircleLoading />
        )}
      </form>
    </>
  );
};

export default UpdateUserDetails;
