import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.8/+esm";

let inputBar = document.querySelector(".inputBar");

let inputDate = document.querySelector(".inputDate");

let theDiv = document.querySelector(".display-div");



document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  window.location.href = './login.html'
})

const user = JSON.parse(localStorage.getItem('user'))

document.querySelector('.username').textContent = user.username

  //------------------POST---------------------------------------------------

const addOnclick = async () => {
  try {
    const token = localStorage.getItem('token')

    const res = await axios.post("http://localhost:5000/api", {
      title: inputBar.value,
      date: inputDate.value
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    console.log(res.data)
    loadData()
  } catch (err) {
    console.error(err.response?.data)
  }
}

let createButton = document.querySelector(".createButton");

createButton.onclick = addOnclick;

//------------------------DELETE BY ID-----------------------------------------------------

window.deleteSingleContent = async function (id) {
  const token = localStorage.getItem('token')

  await axios.delete(`http://localhost:5000/api/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  backendData = backendData.filter(item => item.id !== id)
  displayList()
}

//-------------------------GET---------------------------------------------


let backendData = [];
async function loadData() {
  const token = localStorage.getItem('token')
  
  const response = await axios.get("http://localhost:5000/api", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  
  backendData = response.data.data
  displayList()
}

loadData();

function displayList() {
  theDiv.innerHTML = "";

  backendData.forEach((data) => {

    let singleContent = `
      <div>${data.title}</div>
      <div>${data.date}</div>
      <button class="singlebutton" onclick="deleteSingleContent('${data.id}')">
        Remove
      </button>
    `;

    theDiv.innerHTML += singleContent;
  });

}


//---------------------------DELETE ALL-------------------------------------------

let removeallbutton = document.querySelector(".removeallbutton");
removeallbutton.onclick = removeall;

async function removeall() {
  const token = localStorage.getItem('token')

  await axios.delete("http://localhost:5000/api/all", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  backendData = []
  displayList()
}

displayList();



