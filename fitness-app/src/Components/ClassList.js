import React, { useContext } from "react";
import ClassCard from "./ClassCard";
import { ClassContext } from "./ClassContext";

const ClassList = () => {
  const [classes] = useContext(ClassContext);
  return (
    <div>
      <h1  className="card-title">Trending Classes</h1>
      <div className="class-list">
        {classes.map(item => (
          <ClassCard
            key={item.id}
            name={item.name}
            instructor={item.instructor}
            duration={item.duration}
            start_time={item.start_time}
            max_size={item.max_size}
            level={item.level}
          />
        ))}
      </div>
    </div>
  );
};

export default ClassList;