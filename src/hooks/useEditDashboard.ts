import { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@hooks/states";
import { deleteAccount, editAccount } from "@api/index";
import { setLogout } from "@states/slices/authSlice";

interface User {
  username: string;
  password: string;
}

const initialUser: User = {
  username: "",
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

  const userId = useAppSelector((state) => state.authReducer.user._id);
  const [user, setUser] = useState<User>(initialUser);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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

    formData.append("userId", userId as string);

    try {
      const response = await editAccount(formData);
      console.log(await response.data);

      if (response.data.success && response.data.message.includes("updated")) {
        setUser(initialUser);
        alert("updated");
      } else {
        setError("Something went wrong! Please try again");
      }
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.message);
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (error.length) {
      console.log(error);

      if (error.includes("username")) {
        setErrorHighlight({ ...errorHighlight, username: true });
      }
      if (error.includes("password")) {
        setErrorHighlight({ ...errorHighlight, password: true });
      }
    }
  }, [error]);

  const handleDelete = async () => {
    if (userId) {
      const response = await deleteAccount(userId as string);

      console.log(response.data);
      if (response.data.success && response.data.message.includes("deleted")) {
        alert("deleted");
        dispatch(setLogout());
      } else {
        return;
      }
    }
  };

  return {
    handleChange,
    handleDelete,
    loading,
    handleSubmit,
    error,
    errorHighlight,
    user,
    setUser,
    initialUser,
  };
};
