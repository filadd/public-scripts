const getAuthenticationToken = async () => {
  const cookieAuthToken = await cookieStore.get("auth._token.local");

  const authenticationToken = cookieAuthToken?.value?.startsWith("Bearer")
    ? decodeURIComponent(cookieAuthToken.value)
    : undefined;

  return authenticationToken;
};

const getUserData = async (locale) => {
  const authToken = await getAuthenticationToken();
  if (!authToken) {
    return null;
  }

  let response;
  try {
    response = await fetch("https://gateway.filadd.com/api/user/me/", {
      method: "GET",
      headers: {
        Authorization: authToken,
        "X-Locale": locale,
      },
    });
  } catch (error) {
    console.error("Failed to get user data, received error:", error);
    return null;
  }

  if (response.status !== 200) {
    console.error("Failed to get user data, received status:", response.status);
    return null;
  }

  const data = await response.json();

  return data.user;
};

const displayBody = (display) => {
  const body = document.querySelector("body");
  if (body) {
    body.style.display = display;
  }
};

const logoutButton = document.querySelector("#log-out");
const alreadyUserButton = document.querySelector("#already-user");

const displayAuthButtons = (userData) => {
  if (userData) {
    logoutButton.style.display = "inline-block";
  } else {
    alreadyUserButton.style.display = "inline-block";
  }
};

logoutButton.addEventListener("click", async () => {
  await cookieStore.delete("auth._token.local");
});

getUserData("BR").then((userData) => {
  window.userData = userData;

  if (userData?.releases.length) {
    courseSlug = userData.releases[0].course.slug;
    const url = `https://www.filadd.com.br/courses/${courseSlug}/content`;

    window.location.href = url;
    document.body.style.backgroundColor = "#000064";
    document.body.innerHTML = `<div>
    <div class="loading_logo">
    <img
        src="https://static.filadd.com/new-identity/logo/filadd_negative.svg"
        alt="Academia Filadd"
    />
    <div class="ll_spinner"></div>
    </div>
    <div class="ll_text">
    Redirecionando para seu curso!
    </div>
</div>`;
    return;
  }
  displayAuthButtons(userData);
});
