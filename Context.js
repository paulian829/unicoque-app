import { createContext, useState } from "react";

export const AppStateContext = createContext();

const AppStateProvider = (props) => {

const [user, setUser] = useState(null)
const [type, setType] = useState(null)
const [account, setAccount] = useState(null)
const [university, setUniversity] = useState(null)





  return (
    <AppStateContext.Provider value={[user, setUser]}>
      {props.children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;
