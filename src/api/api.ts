const URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export async function fetchData() {
  const response = await fetch(`${URL}/api/data`);
  console.log("Response:", response);
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }
  return response.json();
}

export async function prepareLogin(token?: string) {
  // console.log("PREPARE LOGIN", token);
  const method = "POST";
  const headers = { "Content-Type": "application/json" };

  const getJwt = async (token: string) => {
    console.log("TOKEN", token);
    const url = `${URL}/auth/google`;
    // const credentials = "include";
    const body = JSON.stringify({ token });
    // return await fetch(url, { method, headers, body, credentials });
    return await fetch(url, { method, headers, body });
  };

  const setCookie = async (token: string) => {
    // console.log("SET COOKIE TOKEN", token);
    const url = `/api/auth/set-jwt-cookie`;
    const body = JSON.stringify({ token });
    return await fetch(url, { method, headers, body });
  };

  const doLogin = async () => {
    const authResponse = await getJwt(token!);
    console.log("AUTH RESPONSE", authResponse);
    if (!authResponse.ok) {
      throw new Error(`Error logging in: ${authResponse.statusText}`);
    }
    const body = await authResponse.json();
    console.log("BODY", body);
    await setCookie(body.jwtToken);
    return body;
  };

  if (token) {
    return doLogin();
  } else {
    throw new Error("No token provided");
  }
}
