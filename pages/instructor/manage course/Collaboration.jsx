import Header from "../../../src/components/NavBar/Header";
import AddCollaborator from "../../../src/components/Popups/AddCollaborator";
import CollaborationListTable from "../../../src/components/Table";
import { useSelector } from "react-redux";
const Collaboration = () => {
  const collaboratorLength = useSelector(
    (state) => state.instructor.team.length
  );
  return (
    <div>
      <Header header="Collaboration">
        {collaboratorLength <= 5 ? <AddCollaborator /> : null}
      </Header>

      <CollaborationListTable />
    </div>
  );
};

export default Collaboration;
