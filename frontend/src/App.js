import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BlogGoa from "@/pages/BlogGoa";
import SmoothScroll from "@/components/blog/SmoothScroll";

function App() {
  return (
    <div className="App grain">
      <BrowserRouter>
        <SmoothScroll>
          <Routes>
            <Route
              path="/blog/pre-wedding-couple-portrait-shoot-locations-goa"
              element={<BlogGoa />}
            />
            {/* Default and catch-all route sends everyone to the editorial blog */}
            <Route path="/" element={<BlogGoa />} />
            <Route
              path="*"
              element={
                <Navigate
                  to="/blog/pre-wedding-couple-portrait-shoot-locations-goa"
                  replace
                />
              }
            />
          </Routes>
        </SmoothScroll>
      </BrowserRouter>
    </div>
  );
}

export default App;
