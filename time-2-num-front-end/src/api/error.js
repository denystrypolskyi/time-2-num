export function handleError(error, navigate) {
  if (!error) {
    return;
  }

  const errorMessage = error.toLowerCase();

  if (
    errorMessage === "access denied. no token provided!" ||
    errorMessage === "unauthorized." ||
    errorMessage.includes("expired") ||
    errorMessage.includes("malformed")
  ) {
    navigate("/login");
  } else {
    console.error(error);
  }
}
