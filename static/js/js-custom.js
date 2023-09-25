//Global variables

let svg_list = []
let links = []


temp_list = document.querySelector('.link_list_holder').innerText
console.log(temp_list)

if(temp_list.trim() != "null")
{

  svg_list = JSON.parse(temp_list)
  console.log(svg_list)
  console.log(typeof svg_list)

}




//Global functions
let block = document.createElement("div");
let body_block = document.querySelector('body');
block.setAttribute('style', 'position: absolute; top: 0%')
block.classList.add('svg_container')
body_block.append(block)


svg_list.forEach((svg) =>{
  connectLine(svg[0], svg[1])
  window.addEventListener('resize', connectLine(svg[0], svg[1]));
})



let link_submit_btn = document.querySelector('.link_submit_btn')
link_submit_btn.addEventListener('click', () => {
  let treshold = document.querySelector('#input_treshold').value
  fetch('/linkHandler', {

    method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"links": links,
                              "treshold": treshold})
    })

console.log('out:', links)

})


//Функция, связывающая поля input и отображение значений в нейронах
let input_value_list = document.querySelectorAll('.input_value');
input_value_list.forEach((input_click, index) => {
  input_click.addEventListener('input', () =>{
    let parentDiv = input_click.closest(".interface-group");
    let node_elements = parentDiv.querySelectorAll('.node');
      
    temp_value = node_elements[index].querySelector('.node_value')
    temp_value.innerHTML = input_click.value
  })

})



//Фунция для отрисовки соединений между нейронами
function connectLine(node_id1, node_id2){
  svg_index = 'svg_' + node_id1 + node_id2
  //console.log(svg_index)
  block.innerHTML += `<svg class="line" id="${svg_index}"> </svg>`

  svg = document.querySelector(`#${svg_index}`)
  svg.setAttribute('width', window.innerWidth);
  svg.setAttribute('height', window.innerHeight);
  temp_node1 = document.querySelector(`#node_${node_id1}`)
  temp_node2 = document.querySelector(`#node_${node_id2}`)
  node11 = temp_node1.querySelector('.node_value')
  node22 = temp_node2.querySelector('.node_value')
  const rect1 = node11.getBoundingClientRect();
  const rect2 = node22.getBoundingClientRect();
  
  const x1 = rect1.left + rect1.width / 2;
  const y1 = rect1.top + rect1.height / 2;
  const x2 = rect2.left + rect2.width / 2;
  const y2 = rect2.top + rect2.height / 2;

  svg.innerHTML = `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" />`;
}  
  




let node_set = document.querySelectorAll('.node'); //node -> [node_header, node_card -> [node_value, node_identifier]]
let node1 = null

node_set.forEach((node, index) => {
  dragElement(node)
  node_header = node.querySelector('.node_header') 
  node_header.addEventListener('click', () =>{
    
    svg_list.forEach((svg) =>{
      //console.log("Ok")
      if(svg[0]==node.id.slice(-1) || svg[1] == node.id.slice(-1))
      {
        connectLine(svg[0], svg[1])
      }
      })
    })

let node_click = node.querySelector('.node_card')
node_click.addEventListener('click', () => {
    if (node1) {
      //console.log(node1)
      temp_index1 = node1.querySelector('.node_identifier').innerText
      temp_index2 = node.querySelector('.node_identifier').innerText
      

      //console.log([temp_index1, temp_index2])
      links.push([temp_index1, temp_index2])

      block = document.querySelector('.svg_container')

      
      node_id1 = node1.id.slice(-1)
      node_id2 = node.id.slice(-1)

      if(node_id1 > node_id2)
      {
        console.log(node_id1)
        svg_list.push([node_id2, node_id1])
        connectLine(node_id2, node_id1)
        
      }
      else if(node_id1 < node_id2)
      {
      console.log(node_id1)
        svg_list.push([node_id1, node_id2])
        connectLine(node_id1, node_id2)
        
      }
    node1 = null 
    }
    else {
      node1 = node
    }
    
})
})



function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0; 
  elmnt_header = elmnt.querySelector('.node_header') 
  if(elmnt_header){
    elmnt_header.onmousedown = dragMouseDown;
  }
  else {
    elmnt.onmousedown = dragMouseDown;
  }
  
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // получаем позицию курсора мыши вначале:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // вызываем функцию каждый раз, когда курсор движется:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // вычисляем новую позицию курсора:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // задаем новую позицию элемента:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // прекращаем двигать, когда кнопка мыши отпущена:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}






//Функция, срабатывающая при нажатии на кнопку '>'
let submit_btn = document.querySelector('.submit_btn');
let config = []
let value = []
submit_btn.addEventListener('click', () => {

  let parentDiv = submit_btn.closest(".interface-group");
  let node_elements = parentDiv.querySelectorAll('.node');
    
  node_elements.forEach((node_element) => {

    config.push(node_element.getAttribute("style"));  

    let node_value = node_element.querySelector('.node_value')
    let id_value = node_element.querySelector('.node_identifier')
    value.push([id_value.innerText, node_value.innerText])

  })


    fetch("/heart", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"config": config,
        "value": value
        })
    })
    
    .then(response => {if(!response.ok){
                            throw new Error('Network response Error');}
                       response.json(); })
    .then(() => {location.reload()})
    .catch(error => {
        console.error("Error:", error);

    });
    
    
});