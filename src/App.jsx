import { BrowserRouter, Routes, Route } from "react-router-dom";
import ArticlesPage from "./pages/ArticlesPage";
import SingleArticlePage from "./pages/SingleArticlePage";
import TopicsPage from "./pages/TopicsPage"; 
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ArticlesPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:article_id" element={<SingleArticlePage />} />

        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/topics/:topic" element={<ArticlesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
