// GANTI DENGAN URL DEPLOYMENT WEB APP APPS SCRIPT ANDA
const API_URL = "https://script.google.com/macros/s/AKfycbxYvH9ndtiiMpspJJAIBLVUqLdRlvG9y90ZMmNm_n_XmONLBabkiin1Z04VLWuVscjd/exec";

async function apiCall(action, method = "GET", data = null) {
  let url = `${API_URL}?action=${action}`;

  let options = {
    method: method,
    headers: {}
  };

  if (method === "GET" && data) {
    for (let key in data) {
      url += `&${key}=${encodeURIComponent(data[key])}`;
    }
  } else if (method === "POST" && data) {
    data.action = action;
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    return await response.json();
  } catch (err) {
    console.error("API Error:", err);
    return { status: "error", message: "Gagal terhubung ke server API" };
  }
}

function getSessionUser() {
  const user = localStorage.getItem("madarabic_user");
  return user ? JSON.parse(user) : null;
}

function checkAuth(requiredRole = null) {
  const user = getSessionUser();
  if (!user) {
    window.location.href = "../login.html";
    return null;
  }
  if (requiredRole && user.role !== requiredRole && user.role !== "Admin") {
    alert("Akses ditolak!");
    window.location.href = "../login.html";
    return null;
  }
  return user;
}

function logout() {
  localStorage.removeItem("madarabic_user");
  window.location.href = "../login.html";
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
