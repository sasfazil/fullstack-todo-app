import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";
import {
  MainContainer,
  DashboardContainer,
  Greetings,
  UserProfileContainer,
  UserProfileBtn,
  AddTaskForm,
  TaskInputContainerLabel,
  SelectInputContainer,
  TaskInputContainerText,
  AddBtn,
  TaskListContainer,
  ListContainer,
  TitleAndRemoveContainer,
  ListTitleHeading,
  RemoveBtn,
  ListTitle,
  ListParaTitle,
  ListPara,
  StatusContainer,
  Status,
  CreatedDate,
  EditTodo,
  NoTasks,
  TitleChangeInput,
  DescriptionChangeInput,
  StatusChangeInput,
  SaveEditChanges,
  UserOptionsContainer,
  HoverUserConatiner,
  LogoutBtn,
  ChangeUserBtn,
} from "./styledComponents.js";

function Dashboard() {
  const [titleInput, setTitleInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [statusInput, setStatusInput] = useState("pending");
  const [taskData, setTaskData] = useState([]);
  const [userName, setUserName] = useState("");
  const [callEffect, setCallEffect] = useState(true);
  const [editChanges, setEditChanges] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const navigate = useNavigate();
  const jwtToken = Cookies.get("jwt_token");
  useEffect(() => {
    if (jwtToken === undefined) {
      navigate("/login", { replace: true });
    }
  }, []);
  useEffect(() => {
    const callApi = async () => {
      try {
        const apiUrl = "https://backend-todo-app-hijr.onrender.com";
        const options = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          method: "GET",
        };
        const response = await fetch(apiUrl, options);
        const data = await response.json();
        setTaskData(data[1]);
        setUserName(data[0].username);
      } catch (err) {
        alert("Server Error");
        Cookies.remove("jwt_token");
        navigate("/login", { replace: true });
      }
    };
    callApi();
  }, [callEffect]);
  const onTextIn = (event) => {
    setTitleInput(event.target.value);
  };
  const onDesIn = (event) => {
    setDescInput(event.target.value);
  };
  const formSubmit = async (event) => {
    event.preventDefault();
    if (titleInput.length >= 1) {
      const addApiUrl = "https://backend-todo-app-hijr.onrender.com/addtask/";
      const todoTask = {
        title: titleInput,
        description: descInput,
        status: statusInput,
      };
      const addOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoTask),
      };
      await fetch(addApiUrl, addOptions);
      setCallEffect(!callEffect);
      setTitleInput("");
      setDescInput("");
    }
  };
  const removeTask = async (id) => {
    const delTaskUrl = `https://backend-todo-app-hijr.onrender.com/deletetask/${id}`;
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    await fetch(delTaskUrl, options);
    setCallEffect(!callEffect);
  };
  const boxClicked = async (id) => {
    const updateStatus = `https://backend-todo-app-hijr.onrender.com/updatetask/${id}`;
    const statusUpdates = {
      title: `${editTitle}`,
      description: `${editDescription}`,
      status: `${editStatus}`,
    };
    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(statusUpdates),
    };
    await fetch(updateStatus, options);
    setEditTitle("");
    setEditDescription("");
    setEditStatus("");
    setEditChanges("");
    setCallEffect(!callEffect);
  };

  const editCall = (each) => {
    setEditTitle(each.title);
    setEditDescription(each.description);
    setEditStatus(each.status);
    setEditChanges(each.id);
  };
  const logoutUser = async () => {
    Cookies.remove("jwt_token");
    navigate("/login", { replace: true });
  };
  const changeUserData = () => {
    navigate("/updateuser", { replace: true });
  };
  return (
    <MainContainer>
      <DashboardContainer>
        <Greetings>{`Hello, ${userName}`}</Greetings>
        <UserProfileContainer>
          <Greetings as="h1">Your Tasks</Greetings>
          <UserOptionsContainer>
            <UserProfileBtn title="Logout">{userName[0]}</UserProfileBtn>
            <HoverUserConatiner>
              <LogoutBtn type="button" onClick={logoutUser}>
                Logout
              </LogoutBtn>
              <ChangeUserBtn onClick={changeUserData}>ChangeUser</ChangeUserBtn>
            </HoverUserConatiner>
          </UserOptionsContainer>
        </UserProfileContainer>
        <AddTaskForm as="form" onSubmit={formSubmit}>
          <AddTaskForm>
            <TaskInputContainerLabel htmlFor="title">
              Title
            </TaskInputContainerLabel>
            <TaskInputContainerText
              type="text"
              id="title"
              value={titleInput}
              onChange={onTextIn}
            />
          </AddTaskForm>
          <AddTaskForm>
            <TaskInputContainerLabel htmlFor="description">
              Description
            </TaskInputContainerLabel>
            <TaskInputContainerText
              type="text"
              id="description"
              value={descInput}
              onChange={onDesIn}
            />
          </AddTaskForm>
          <AddTaskForm>
            <TaskInputContainerLabel htmlFor="description">
              Status
            </TaskInputContainerLabel>
            <SelectInputContainer
              name="statusChange"
              id="statusChange"
              value={statusInput}
              onChange={(e) => setStatusInput(e.target.value)}
            >
              <option value="done">done</option>
              <option value="pending">pending</option>
              <option value="in progress">in progress</option>
              <option value="completed">completed</option>
            </SelectInputContainer>
          </AddTaskForm>
          <AddBtn type="submit">Add</AddBtn>
        </AddTaskForm>
        {taskData.length > 0 ? (
          <TaskListContainer>
            {taskData.map((each) => {
              return (
                <ListContainer key={each.id}>
                  <TitleAndRemoveContainer>
                    <ListTitleHeading>Title:</ListTitleHeading>
                    <RemoveBtn onClick={() => removeTask(each.id)}>
                      <i className="bi bi-trash3-fill"></i>
                    </RemoveBtn>
                  </TitleAndRemoveContainer>
                  {editChanges === each.id ? (
                    <TitleChangeInput
                      type="input"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                  ) : (
                    <ListTitle>{each.title}</ListTitle>
                  )}
                  <ListParaTitle>Description:</ListParaTitle>
                  {editChanges === each.id ? (
                    <DescriptionChangeInput
                      type="input"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                  ) : (
                    <ListPara className="list-para">
                      {each.description}
                    </ListPara>
                  )}
                  <TitleAndRemoveContainer>
                    <StatusContainer>
                      <h4>Status: </h4>
                      {editChanges === each.id ? (
                        <StatusChangeInput
                          value={editStatus}
                          name="editStatusChange"
                          id="editStatusChange"
                          onChange={(e) => setEditStatus(e.target.value)}
                        >
                          <option value="done">done</option>
                          <option value="pending">pending</option>
                          <option value="in progress">in progress</option>
                          <option value="completed">completed</option>
                        </StatusChangeInput>
                      ) : (
                        <Status htmlFor={each.index}>{each.status}</Status>
                      )}
                    </StatusContainer>
                    <CreatedDate>{each.createdDate}</CreatedDate>
                  </TitleAndRemoveContainer>
                  {editChanges === each.id ? (
                    <SaveEditChanges onClick={() => boxClicked(each.id)}>
                      Save Changes
                    </SaveEditChanges>
                  ) : (
                    <EditTodo onClick={() => editCall(each)}>Edit</EditTodo>
                  )}
                </ListContainer>
              );
            })}
          </TaskListContainer>
        ) : (
          <NoTasks>No tasks found</NoTasks>
        )}
      </DashboardContainer>
    </MainContainer>
  );
}
export default Dashboard;
