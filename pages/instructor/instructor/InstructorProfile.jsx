import { useState } from "react";
import {
  CustomInput,
  EditButton,
  SaveButton,
} from "../../../src/components/FromElements";
import TextEditor from "../../../src/components/TextEditor";
import CircleLoading from "../../../src/components/Loading/Circle";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { convertNestedObject, convertNormalObject } from "../../../src/utils";
import UploadAvatar from "../../../src/components/Avatar/UploadAvatar";
import {
  changes,
  instructorProfileUpdate,
} from "../../../redux/slice/instructorSlice";
import Header from "../../../src/components/NavBar/Header";

const inputs = [
  {
    name: "name",
    type: "text",
    label: "Name",
    placeholder: "Nagarjuna Chenna",
    required: true,
    minLength: 5,
  },
  {
    name: "headline",
    type: "text",
    label: "Headline",
    placeholder: "Software Engineer at learnly",
    required: true,
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "name@company.com",
    disabled: true,
  },
  {
    name: "website",
    type: "text",
    label: "Website",
    placeholder: "https://learnly.in",
  },
  {
    name: "twitter",
    type: "text",
    label: "Twitter",
    placeholder: "https://twitter.com/learnly",
  },
  {
    name: "youtube",
    type: "text",
    label: "Youtube",
    placeholder: "https://youtube.com/",
  },
  {
    name: "linkedin",
    type: "text",
    label: "LinkedIn",
    placeholder: "https://linkedin.com/",
  },
  {
    name: "facebook",
    type: "text",
    label: "Facebook",
    placeholder: "https://facebook.com/",
  },
];

const InstructorProfile = () => {
  const dispatch = useDispatch();
  const { profile, loading, success } = useSelector(
    (state) => state.instructor
  );

  const [readOnly, setReadOnly] = useState(true);
  const convertProfile = profile ? convertNormalObject(profile) : null;
  const onsubmit = (e) => {
    e.preventDefault();
    if (success) {
      return;
    }
    const form = convertNestedObject(e.target);
    dispatch(instructorProfileUpdate(form));
  };

  return (
    <div className="menu-content">
      {convertProfile ? (
        <form
          className="instructor-profile"
          onSubmit={onsubmit}
          onChange={() => dispatch(changes())}
        >
          <Header header="Profile">
            {readOnly ? (
              <EditButton onClick={() => setReadOnly(false)} />
            ) : (
              <SaveButton loading={loading} success={success} />
            )}
          </Header>
          <UploadAvatar
            name="instructor_profile"
            src={convertProfile.avatar}
            alt={convertProfile.name}
            className="instructor-avatar"
            readOnly={readOnly}
          />
          {inputs.map((item, index) => (
            <CustomInput
              key={index}
              name={item?.name}
              type={item?.type}
              label={item?.label}
              value={convertProfile[item.name]}
              placeholder={item?.placeholder}
              required={item?.required}
              disabled={item?.disabled}
              hidden={item?.hidden}
              inputProps={{ minLength: 5, readOnly: readOnly }}
              readOnly={readOnly}
              className="instructor-profile-input"
            />
          ))}

          <TextEditor
            label="Bio"
            name="bio"
            value={profile.bio}
            readOnly={readOnly}
          />
        </form>
      ) : (
        <CircleLoading />
      )}
    </div>
  );
};

export default InstructorProfile;
