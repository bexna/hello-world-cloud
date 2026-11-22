const button = document.querySelector("#hello-button");
const response = document.querySelector("#response");

button.addEventListener("click", async () => {
  button.disabled = true;
  response.textContent = "Reaching the server…";

  try {
    const result = await fetch("/api/hello");
    if (!result.ok) throw new Error("The server returned an error.");
    const data = await result.json();
    response.textContent = data.message;
  } catch {
    response.textContent = "Could not reach the server. Please try again.";
  } finally {
    button.disabled = false;
  }
});
