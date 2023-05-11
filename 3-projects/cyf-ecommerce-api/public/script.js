const paths = ["customers", "suppliers", "products"];

paths.forEach((path) => {
  const navLinks = document.getElementById("nav-links");
  const link = document.createElement("a");
  link.href = `/${path}`;
  link.innerText = `/${path}`;
  navLinks.appendChild(link);

  const navButtons = document.getElementById("nav-buttons");
  const button = document.createElement("button");
  button.id = `${path}`;
  button.innerText = `/${path}`;
  button.addEventListener("click", (event) => fetchAndFormat(event.target.id));
  navButtons.appendChild(button);
});

async function fetchAndFormat(path) {
  try {
    const response = await fetch(`/${path}`);
    const data = await response.json();
    const outputContainer = document.getElementById("output-container");
    outputContainer.innerText = "";
    const pre = document.createElement("pre");
    const code = document.createElement("code");
    code.id = "output-json";
    code.innerText = JSON.stringify(data, null, 2);
    pre.appendChild(code);
    outputContainer.appendChild(pre);
  } catch (error) {
    console.log(error);
  }
}
