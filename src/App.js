import './App.css';
import { Route, Routes } from "react-router-dom";
import AdminMain from './components/pages/admin/admin_main/AdminMain';
import Lids from './components/pages/admin/lid/Lids';
import Pupils from './components/pages/admin/pupils/Pupils';
import Teachers from './components/pages/admin/teachers/Teachers';
import Groups from './components/pages/admin/groups/Groups';
import AddLid from './components/pages/admin/lid/AddLid';
import AddGroup from './components/pages/admin/groups/AddGroup';
import Lid from './components/pages/admin/lid/Lid';
import useFetch from './components/customHooks/useFetch';

function App() {
  const {getData: lids} = useFetch({
    url: "http://localhost:5000/lids",
    mode: "GET"
  })
  
  return (
    <div className="App">
      <Routes>
        <Route path='/admin/' element={<AdminMain />} >

          {/* All tables */}
          <Route path='lids' element={<Lids />} />
          <Route path='pupils' element={<Pupils />} />
          <Route path='teachers' element={<Teachers />} />
          <Route path='groups' element={<Groups />} />

          {/* Add forms */}
          <Route path='addLid' element={<AddLid />} />
          <Route path='addGroup' element={<AddGroup />} />

          {/* Cabinets */}
          {
            lids.map((item, index) => (
              <Route key={index} path={`${item._id}`} element={<Lid lid={item} />} />
            ))
          }
        </Route>
      </Routes>
    </div>
  );
}

export default App;