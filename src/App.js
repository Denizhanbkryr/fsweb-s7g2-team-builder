import Form from "./components/Form";
import "./App.css";
import Members from "./components/Members";
import { Switch, Route, NavLink, useHistory } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup";
import { useEffect } from "react";

function App() {
  const membersInitial = [
    {
      id: 1,
      img: "https://picsum.photos/200/300",
      name: "Denizhan Bakiryor",
      email: "denizhanbakiryor@gmail.com",
      rol: "Front-end developer",
      terms: true,
    },
    {
      id: 2,
      img: "https://picsum.photos/200/300",
      name: "Ege Bakiryor",
      email: "egebakiryor@gmail.com",
      rol: "Back-end developer",
      terms: true,
    },
    {
      id: 3,
      img: "https://picsum.photos/200/300",
      name: "Oguz Ekmekci",
      email: "oguzekmekci@gmail.com",
      rol: "FullStack developer",
      terms: true,
    },
  ];

  const formDataInitial = {
    name: "",
    email: "",
    rol: "",
    terms: false,
  };
  const [formData, setFormData] = useState(formDataInitial);
  const [members, setMembers] = useState(membersInitial);
  const [isValid, setValid] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    rol: "",
    terms: "",
  });

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
    value = type == "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: value });

    Yup.reach(membersFormSchema, name)
      .validate(value)
      .then((res) => setErrors({ ...errors, [name]: "" }))
      .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }));
  };

  const membersFormSchema = Yup.object().shape({
    name: Yup.string()
      .required("isim giriniz.")
      .min(3, "en az 3 karakter olmak zorunda"),
    email: Yup.string()
      .required("emailgiriniz")
      .email("Geçerli bir email giriniz."),
    rol: Yup.string().required("Görevi giriniz"),
    terms: Yup.boolean().oneOf([true], "Şartları kabul ediniz."),
  });

  const editMember = (member) => {
    setFormData(member);
    history.push("/signup");
  };

  useEffect(() => {
    membersFormSchema.isValid(formData).then((valid) => setValid(valid));
  }, [formData]);
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
            membersFormSchema={membersFormSchema}
            submitHandler={submitHandler}
            changeHandler={changeHandler}
            formData={formData}
            isValid={isValid}
            errors={errors}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
