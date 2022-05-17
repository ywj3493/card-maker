import React, { useEffect, useState } from "react";

const Test = (props) => {
  const [list, setList] = useState([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setList([1, 2, 3]);
  }, []);

  const onClick = () => {
    console.dir(toggle);
    setToggle(!toggle);
  };

  return (
    <section>
      <button onClick={onClick}>click me</button>
      {toggle ? (
        <div>
          {list.map((item, idx) => {
            return <TestElement key={idx} name={"div"} />;
          })}
        </div>
      ) : (
        <section>
          {list.map((item, idx) => {
            return <TestElement key={idx} name={"section"} />;
          })}
        </section>
      )}
    </section>
  );
};

const TestElement = ({ name }) => {
  useEffect(() => {
    console.dir(`${name} is Mount`);
    return () => {
      console.dir(`${name} is UnMount`);
    };
  }, []);

  return <div>{name}</div>;
};

export default Test;
