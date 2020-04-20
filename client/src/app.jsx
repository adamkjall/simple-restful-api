import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";

import MemberContext from "./contexts/member-context/context";

import CardList from "./components/card-list";
import MemberDetails from "./components/member-details";
import Modal from "./components/modal";
import Form from "./components/form";

import "./app.scss";

function App() {
  const { members } = useContext(MemberContext);

  return (
    <div className="app ">
      <Switch>
        <Route exact path="/member/:id">
          <Modal>
            <MemberDetails />
          </Modal>
        </Route>
        <Route exact path="/members/:mode/:id?">
          <Modal>
            <Form />
          </Modal>
        </Route>
      </Switch>

      <header>
        <h1 className="">Robofriends</h1>
      </header>
      <main>
        <CardList members={members} />
      </main>
    </div>
  );
}

export default App;
