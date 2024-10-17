import React from "react";

export const Events = ({ events }) => {
  return (
    <div>
      {events.map((event, index) => (
        <div key={index}>
          <strong>{event.username}:</strong> {event.message}
        </div>
      ))}
    </div>
  );
};
