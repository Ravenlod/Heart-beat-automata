let btn = document.querySelector('.box__input-btn');
let input = document.querySelector('.box__input-input');

btn.addEventListener('click', ()=>{
    let content_box = document.querySelector('.box__content')
    for(let row=0; row < input.value; row++){
        let newRow = document.createElement('div')
        newRow.style=`display: flex; justify-content: space-between;`
        content_box.appendChild(newRow)

        for(let col=0; col < input.value; col++){
            let newEl = document.createElement('div')
            newEl.style=`width: 10px; height: 10px; background: white; display: inline;`
            newRow.appendChild(newEl);
        }
    }
})