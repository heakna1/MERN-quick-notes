import {useState} from "react";
import {Routes, Route} from "react-router-dom"
import AuthPage from "./AuthPage/AuthPage";
import NewOrderPage from "./NewOrderPage/NewOrderPage"
import OrderHistoryPage from "./OrderHistoryPage/OrderHistoryPage";
import NavBar from "../../components/NavBar"
import "./App.css";

import {getUser} from "../../utilities/users-services"

function App() {
//user is the variable and setUser is the setter function
  const [user, setUser] = useState(getUser())

  let resPromise = fetch("https://jsonplaceholder.typicode.com/users")

  resPromise
    .then(res => res.json())
    .then(res => console.log(res))

  return (
    <main className="App">
      {
        user ? (
        <>
        <NavBar user={user} setUser={setUser}/>
        <Routes>
          <Route path="/orders/new" element={<NewOrderPage/>}/>
          <Route path="/orders" element={<OrderHistoryPage/>}/>
        </Routes>
        </>
        ) : (
        <AuthPage setUser={setUser}/>
      )}
    </main>
  );
}

export default App;
