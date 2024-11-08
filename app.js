let $ = document
let input = $.querySelector('.input')
let addbtn = $.querySelector('.addbtn')
let deletealbtn = $.querySelector('.deletealbtn')
let todolist = $.querySelector('.todo-list')
let todoinputdiv = $.querySelector('.todo-inputdiv')

todoArray = []

function addnew(){
    
    let obj = {
        id : todoArray.length + 1 ,
        Title : input.value ,
        Complet : false 
    }

    todoArray.push(obj)
    setlocal(todoArray)
    genrate(todoArray)
    input.value = ''
    input.focus()
}


function setlocal(setit){
    localStorage.setItem('todo', JSON.stringify(setit))
}

function genrate(todoli){

    todolist.innerHTML = ''

    todoli.forEach(function(todo){
        let CRli = $.createElement('li')
        CRli.classList.add('todo-li')
        let CRp = $.createElement('p')
        CRp.classList.add('pclass')
        CRp.innerHTML = todo.Title
        let CRdivbtn = $.createElement('div')
        CRdivbtn.classList.add('todo-btndiv')
        let CRbtn1 = $.createElement('button')
        CRbtn1.classList.add('completbtn')
        CRbtn1.setAttribute('onclick', 'completone(' + todo.id + ')')
        let CRbtn2 = $.createElement('button')
        CRbtn2.classList.add('deletebtn')
        CRbtn2.setAttribute('onclick', 'deleteone(' + todo.id + ')')
        CRbtn1.innerHTML = 'Completed'
        CRbtn2.innerHTML = 'Delete'
        
        if(todo.Complet){
            CRp.classList.toggle('pclass-not')
            CRbtn1.innerHTML = 'incompleted'
            CRli.style.boxShadow = '0px 0px 2px black'
            CRli.style.backgroundColor = 'rgba(255, 255, 255, 0.521)'
            CRli.style.opacity = '0.5'
        }

        CRli.append(CRp)
        CRdivbtn.append(CRbtn1)
        CRdivbtn.append(CRbtn2)
        CRli.append(CRdivbtn)
        todolist.append(CRli)
    })

}

function deleteone(adad){
    todoArray = JSON.parse(localStorage.getItem('todo'))
    
    let del = todoArray.findIndex(function(todo){
        return todo.id === adad
    })

    todoArray.splice(del, 1)

    setlocal(todoArray)
    genrate(todoArray)
}

function completone(adad){

    todoArray = JSON.parse(localStorage.getItem('todo'))

    todoArray.forEach(function(todo){
        if(todo.id === adad){
            todo.Complet = !todo.Complet
        }
        
    })


    setlocal(todoArray)
    genrate(todoArray)
}

function deleteal(){

    localStorage.removeItem('todo')
    todolist.innerHTML = ''
    todoArray = []

}

window.addEventListener('load', function(){

    if(localStorage.getItem('todo')){
    todoArray = JSON.parse(localStorage.getItem('todo'))
    genrate(todoArray)
    }

    input.focus()
})

deletealbtn.addEventListener('click', deleteal)
addbtn.addEventListener('click', addnew)

input.addEventListener('keydown', function(event){

    if(event.keyCode === 13){
        addnew()
    }
})


window.addEventListener('scroll', function(){
    if(document.documentElement.scrollTop > 30){
        todoinputdiv.style.top = '10px'
    }else{
        todoinputdiv.style.top = '60px'
    }

})

input.addEventListener('keyup', function(event){
    if(input.value.length > 0){
        input.style.fontSize = '20px'
    }else{
        input.style.fontSize = '10px'
    }
})