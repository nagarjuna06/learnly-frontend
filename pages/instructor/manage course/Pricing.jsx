import { AlertMsg, SaveButton } from "../../../src/components/FromElements";
import CustomRadioGroup from "../../../src/components/FromElements/RadioGroup";
import Header from "../../../src/components/NavBar/Header";
import { Helmet } from "react-helmet";
const Pricing = () => {
  return (
    <div className="instructor-course">
      <Helmet>
        <title>Pricing</title>
      </Helmet>
      <Header header="Pricing">
        <SaveButton success />
      </Header>
      <p>
        How do you intend to offer your course? Select the monetization option.
      </p>
      <CustomRadioGroup />
      <AlertMsg
        type="info"
        msg="This pricing features will be updated in the future."
      />
    </div>
  );
};

export default Pricing;
