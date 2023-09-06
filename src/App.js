import Form from "./components/Form";
import "./App.css";
import Members from "./components/Members";
import { Switch, Route, NavLink, useHistory } from "react-router-dom";
import { useState } from "react";

function App() {
  const membersInitial = [
    {
      id: 1,
      img: "https://picsum.photos/200/300",
      name: "Denizhan Bakiryor",
      email: "denizhanbakiryor@gmail.com",
      rol: "Front-end developer",
    },
    {
      id: 2,
      img: "https://picsum.photos/200/300",
      name: "Ege Bakiryor",
      email: "egebakiryor@gmail.com",
      rol: "Back-end developer",
    },
    {
      id: 3,
      img: "https://picsum.photos/200/300",
      name: "Oguz Ekmekci",
      email: "oguzekmekci@gmail.com",
      rol: "FullStack developer",
    },
  ];

  const formDataInitial = {
    name: "",
    email: "",
    rol: "",
  };
  const [formData, setFormData] = useState(formDataInitial);

  const [members, setMembers] = useState(membersInitial);

  const history = useHistory();
  const submitHandler = (e) => {
    e.preventDefault();
    if (formData.id) {
      let updateMember = members.map((member) => {
        if (member.id == formData.id) {
          return formData;
        } else {
          return member;
        }
      });
      setMembers(updateMember);
    } else {
      const newMember = {
        ...formData,
        ["img"]: "https://picsum.photos/200/300",
        ["id"]: members[members.length - 1].id + 1,
      };

      setMembers([...members, newMember]);
    }
    setFormData(formDataInitial);
    history.push("/");
  };

  const changeHandler = (e) => {
    let { value, type, name, checked } = e.target;

    setFormData({
      ...formData,
      [name]: (value = type == "checkbox" ? checked : value),
    });
  };

  const editMember = (member) => {
    setFormData(member);
    history.push("/signup");
  };
  return (
    <div>
      <header>
        <nav>
          <NavLink to="/" exact>
            Home
          </NavLink>
          <NavLink to="/signup" exact>
            New Member
          </NavLink>
        </nav>
      </header>
      <Switch>
        <Route path="/" exact>
          <Members members={members} editMember={editMember} />
        </Route>
        <Route path="/signup" exact>
          <Form
            submitHandler={submitHandler}
            changeHandler={changeHandler}
            formData={formData}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
