import { BrowserRouter, Routes, Route } from "react-router-dom";
import ArticlesPage from "./pages/ArticlesPage";
import SingleArticlePage from "./pages/SingleArticlePage";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:article_id" element={<SingleArticlePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
