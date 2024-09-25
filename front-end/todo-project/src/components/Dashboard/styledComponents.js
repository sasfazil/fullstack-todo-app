import styled from "styled-components";

const colors = [
  "854421",
  "008080",
  "FF00FF",
  "FFB6C1",
  "00FF00",
  "000080",
  "6B8E23",
  "F5F5DC",
  "BDBDBD",
];
const randomNum = Math.floor(Math.random() * colors.length);
const selectRandom = colors[randomNum];

export const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #${selectRandom};
  padding: 1rem;
`;

export const DashboardContainer = styled.div`
  background-color: #ffffff;
  min-height: 60vh;
  width: 40rem;
  padding: 2rem;
  border-radius: 0.4rem;
`;

export const Greetings = styled.p`
  color: #000000;
`;

export const UserProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const UserProfileBtn = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #${selectRandom};
  color: ${randomNum >= 7 ? "#000000" : "#ffffff"};
  text-transform: uppercase;
  transition: 0.15s box-shadow linear, 0.15s background-color linear;
  border-width: 0;
  cursor: pointer;
  &:hover {
    background-color: red;
    box-shadow: 2px 2px 3px #000000;
  }
`;

export const AddTaskForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
`;

export const TaskInputContainerLabel = styled.label`
  color: #000000;
  margin-bottom: 0.3rem;
`;

export const SelectInputContainer = styled.select`
  outline: none;
  padding: 0.4rem;
  border: 1px solid #cbcbcb;
  border-radius: 0.2rem;
  &:focus-within {
    box-shadow: 2px 2px 3px 0.5px #${selectRandom};
  }
`;

export const TaskInputContainerText = styled.input`
  outline: none;
  padding: 0.4rem;
  border: 1px solid #cbcbcb;
  border-radius: 0.2rem;
  &:focus-within {
    box-shadow: 2px 2px 3px 0.5px #${selectRandom};
  }
`;

export const AddBtn = styled.button`
  padding: 0.4rem 0.9rem;
  cursor: pointer;
  border: 1px solid #cbcbcb;
  border-radius: 0.2rem;
  align-self: flex-end;
  background-color: transparent;
  transition: 0.15s box-shadow linear;
  &:hover {
    box-shadow: 2px 2px 3px 0.5px #${selectRandom};
    border: 1px solid #cbcbcb;
  }
`;

export const TaskListContainer = styled.ul`
  list-style: none;
`;

export const ListContainer = styled.li`
  box-shadow: 0px 0px 5px 1px grey;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
`;

export const TitleAndRemoveContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.6rem;
`;

export const ListTitleHeading = styled.h1`
  font-size: 1.4rem;
`;

export const RemoveBtn = styled.button`
  background-color: transparent;
  border-width: 0;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 1rem;
  width: 1.6rem;
  transition: 0.15s box-shadow linear;
  &:hover {
    box-shadow: 1px 1px 3px #000000;
  }
`;

export const ListTitle = styled.h1`
  color: #2a45bf;
  font-size: 1.4rem;
  margin-left: 2rem;
  margin-bottom: 0.5rem;
`;

export const ListParaTitle = styled.p`
  font-weight: bold;
`;

export const ListPara = styled.p`
  font-size: 0.9rem;
  margin-left: 2rem;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  color: ${randomNum < 7 ? `#${selectRandom}` : "#216ba8"};
`;

export const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Status = styled.label`
  color: ${randomNum < 7 ? `#${selectRandom}` : "#216ba8"};
  font-size: 0.8rem;
  margin-left: 2rem;
`;

export const CreatedDate = styled.p`
  color: rgb(94, 90, 90);
  font-size: 0.8rem;
  text-align: right;
`;

export const EditTodo = styled.button`
  cursor: pointer;
  border: 0.1px solid #${selectRandom};
  padding: 0.4rem 0.6rem;
  border-radius: 0.3rem;
  background-color: transparent;
  margin-top: 0.6rem;
  &:hover {
    box-shadow: 2px 2px 3px 0.5px #${selectRandom};
    border: 1px solid #cbcbcb;
  }
`;

export const NoTasks = styled.div`
  text-align: center;
`;

export const TitleChangeInput = styled.input`
  color: black;
  outline: none;
`;
export const DescriptionChangeInput = styled.input`
  color: black;
  outline: none;
`;
export const StatusChangeInput = styled.select`
  color: black;
  outline: none;
`;

export const SaveEditChanges = styled.button`
  cursor: pointer;
  border: 0.1px solid #${selectRandom};
  padding: 0.4rem 0.6rem;
  border-radius: 0.3rem;
  background-color: transparent;
  margin-top: 0.6rem;
  &:hover {
    box-shadow: 2px 2px 3px 0.5px #${selectRandom};
    border: 1px solid #cbcbcb;
  }
`;

export const HoverUserConatiner = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 2.1rem;
  border: 1px solid #cbcbcb;
  border-radius: 5px;
  padding: 0.1rem;
  background-color: #ffffff;
  display: none;
`;

export const UserOptionsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover ${HoverUserConatiner} {
    display: block;
  }
`;

export const LogoutBtn = styled.button`
  background-color: #ffffff;
  border-width: 0;
  width: 100%;
  border-radius: 5px;
  &:hover {
    box-shadow: 2px 2px 3px 0.5px #${selectRandom};
    border: 1px solid #cbcbcb;
  }
  cursor: pointer;
`;

export const ChangeUserBtn = styled.button`
  background-color: #ffffff;
  border-radius: 5px;
  &:hover {
    box-shadow: 2px 2px 3px 0.5px #${selectRandom};
    border: 1px solid #cbcbcb;
  }
  border-width: 0;
  margin-top: 0.5rem;
  cursor: pointer;
`;
