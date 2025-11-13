const API_URL = 'https://your-api-url.onrender.com/api/developers'; // Replace with your actual URL

const form = document.getElementById('devForm');
const devList = document.getElementById('devList');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const skills = document.getElementById('skills').value.split(',').map(s => s.trim());
  const bio = document.getElementById('bio').value;
  const location = document.getElementById('location').value;
  const github = document.getElementById('github').value;
  const website = document.getElementById('website').value;

  const newDev = { name, email, skills, bio, location, github, website };

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newDev)
  });

  if (res.ok) {
    loadDevelopers();
    form.reset();
  } else {
    alert('Error adding developer');
  }
});

async function loadDevelopers() {
  const res = await fetch(API_URL);
  const developers = await res.json();

  devList.innerHTML = '';
  developers.forEach((dev) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${dev.name}</strong> (${dev.email})<br>
      Skills: ${dev.skills.join(', ')}<br>
      Bio: ${dev.bio || 'N/A'}<br>
      Location: ${dev.location || 'N/A'}<br>
      GitHub: <a href="${dev.github}" target="_blank">${dev.github}</a><br>
      Website: <a href="${dev.website}" target="_blank">${dev.website}</a>
    `;
    devList.appendChild(li);
  });
}

loadDevelopers();