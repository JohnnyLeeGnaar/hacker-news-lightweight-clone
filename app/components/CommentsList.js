import React from "react";
import CommentsListItem from "./CommentsListItem";
import { ThemeConsumer } from "../contexts/theme";

export default ({ comments }) => (
  <ThemeConsumer>
    {({ theme }) => (
      <ul className={`comments-list-${theme}`}>
        {comments.map((comment, index) => {
          if (comment !== null) {
            const { by, text, time, kids, id, deleted } = comment;
            let date = new Date(time * 1000).toLocaleDateString();
            let hours = new Date(time * 1000).toLocaleTimeString();

            return (
              <CommentsListItem
                by={by}
                text={text}
                date={date}
                hours={hours}
                kids={kids}
                key={id}
                deleted={deleted}
              />
            );
          } else {
            return console.log(`a value was null on index ${index}`);
          }
        })}
      </ul>
    )}
  </ThemeConsumer>
);
