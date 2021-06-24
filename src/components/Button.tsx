import { ButtonHTMLAttributes } from "react"; //importando os atributos de um botão html

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
}; //ta falando que o botão vai receber todas as propriedades de um botão html & a propriedade Outlined que não é obrigatória

export function Button({ isOutlined = false, ...props }: ButtonProps) {
  //permitino todos os atributos no botão em react
  return (
    <button
      className={`button ${isOutlined ? "outlined" : ""}`} //se isoutlined existir, vai adicionar a classe outlined
      {...props}
    />
  );
}

<Button />;
