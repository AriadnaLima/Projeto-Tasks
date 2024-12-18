import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import Feed from "./components/Feed"
import {DndProvider} from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"


function App() {
    return (
         <DndProvider backend = {HTML5Backend}>
              <Feed/>
         </DndProvider>
    )
    
}

export default App
