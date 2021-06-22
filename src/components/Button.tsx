import { ButtonHTMLAttributes } from 'react'; //importando os atributos de um botão html

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) { //permitino todos os atributos no botão em react
    return (
        <button className="button" {...props} />
    )
}

<Button />

