 //useEffect vai usar pra quando atualizar a pag não perder a autenticação
import { BrowserRouter, Route } from 'react-router-dom'

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

import { AuthContextProvider } from './contexts/AuthContext'

function App() {
  

  return (
    <BrowserRouter>
    <AuthContextProvider>
      <Route path="/" exact component={Home} /> 
      <Route path="/rooms/new" component={NewRoom} />
    </AuthContextProvider>
    </BrowserRouter>

  );
}

  //assim as rotas conseguem sabem o valor do context
 //usa exact pois se não o React vai ver só se começa com / e não se é exatamente esse endereço
export default App;
