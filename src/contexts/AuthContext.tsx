import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from '../services/firebase';

type User = {
    id: string;
    name: string;
    avatar: string;
  }
  
type AuthContextType = { //tipagem por conta do typescript
    user: User | undefined; //a tipagem User está definida ali em cima
    signInWithGoogle: () => Promise<void>; //ta falando que a função recebe uma promise por ser asy, mas não tem retorno
}

type AuthContextProviderProps = {
    children: ReactNode; //pois é um elemento react, e não string
}

export const AuthContext = createContext({} as AuthContextType ); //vai envair um objeto, então tem que iniciar como objeto

export function AuthContextProvider(props: AuthContextProviderProps) {

    const [user, setUser] = useState<User>(); //<User> está colocando a tipagem User no user
  
  useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged(user => { //pra ficar ouvindo o evento
      if(user) {
        const {displayName, photoURL, uid} = user
        
        if(!displayName || !photoURL) { //se não tiver nome nem foto, vai lançar um erro
          throw new Error('Missing information from Google Account.'); 
        }

        setUser({ //preencher setUser com esses dados
          id: uid,
          name: displayName,
          avatar: photoURL
        })
       
      }
    })

    return () => {
      unsubscribe(); //pra parar de ouvir o evento
    }
  }, []) //as [] é pra dizer quando vai disparar a função, mas se for só uma vez, que é quando acontece o evento, pode deixar vazio
  
  async function signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider(); //autentificar com o Google
    //Popup pra abrir um popup de autentificação e não pra ir pra outra tela
    const result = await auth.signInWithPopup(provider);

    if(result.user){
         const { displayName, photoURL, uid} = result.user //pegando os dados do usuário pela autenticação do Google

         if(!displayName || !photoURL) { //se não tiver nome nem foto, vai lançar um erro
           throw new Error('Missing information from Google Account.'); 
         }

         setUser({ //preencher setUser com esses dados
           id: uid,
           name: displayName,
           avatar: photoURL
         })
       }
      }

    return (
        <AuthContext.Provider value={{user, signInWithGoogle}}>
          {props.children}
        </AuthContext.Provider>
    );
}