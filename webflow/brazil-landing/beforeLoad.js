// Gets user data
// Redirects to release content page
// Should load script on head in order to avoid flash of content
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
  window.userData = data.user;

  return data.user;
};

getUserData("BR").then((userData) => {
  if (userData?.releases.length) {
    const courseSlug = userData.releases[0].course.slug;
    const url = `https://www.filadd.com.br/courses/${courseSlug}/content`;

    window.location.href = url;
  }
});
