import { jwtDecode } from "jwt-decode";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassoword] = useState("");

  const [totals, setTotals] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allMerchants, setAllMerchants] = useState([]);
  const [approvableMerchants, setApprovableMerchants] = useState([]);

  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    let response = await fetch(
      "https://api.foodgrab.africa/admin/api/v1/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );
    const data = await response.json();
    console.log(data);

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.token));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
    } else {
      alert("Error: " + response.status);
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/signin");
  };

  const getTotals = async () => {
    try {
      let response = await fetch(
        "https://api.foodgrab.africa/admin/api/v1/getTotals",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setTotals(data.data);
      } else {
        console.error("Failed to fetch user details:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const getUnApprovedMerchants = async () => {
    try {
      let response = await fetch(
        "https://api.foodgrab.africa/admin/api/v1/allMerchants",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        const unapprovedMerchants = data.data.filter(
          (merchant) => merchant.verificationStatus === "false"
        );

        setApprovableMerchants(unapprovedMerchants);
      } else {
        console.error("Failed to fetch user details:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const getUsers = async () => {
    try {
      let response = await fetch(
        "https://api.foodgrab.africa/admin/api/v1/allUsers",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAllUsers(data.data);
      } else {
        console.error("Failed to fetch user details:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const getMerchants = async () => {
    try {
      let response = await fetch(
        "https://api.foodgrab.africa/admin/api/v1/allMerchants",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        const Merchant = data.data.filter(
          (merchant) => merchant.verificationStatus === "true"
        );
        setAllMerchants(Merchant);
      } else {
        console.error("Failed to fetch user details:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authTokens,
        user,
        loginUser,
        logoutUser,
        setEmail,
        setPassoword,
        totals,
        getTotals,
        allUsers,
        getUsers,
        allMerchants,
        approvableMerchants,
        getUnApprovedMerchants,
        getMerchants,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
