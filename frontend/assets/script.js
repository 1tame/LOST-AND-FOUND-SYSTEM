const API = "http://localhost:3000"; // Change if deployed

// REGISTER
if (document.getElementById("registerForm")) {
  document.getElementById("registerForm").addEventListener("submit", async e => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const res = await fetch(`${API}/users/add`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    alert("Registered!");
    window.location.href = "login.html";
  });
}

// LOGIN
if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").addEventListener("submit", async e => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const res = await fetch(`${API}/users/login`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      window.location.href = "dashboard.html";
    } else {
      alert("Login failed");
    }
  });
}

// ADD ITEM
if (document.getElementById("itemForm")) {
  document.getElementById("itemForm").addEventListener("submit", async e => {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.target));
    const payload = {
      Item_Type: raw.Item_Type,
      description: raw.description,
      location: {city: raw["location.city"]},
      status: raw.status,
      createdBy: localStorage.getItem("userId")
    };
    const res = await fetch(`${API}/items/addItem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    alert("Item added");
  });
}

// SEARCH
if (document.getElementById("searchForm")) {
  document.getElementById("searchForm").addEventListener("submit", async e => {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.target));
    const res = await fetch(`${API}/items/search`, {
      method: "POST", // Replace with POST if needed
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        Item_Type: raw.Item_Type,
        location: {city: raw.city}
      })
    });
    const data = await res.json();
    document.getElementById("items").innerHTML = data.map(item =>
      `<p>${item.Item_Type} found in ${item.location.city}</p>`
    ).join('');
  });
}


document.getElementById("searchForm").addEventListener("submit", async e => {
  e.preventDefault();
  const raw = Object.fromEntries(new FormData(e.target));
  const res = await fetch(`${API}/items/search`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      Item_Type: raw.Item_Type,
      location: {city: raw.city}
    })
  });
  const data = await res.json();

  const userId = localStorage.getItem("userId");

  document.getElementById("items").innerHTML = data.map(item => `
    <div class="card">
      <h4>${item.Item_Type}</h4>
      <p>City: ${item.location.city}</p>
      <button onclick="openClaimModal('${item._id}', '${userId}')">Claim</button>
    </div>
  `).join('');
});


// LOGOUT
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}




function openClaimModal(itemId, userId) {
  document.getElementById("claimItemId").value = itemId;
  document.getElementById("claimUserId").value = userId;
  document.getElementById("claimModal").classList.remove("hidden");
}

function closeClaimModal() {
  document.getElementById("claimModal").classList.add("hidden");
}

// Submit claim
if (document.getElementById("claimForm")) {
  document.getElementById("claimForm").addEventListener("submit", async e => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const res = await fetch(`${API}/claims/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: formData
    });

    const data = await res.json();
    alert("Claim submitted!");
    closeClaimModal();
    form.reset();
  });
}

