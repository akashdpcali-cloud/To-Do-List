let taskList=JSON.parse(localStorage.getItem("taskList"))||[];


//---------------------------------------------------------------------

let inputBar=document.querySelector(".inputBar");


let inputDate=document.querySelector(".inputDate");

//---------------------------------------------------------------------

let createButton=document.querySelector(".createButton");
createButton.onclick=addOnclick;

//----------------------------------------------------------------------
let theDiv=document.querySelector(".display-div");

function displayList(){
  theDiv.innerHTML='';
  for(let i=0; i<taskList.length;i++){
    let indexvalue=taskList[i].name;
    let indexdate=taskList[i].date;
    let singleContent =`<div>${indexvalue}</div>
                        <div>${indexdate}</div>
                        <button class="singlebutton" onclick='deleteSingleContent(${i});'>Remove</button>`;
    localStorage.setItem("taskList",JSON.stringify(taskList));
    theDiv.innerHTML+=singleContent;
    
}
}

function deleteSingleContent(x){
  taskList.splice(x,1);
  localStorage.setItem("taskList",JSON.stringify(taskList));
  displayList();
}
//----------------------------------------------------------------------

function addOnclick(){
  taskList.push({name:inputBar.value,date:inputDate.value});
  localStorage.setItem("taskList",JSON.stringify(taskList));
  console.log(taskList);
  inputBar.value='';  
  displayList();
}

//----------------------------------------------------------------------

let removeallbutton=document.querySelector(".removeallbutton");
removeallbutton.onclick=removeall;
function removeall(){
  taskList=[];
  displayList();
  localStorage.setItem("taskList",JSON.stringify(taskList));
}


displayList();
