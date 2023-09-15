const container = document.getElementById("root");
const serverURL = "http://localhost:7002/login";

async function createIframe(url) {
    const iframe = document.createElement("iframe");
    iframe.id = "iframe";
    iframe.src = url;
    iframe.width = "100%";
    iframe.height = "3000px";
    iframe.style = "border: none;";
    container.appendChild(iframe);
}

function resizeIFrameToFitContent() {
    const iFrame = document.getElementById("iframe");
    iFrame.width = iFrame.contentWindow.document.body.scrollWidth;
    iFrame.height = iFrame.contentWindow.document.body.scrollHeight;
}

async function createLogin() {
    const loginContainer = document.createElement("div");
    loginContainer.id = "loginContainer";
    const header = document.createElement("h1");
    header.innerText = "New York Times";
    loginContainer.appendChild(header);
    const subHeader = document.createElement("h2");
    subHeader.innerText = "Agency Reporting Login";
    loginContainer.appendChild(subHeader);
    const loginForm = document.createElement("form");
    loginForm.method = "POST";
    loginForm.onsubmit = login;
    loginForm.id = "loginForm";
    const username = document.createElement("input");
    username.type = "text";
    username.name = "agency";
    username.placeholder = "Agency Name";
    const password = document.createElement("input");
    password.type = "password";
    password.name = "password";
    password.placeholder = "Password";
    const submit = document.createElement("input");
    submit.type = "submit";
    submit.value = "Login";

    loginForm.appendChild(username);
    loginForm.appendChild(password);
    loginForm.appendChild(submit);
    loginContainer.appendChild(loginForm);

    container.appendChild(loginContainer);
}

async function login(e) {
    e.preventDefault();
    const loginContainer = document.getElementById("loginContainer");
    const loginForm = document.getElementById("loginForm");
    const agencyName = loginForm.elements["agency"].value;
    const password = loginForm.elements["password"].value;
    const body = {
        agency: agencyName,
        password: password,
    };
    const response = await fetch(serverURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    const data = await response.json();
    if (data.length > 0) {
        container.removeChild(loginContainer);
        createIframe(data);
    } else {
        alert("Login Failed");
    }
}

createLogin();
