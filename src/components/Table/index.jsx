import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import CircleLoading from "../Loading/Circle";
import { useState } from "react";
import { CircularProgress, IconButton } from "@mui/material";
import {
  MdOutlineClose,
  MdOutlineDelete,
  MdOutlineEdit,
  MdOutlineRefresh,
  MdOutlineSave,
} from "react-icons/md";
import { convertToCheckboxState, setCheckboxNames } from "../../utils";
import CheckBoxes from "../FromElements/CheckBoxes";
import { AlertMsg, Img } from "../FromElements";
import Images from "../Images";
import {
  changes,
  deleteCourseTeam,
  getCourseTeam,
  noChanges,
  updateCourseTeam,
} from "../../../redux/slice/instructorSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976d2",
    fontSize: 18,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CollaborationListTable = () => {
  const dispatch = useDispatch();
  const [editId, setEditId] = useState("");
  const [access, setAccess] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { team, loading, course } = useSelector((state) => state.instructor);

  const handleRefresh = () => {
    dispatch(getCourseTeam(course._id));
  };

  const handleEdit = (id, access) => {
    setEditId(id);
    setAccess(access);
    dispatch(changes());
  };

  const handleDelete = async (id) => {
    const confirmation = confirm("Do you want to remove this instructor ?");

    if (confirmation) {
      dispatch(deleteCourseTeam({ course: course._id, id }));
    }
  };
  const handleClose = () => {
    setEditId("");
  };

  const handleSubmit = async (Access) => {
    if (JSON.stringify(access) === JSON.stringify(Access)) {
      dispatch(noChanges());
      setEditId("");
      return;
    }
    setLoading(true);
    const result = await dispatch(
      updateCourseTeam({
        course: course._id,
        instructor: editId,
        access: Access,
      })
    );

    if (!result.error) {
      setLoading(false);
      setEditId("");
    }
  };

  return (
    <div>
      {loading ? (
        <CircleLoading />
      ) : (
        <div>
          {team.length ? (
            <>
              <AlertMsg
                type="info"
                msg="You can add up to 5 instructors for collaboration"
              />
              <div className="collapse-button">
                <p onClick={handleRefresh}>
                  <MdOutlineRefresh />
                  Refresh
                </p>
              </div>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Learnly ID</StyledTableCell>
                      <StyledTableCell align="center">
                        Instructor Name
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Instructor Email
                      </StyledTableCell>
                      <StyledTableCell align="center">Actions</StyledTableCell>
                      <StyledTableCell align="right">Edit</StyledTableCell>
                      <StyledTableCell align="right">Delete</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {team.map((row, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell>
                          {row.instructor.learnlyId}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.instructor.name}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.instructor.email}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.instructor._id === editId ? (
                            <CheckBoxes
                              checkBoxState={convertToCheckboxState(row.access)}
                              className="table-checkbox"
                              onSubmit={handleSubmit}
                            />
                          ) : (
                            <div>
                              {setCheckboxNames(row.access).map(
                                (each, index) => (
                                  <p key={index}>
                                    <b>{each}</b>
                                  </p>
                                )
                              )}
                            </div>
                          )}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.instructor._id === editId ? (
                            isLoading ? (
                              <CircularProgress size={30} color="warning" />
                            ) : (
                              <IconButton form="check" type="submit">
                                <MdOutlineSave />
                              </IconButton>
                            )
                          ) : (
                            <IconButton
                              onClick={() =>
                                handleEdit(row.instructor._id, row.access)
                              }
                            >
                              <MdOutlineEdit />
                            </IconButton>
                          )}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.instructor._id === editId ? (
                            <IconButton onClick={handleClose}>
                              <MdOutlineClose />
                            </IconButton>
                          ) : (
                            <IconButton onClick={() => handleDelete(row._id)}>
                              <MdOutlineDelete />
                            </IconButton>
                          )}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <div className="adjust-img">
              <Img src={Images.collaboration} alt="collaboration" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CollaborationListTable;
