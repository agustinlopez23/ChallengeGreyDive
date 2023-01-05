import { Route, Routes } from "react-router-dom";
import { DbResponse } from "./pages/DbResponse";
import { Form } from "./pages/Form";
import { NotFound } from "./pages/NotFound";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/responses" element={<DbResponse />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      
    </>
  );
};
