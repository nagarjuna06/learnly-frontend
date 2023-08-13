import Header from "../../../src/components/NavBar/Header";
import AddCollaborator from "../../../src/components/Popups/AddCollaborator";
import CollaborationListTable from "../../../src/components/Table";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
const Collaboration = () => {
  const collaboratorLength = useSelector(
    (state) => state.instructor.team.length
  );
  return (
    <div>
      <Helmet>
        <title>Collaboration</title>
      </Helmet>
      <Header header="Collaboration">
        {collaboratorLength <= 5 ? <AddCollaborator /> : null}
      </Header>

      <CollaborationListTable />
    </div>
  );
};

export default Collaboration;
