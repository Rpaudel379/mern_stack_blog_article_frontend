import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@hooks/states";
import { login, register } from "@/src/api";
import { setLogin } from "@states/slices/authSlice";

interface User {
  username: string;
  // email: string;
  password: string;
}

const initialState: User = {
  username: "",
  // email: "",
  password: "",
};

interface ErrorHighlight {
  username: boolean;
  // email: boolean;
  password: boolean;
}

const initialErrorHighlightState: ErrorHighlight = {
  username: false,
  // email: false,
  password: false,
};

export default () => {
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const navigate = useNavigate();
  console.log(pathname);

  const [user, setUser] = useState<User>(initialState);
  const [isLogin, setIsLogin] = useState(pathname === "/login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorHighlight, setErrorHighlight] = useState<ErrorHighlight>(
    initialErrorHighlightState
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setErrorHighlight(initialErrorHighlightState);
    setLoading(true);

    const formData: FormData = new FormData();

    for (const value in user) {
      formData.append(value, user[value as keyof User]);
    }

    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = isLogin
        ? await login(formData)
        : await register(formData);

      //register
      if (
        response.data.success &&
        response.data.message.includes("registered")
      ) {
        navigate("/login");
      }
      //login
      else if (
        response.data.success &&
        response.data.message.includes("logged")
      ) {
        dispatch(
          setLogin({ user: response.data.user, token: response.data.token })
        );
        navigate("/");
      } else {
        setError("Something went wrong! Please try again");
      }
    } catch (error: any) {
      setError(error.response.data.message);
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((user) => ({ ...user, [e.target.name]: e.target.value }));
  };

  const handleToggleForm = () => {
    // Change the URL based on the form being toggled
    if (isLogin) {
      navigate("/register");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    setIsLogin((prevState) => !prevState);
  }, [pathname]);

  useEffect(() => {
    if (error.length) {
      if (error.includes("username")) {
        setErrorHighlight({ ...errorHighlight, username: true });
      } else {
        setErrorHighlight({ ...errorHighlight, password: true });
      }
    }
  }, [error]);

  return {
    loading,
    error,
    handleSubmit,
    handleChange,
    errorHighlight,

    isLogin,
    handleToggleForm,
  };
};
