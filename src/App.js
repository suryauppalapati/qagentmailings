import React, { useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";

const App = () => {
  const [labels, setLabels] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const responseGoogle = (response) => {
    if (response.profileObj) {
      setIsAuthorized(true);
      listLabels();
    }
  };

  const logout = () => {
    setIsAuthorized(false);
    setLabels([]);
  };

  const listLabels = async () => {
    try {
      const response = await window.gapi.client.gmail.users.labels.list({
        userId: "me",
      });
      const labels = response.result.labels || [];
      const labelNames = labels.map((label) => label.name);
      setLabels(labelNames);
    } catch (error) {
      console.error("Error listing labels:", error);
    }
  };

  return (
    <div>
      <h1>Gmail API Quickstart</h1>
      {isAuthorized ? (
        <div>
          <GoogleLogout
            clientId='923881872905-t8cmtnlmccck4vpi5cuhtv5rvci3q0dc.apps.googleusercontent.com'
            buttonText='Logout'
            onLogoutSuccess={logout}
            onFailure={logout}
          />
          <pre>{JSON.stringify(labels, null, 2)}</pre>
        </div>
      ) : (
        <GoogleLogin
          clientId='923881872905-t8cmtnlmccck4vpi5cuhtv5rvci3q0dc.apps.googleusercontent.com'
          buttonText='Login'
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      )}
    </div>
  );
};

export default App;
