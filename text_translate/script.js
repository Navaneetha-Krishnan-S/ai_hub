const selectTag = document.querySelectorAll("select");
const translateBtn = document.querySelector("#transfer");
const fromText = document.querySelector("#fromText");
const toText = document.querySelector("#toText");
const icons = document.querySelectorAll("img");



selectTag.forEach((tag , id)=>{
    

    for (const countriesCode in countries) {
        let selected ;
        if( id == 0 && countriesCode == "en-GB"){
            selected =" selected";
        }else if(id == 1 && countriesCode == "ta-LK"){
            selected =" selected";
        }
        let option = ` <option value="${countriesCode}" ${selected}>${countries[countriesCode]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
        }
});

translateBtn.addEventListener("click" , ()=> {
  let Text = fromText.value,
  translateFrom = selectTag[0].value,
  translateTo = selectTag[1].value;

  let apiURL= `https://api.mymemory.translated.net/get?q=${Text}!&langpair=${ translateFrom}|${translateTo}`;
  
  fetch(apiURL).then(res => res.json()).then(data =>{

 
    toText.value = data.responseData.translatedText;
});
 

});

icons.forEach(icon =>{
icon.addEventListener( "click" , ({target}) => {
    if(target.classList.contains("copy") ){
        if(target.id == "from"){
           navigator.clipboard.writeText(fromText.value)
        }
        else{
            navigator.clipboard.writeText(toText.value)
        }
    }
    else{
        let utterance;
        if(target.id == "from"){
           utterance = new SpeechSynthesisUtterance(fromText.value)
           utterance.lang = selectTag[0].value;

        }else{
            utterance = new SpeechSynthesisUtterance(toText.value)
            utterance.lang = selectTag[1].value;
        }
        speechSynthesis.speak(utterance);
    }
});
});
