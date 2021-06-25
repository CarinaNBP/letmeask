import { ReactNode } from "react";
import { createExportAssignment } from "typescript";
import "./style.scss";
import cx from "classnames";

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
};

export function Question({
  //pra pegar somente o que quer e não o objeto todo
  content,
  author,
  isAnswered = false,
  isHighlighted = false,
  children,
}: QuestionProps) {
  return (
    <div
      className={cx(
        //cx é um pacote pra fazer essas lógicas de class. Se is Answered for true, coloca a classe answered
        "question",
        { answered: isAnswered },
        { highlighted: isHighlighted && !isAnswered } //marcar como highligh só se for highlight e não respondida
      )}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}
