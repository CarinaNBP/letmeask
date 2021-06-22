
import { useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button'; //como vão ter vários botões semelhantes, ele foi criado como um componente, agora precisa se usado com letra maiúscula



import '../styles/auth.scss'; //só é usado pela pág Home, por isso não importou no index, pra não precisar carregar esse arquivo sempre
import '../styles/button.scss';
import { useAuth } from '../hooks/useAuth';



export function Home () { 
    //history pra mudar a rota pra outra sala. Usa ele ao invés da tag a pois nele da pra adicionar mais ações além de mudar a sala.
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth() //transformou 2 importações em 1 função, que esta em useAuth

   async function handleCreateRoom() {
        if(!user) { //se o usuário não estiver autenticado chama a função pra autenticar, se não é só redirecionar
           await signInWithGoogle()
        }

            history.push('/rooms/new');
        }

        

    return (
        <div id="page-auth">
            <aside> 
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <button onClick={handleCreateRoom} className="create-room"> 
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form>
                        <input
                           type="text"
                           placeholder="Digite o código da sala"
                        />

                        <Button type="submit">
                            Entrar na sala
                        </Button>
                        
                    </form> 
                </div>
            </main>
        </div>
    )
}