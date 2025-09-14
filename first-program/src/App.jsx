import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./components/Home";
import StylesDemo from "./components/StylesDemo";
    import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <>
      {/* <h1>hello... coders </h1> */}
      
      <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/stylesDemo/:data' element={<StylesDemo/>} />
      </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
