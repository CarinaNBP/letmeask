//useEffect vai usar pra quando atualizar a pag não perder a autenticação
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";
import { AuthContextProvider } from "./contexts/AuthContext";
import { AdminRoom } from "./pages/AdminRoom";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
          <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
} //switch usa pra quando achar uma rota, não continue procurando por outra, ou seja, colocar a rota Room na rota NewRoom tbm

//assim as rotas conseguem sabem o valor do context
//usa exact pois se não o React vai ver só se começa com / e não se é exatamente esse endereço
export default App;
