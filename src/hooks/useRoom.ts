import { useEffect, useState } from "react";
import {database} from "../services/firebase";
import {useAuth} from "./useAuth"

type FirebaseQuestions = Record<string, {
    author: {
      name: string;
      avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<string, {
      authorId: string;
    }>
  }> //Record é pra dizer que é um objeto  

type QuestionType = {
    id: string;
    author: {
      name: string;
      avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likeCount: number;
    likeId: string | undefined;
  }

export function useRoom(roomId: string) {
    const { user } = useAuth();
    const [questions, setQuestions] = useState<QuestionType[]>([])
    const [title, setTitle] = useState('');

    useEffect(() => {

        const roomRef = database.ref(`rooms/${roomId}`);
   
        //observando as perguntas pra quando ter nova aparecer em tela
        roomRef.on('value', room => {
        
         const databaseRoom = room.val();
         const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}; 
         
         const parsedQuestions  = Object.entries(firebaseQuestions).map(([key, value]) => {
           return {
             id: key,
             content: value.content,
             author: value.author,
             isHighlighted: value.isHighlighted,
             isAnswered: value.isAnswered,
             likeCount: Object.values(value.likes ?? {}).length, //pra ter o nº de likes
             likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0], //se o usuário tiver dado like, vai retornar o id do like
           }
         }) //entries transforma o objeto em array
         setTitle(databaseRoom.title);
         setQuestions(parsedQuestions);
        })

      return () => {
        roomRef.off('value'); //remover os listening
      }
    }, [roomId, user?.id]); //dispara um evento sempre que algo mudar, esse algo fica entre [], então se ficar vazio vai disparar somente uma vez, quando o componente for exibido em tela
    
      return {questions, title}
}
