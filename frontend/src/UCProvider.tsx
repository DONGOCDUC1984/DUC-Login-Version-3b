import React, {
  createContext,
  ReactNode,
  useState,
  useEffect,
  MouseEvent,
} from "react";
import axios from "axios";

type UCProviderProps = {
  children: ReactNode;
};

export type UserType = {
  _id: string;
  name: string;
  email: string;
};

export interface commentType {
  _id: string;
  user_email: string;
  text: string;
}

interface UserContextType {
  user: UserType;
  handleLogout: (e: MouseEvent) => void;
  login: (email: string, password: string) => void;
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  loginError: boolean;
  register: (name: string, email: string, password: string) => void;
  name: string;
  setName: (val: string) => void;
  password2: string;
  setPassword2: (val: string) => void;
  registerError: boolean;
  comments: commentType[];
  setComments: (val: commentType[]) => void;
  newComment: string;
  setNewComment: (val: string) => void;
  updateComment: string;
  setUpdateComment: (val: string) => void;
}

export var UserContext = createContext({} as UserContextType);

function UCProvider({ children }: UCProviderProps) {
  const [user, setUser] = useState(
    JSON.parse(`${localStorage.getItem("user")}`)
  );

  const [comments, setComments] = useState([] as commentType[]);
  const [newComment, setNewComment] = useState("");
  const [updateComment, setUpdateComment] = useState("");
  const [name, setName] = useState("");
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var [password2, setPassword2] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [registerError, setRegisterError] = useState(false);

  function login(email: string, password: string) {
    axios
      .post(
        "http://localhost:4000/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        setEmail("");
        setPassword("");
        setLoginError(false);
        alert("Successfully Logged In");
      })
      .catch((error) => {
        console.log(error);
        setLoginError(true);
      });
  }

  function logout() {
    axios
      .post("http://localhost:4000/logout", {}, { withCredentials: true })
      .then(() => {
        setUser({ _id: "", name: "", email: "" });
        setComments([]);
        setName("");
        setLoginError(false);
        setRegisterError(false);
        setPassword2("");
        localStorage.clear();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleLogout(e: MouseEvent) {
    e.preventDefault();
    logout();
  }

  function register(name: string, email: string, password: string) {
    axios
      .post(
        "http://localhost:4000/register",
        {
          name: name,
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        setName("");
        setEmail("");
        setPassword("");
        setPassword2("");
        setRegisterError(false);
        alert("Successfully Registered");
      })
      .catch((error) => {
        console.log(error);
        setRegisterError(true);
        alert(
          "Email already existed.Change email.\n Đã có email này rồi.Hãy thay email khác."
        );
      });
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        handleLogout,
        login,
        email,
        setEmail,
        password,
        setPassword,
        loginError,
        register,
        name,
        setName,
        password2,
        setPassword2,
        registerError,
        comments,
        setComments,
        newComment,
        setNewComment,
        updateComment,
        setUpdateComment,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UCProvider;
