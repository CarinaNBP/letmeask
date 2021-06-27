import { Link, useHistory } from "react-router-dom";
import { FormEvent, useState } from "react";
import { database } from "../services/firebase";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";

import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/Button"; //como vão ter vários botões semelhantes, ele foi criado como um componente, agora precisa se usado com letra maiúscula

import "../styles/auth.scss"; //só é usado pela pág Home, por isso não importou no index, pra não precisar carregar esse arquivo sempre
import "../styles/button.scss";

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState("");

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === "") {
      //conferindo se o nome da sala não está vazia
      return;
    }

    const roomRef = database.ref("rooms");

    const firebaseRoom = await roomRef.push({
      //push usa quando é pra pegar uma informacao de uma lista
      title: newRoom,
      authorId: user?.id,
    });
    history.push(`/rooms/${firebaseRoom.key}`); //pra redirecionar pra sala com o id criado no firebase, que no firebase é key
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
          className="responsive-image"
        />
        <strong className="home-text">Crie salas de Q&amp;A ao-vivo</strong>
        <p className="home-text-small">
          Tire as dúvidas da sua audiência em tempo-real
        </p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />

            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala já existente?{" "}
            <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
