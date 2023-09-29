let btn = document.querySelector('.box__input-btn');
let input = document.querySelector('.box__input-input');
let box = document.querySelector('.box');

let black_square_table = []
let template_table = []

var content_box = null
btn.addEventListener('click', ()=>{

    if(content_box===null){
        content_box = document.createElement('div');
        content_box.classList.add('box__content');
    } else {
        //content_box.parentNode.removeChild(content_box)
        //content_box=document.createElement('div').classList.add('box__content')
        let leng = content_box.children.length;
        for(let child=0;child<leng;child++){
            content_box.removeChild(content_box.children[0])
        }
    }
    for(let row=1; row <= input.value; row++){
        let newRow = document.createElement('div')
        newRow.classList.add('newRow')
        content_box.appendChild(newRow)

        for(let col=1; col <= input.value; col++){
            let newEl = document.createElement('div')
            newEl.classList.add('newEl')
            newEl.addEventListener('click', ()=>{              
                newEl.classList.toggle('black')
                if(newEl.classList.contains('black')){
                    black_square_table.push([col, row])
                }else{
                    black_square_table=black_square_table.filter(coord=>`${coord}`!=`${[col, row]}`)
                }
                console.log(black_square_table);
            })
            newRow.appendChild(newEl);
        }
    }
    box.appendChild(content_box)
})


let template_box = document.querySelector('.template__box');
for(let i=0;i<3;i++){
    let myRow = document.createElement('div')
    myRow.classList.add('newRow')
    template_box.appendChild(myRow)
    for(let j=0;j<3;j++){
        let myCol = document.createElement('div')
        myCol.classList.add('newEl')
        if(j==1 && i==1){
            myCol.classList.add('disabled')

        }
        myCol.addEventListener('click', ()=>{
            if(j==1 && i==1){}
            else{
                myCol.classList.toggle('black')
                if(myCol.classList.contains('black')){
                    template_table.push([j, i])
                }else{
                    template_table=template_table.filter(coord=>`${coord}`!=`${[j, i]}`)
                }
            }
            console.log('template', template_table);
        })
        myRow.appendChild(myCol)
    }
    
}