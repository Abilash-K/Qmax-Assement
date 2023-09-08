import React, { useEffect, useState } from "react";
import CardBox from "./Components/CardBox";
import SearchBox from "./Components/SearchBox";

const App = () => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem("value")) || []
  );
  const [filterdValue, setFilteredValue] = useState(JSON.parse(localStorage.getItem("filterdValue")) || []);
  useEffect(() => {
    // Save data to localStorage whenever it changes
    localStorage.setItem("value", JSON.stringify(value));
  }, [value]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setValue(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("filterdValue", JSON.stringify(filterdValue));
  }, [filterdValue]);
  const DeletePost = (id) => {
    const UpdatedData = value.filter((e) => e.id !== id);
    setValue(UpdatedData);
  };

  const search = (data) => {
    setFilteredValue(data);
  };

  console.log(filterdValue);
  return (
    <div style={{ margin: "10px" }}>
    <SearchBox search={search} data={value} />
    {filterdValue.length > 0 // Check if filterdValue has items
      ? filterdValue.map((e) => (
          <div key={e.id}>
            <CardBox
              title={e.title}
              body={e.body}
              delPost={() => DeletePost(e.id)}
              id={e.id}
            />
          </div>
        ))
      : value.map((e) => (
          <div key={e.id}>
            <CardBox
              title={e.title}
              body={e.body}
              delPost={() => DeletePost(e.id)}
              id={e.id}
            />
          </div>
        ))}
  </div>
  );
};

export default App;
