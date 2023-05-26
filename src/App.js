import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Pages/Personal/Personal";
import Project from "./Pages/Project/Projects";
import Education from "./Pages/Education/Education";
import Skill from "./Pages/Skills/Skill";
import Start from "./Pages/Start/Start";
import Final from "./Pages/Final/Final";
import Note from "./Pages/Message/Message";


const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Note />} />
        <Route exact path="/Start" element={<Start />} />
        <Route exact path="/Personal" element={<Home />} />
        <Route exact path="/Project" element={<Project />} />
        <Route exact path="/Education" element={<Education />} />
        <Route exact path="/Skill" element={<Skill />} />
        <Route exact path="/Final" element={<Final />} />
      </Routes>
    </>
  )
}

export default App
