import { useState, useEffect } from "react";
import ToDo from "../ToDo/ToDos";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const ToDoesList = (props) => {
  const [toDoes, setToDoes] = useState([]);

  useEffect(() => {
    const login = localStorage.getItem("login");
    if (login === null) {
      return;
    }

    fetch("http://localhost:5290/api/User/LoadToDoes/" + login)
      .then((resp) => resp.json())
      .then((resp) => setToDoes(resp.filter((t) => t !== null)));
  }, [toDoes]);

  return (
    <div className="container">
      {toDoes.length === 0 ? (
        <h1>ToDoes Not Found...</h1>
      ) : (
        <TransitionGroup>
          {toDoes.map((toDos, i) => (
            <CSSTransition 
              key={toDos.id}
              classNames="todo"
              timeout={500}>
              <ToDo
                iterator={i}
                {...toDos}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      )}
    </div>
  );
};

export default ToDoesList;
