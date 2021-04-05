import {createStore} from 'redux';


const form =document.querySelector('form')
const input=document.querySelector('input')
const ul=document.querySelector('ul')

const ADD_TODO="ADD_TODO";
const DELETE_TODO="DELETE_TODO";


//action creator
const addToDo=(text)=>{
  return{
  type:ADD_TODO,
  text
  }

}

const deleteToDO=(id)=>{
  return{
    type:DELETE_TODO,
    id

  }
}

const reducer=(state=[],action)=>{
  console.log(action)
  switch(action.type){
    case ADD_TODO:
      return [{text:action.text, id:Date.now()},...state];
    case DELETE_TODO:
      return state.filter(toDo=> toDo.id!== parseInt(action.id));
      default:
        return state;
  }

}

const store =createStore(reducer);

store.subscribe(()=>console.log(store.getState()));

const dispatchAddToDo=(text)=>{
  store.dispatch(addToDo(text))
}

//이 function은 오로지 action을 dispatch 하기 위한 용도이다
const dispatchDeleteToDo=(e)=>{
  const id=parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDO(id))
}


const paintToDos=()=>{
    const toDos=store.getState();
    ul.innerHTML="";
    toDos.forEach(toDo=>{
      const li=document.createElement("li")
      const btn=document.createElement("button");
      btn.innerText="DEL"
      btn.addEventListener("click", dispatchDeleteToDo)
      li.id=toDo.id
      li.innerText=toDo.text;
      li.appendChild(btn);
      ul.appendChild(li);
    })
}

store.subscribe(paintToDos)



const onSubmit=e=>{
  e.preventDefault();
  const toDo=input.value;
  input.value="";
dispatchAddToDo(toDo);
  // createToDo(toDo); //createTodo 함수 호출 인풋에서 얻은 텍스트를 인자로 보낸다.
};

form.addEventListener("submit",onSubmit);