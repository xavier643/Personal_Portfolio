import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { from } from "@apollo/client";
import { toast } from "react-toastify";

// Create an http link:
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI || "http://localhost:4000/graphql",
  credentials: "include",
});

// Create a middleware link to set the token in the request headers
const authLink = setContext(async (_, { headers }) => {
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");

  // time to refresh the token in milliseconds and also the time to show a warning message
  const tokenRefreshMinutes = 30; // Define the number of minutes
  const tokenRefreshTime = tokenRefreshMinutes * 60000; // Convert minutes to milliseconds

  // Check if the token is about to expire and refresh it if necessary
  if (
    token &&
    tokenExpiration &&
    Date.now() > tokenExpiration - tokenRefreshTime
  ) {
    const response = await fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `mutation {
          refreshToken {
            token
            expiresIn
          }
        }`,
      }),
    });
    const result = await response.json();
    console.log("result", result);

    if (result.data.refreshToken == null) {
      try {
        await fetch("http://localhost:4000/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            query: `mutation { logout }`,
          }),
        });
      } catch (err) {
        console.error("Backend logout failed:", err);
      }

      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
      localStorage.removeItem("user");
      window.location.href = "/login";
    } else {
      console.log("result.data.refreshToken", result.data.refreshToken);
      const newToken = result.data.refreshToken.token;
      const newTokenExpiration =
        Date.now() + result.data.refreshToken.expiresIn * 1000;
      localStorage.setItem("token", newToken);
      localStorage.setItem("tokenExpiration", newTokenExpiration);
    }
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Create an errorLink to handle errors
const errorLink = onError(({ graphQLErrors, networkError }) => {
  console.log("graphQLErrors", graphQLErrors);
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      if (message === "Not authenticated") {
        console.warn("[Apollo error] User not authenticated (no redirect)");
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    });
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});

// Add periodic check to log out user if token has expired
const checkTokenExpiration = async () => {
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  const token = localStorage.getItem("token");

  // time to refresh the token in milliseconds and also the time to show a warning message
  const tokenWarningMinutes = 5; // Define the number of minutes
  const tokenWarningTime = tokenWarningMinutes * 60000; // Convert minutes to milliseconds

  if (tokenExpiration && Date.now() > tokenExpiration) {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("user");
    window.location.href = "/login";
  } else if (
    token &&
    tokenExpiration &&
    Date.now() > tokenExpiration - tokenWarningTime
  ) {
    toast.warn("Your session is about to expire. Please save your work.", {
      autoClose: 10000, // Duration in milliseconds
    });
  }
};

// Check token expiration every 60 second
setInterval(checkTokenExpiration, 60000);

export default client;
