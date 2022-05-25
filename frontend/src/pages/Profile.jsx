import React from 'react';
import {fetchToken} from "../components/Auth";
import {Profile_} from "../components/Profile_element";

export default function Profile() {
  // const navigate = useNavigate();

  // const signOut = () => {
  //   localStorage.removeItem("token");
  //   navigate("/");
  // };

  return (
    <>
      <div style={{ marginTop: 20, minHeight: 700 }}>
          {fetchToken() ? (
                <Profile_ />
                ) : (
                    <p>Выйди и войди нормально </p>
                )}
      </div>
    </>
  );
}