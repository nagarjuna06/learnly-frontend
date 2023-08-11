/* eslint-disable react/prop-types */
import { IconButton } from "@mui/material";
import { MdAdd, MdDelete, MdDragIndicator } from "react-icons/md";
import { Controller } from "react-hook-form";
import { Button, CustomInput } from "./index";
import { useDispatch } from "react-redux";
import { changes } from "../../../redux/slice/instructorSlice";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
const DeleteInputs = ({
  name = "",
  placeholder = "",
  control,
  handleRemove,
  handleAppend,
  handleMove,
  Fields,
  maximumFields,
}) => {
  const dispatch = useDispatch();
  const handleDelete = (index) => {
    handleRemove(index);
    dispatch(changes());
  };
  const handleAdd = (value) => {
    handleAppend(value);
    dispatch(changes());
  };
  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.index === destination.index) return;
    handleMove(source.index, destination.index);
    dispatch(changes());
  };
  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId={name}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {Fields.map((item, index) => (
                <div key={item.id}>
                  <Controller
                    name={`intended.${name}.${index}.points`}
                    control={control}
                    rules={{
                      required: `${name} is required.`,
                      minLength: {
                        value: 5,
                        message: `${name} must be at least 5 characters.`,
                      },
                      maxLength: {
                        value: 160,
                        message: `${name} must be maximum 160 characters.`,
                      },
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <div ref={null}>
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                            >
                              <div className="delete-input">
                                <div
                                  {...provided.dragHandleProps}
                                  title={`drag to rearrange the ${name}`}
                                >
                                  <MdDragIndicator className="drag-icon" />
                                </div>
                                <CustomInput
                                  autoComplete="off"
                                  sx={{ width: "95%" }}
                                  type="text"
                                  placeholder={placeholder}
                                  variant="outlined"
                                  value=""
                                  error={!!error}
                                  helperText={error ? error.message : null}
                                  {...field}
                                  size="small"
                                />
                                <IconButton
                                  aria-label="delete"
                                  onClick={() => handleDelete(index)}
                                >
                                  <MdDelete />
                                </IconButton>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      </div>
                    )}
                  />
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {Fields.length < maximumFields ? (
          <Button
            value={`Add ${maximumFields - Fields.length} more to your response`}
            variant="transparent"
            startIcon={<MdAdd />}
            onClick={() => {
              handleAdd({ points: "" });
            }}
          />
        ) : null}
      </DragDropContext>
    </div>
  );
};

export default DeleteInputs;
