let prompt=document.querySelector(".prompt")
let container=document.querySelector(".container")
let chatContainer=document.querySelector(".chat-container")
let btn=document.querySelector(".btn")
let userMessage=null
let Api_url='https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDFksxkWupQmcb4kptJEr1x6U3Hyf7tRXQ';

function createChatBox(html,className){
const div=document.createElement("div")
div.classList.add(className)
div.innerHTML=html;
return div
}
async function generateApiResponse(aiChatBox){
const textElement=aiChatBox.querySelector(".text")
try{
const response=await fetch(Api_url,{
  method:"POST",
  headers:{"Content-Type": "application/json"},
  body:JSON.stringify({
    contents:[{
      "role": "user",
      "parts":[{text:`${userMessage} in 10 words`}]
    }]
  })
})
const data=await response.json()
const apiResponse=data?.candidates[0].content.parts[0].text.trim();
textElement.innerText=apiResponse

}
catch(error){
  console.log(error)
}
finally{
  aiChatBox.querySelector(".loading").style.display="none"
}
}
function showLoading(){
  const html=` <div id="img">
        <img src="ai.png" alt="">
    </div>
    <div class="text">
    </div>
    <img src="loading.gif" alt="" height="50" class="loading">`
    let aiChatBox=createChatBox(html,"ai-chat-box")
 chatContainer.appendChild(aiChatBox)
generateApiResponse(aiChatBox)

}

btn.addEventListener("click",()=>{
    userMessage=prompt.value;
    if(prompt.value=""){
      container.style.display="flex"
    }else{
       container.style.display="none"
    }
    if(!userMessage)return;
  const html=` <div id="img">
        <img src="user.png" alt="">
    </div>
    <div class="text">
    </div>`
 let userChatBox=createChatBox(html,"user-chat-box")
 userChatBox.querySelector(".text").innerText=userMessage
 chatContainer.appendChild(userChatBox)
 prompt.value=""
 setTimeout(showLoading,500)

})
