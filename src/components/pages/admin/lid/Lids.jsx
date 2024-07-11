import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import { IoSearchCircle } from "react-icons/io5";
import useFetch from '../../../customHooks/useFetch';

function Lids() {
  const { getData } = useFetch({
    mode: "GET",
    url: "http://localhost:5000/lids",
  });

  // SEARCHING
  const [find_1, setFind_1] = useState("");
  const [find_2, setFind_2] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [searchSwitch, setSearchSwitch] = useState(false);

  useEffect(() => {
    if (find_1 || find_2) {
      setSearchSwitch(true);
    } else {
      setSearchSwitch(false);
    }
    const handleSearch = () => {
      const filteredData = getData.filter(
        (item) =>
          item.name.toLowerCase().includes(find_1.toLowerCase()) &&
          item.surname.toLowerCase().includes(find_2.toLowerCase())
      );
      setSearchData(filteredData);
    };

    handleSearch();
    console.log(searchData);
  }, [find_1, find_2]);

  // SEARCHING END --

  return (
    <div className="admin_right_box">
      <div className="admin_right_nav">
        <p>
          <i>Talabgorlar</i>
        </p>
        <div className="search_bar">
          <input
            type="text"
            placeholder="Ismi..."
            value={find_1}
            onChange={(e) => setFind_1(e.target.value)}
          />
          <IoSearchCircle
            fontSize={"35px"}
            color={
              searchSwitch ? (searchData.length > 0 ? "green" : "red") : "white"
            }
          />
          <input
            type="text"
            placeholder="Familiyasi..."
            value={find_2}
            onChange={(e) => setFind_2(e.target.value)}
          />
        </div>
        <Link to={"/admin/addLid"}>
          <button className="button-27">Talabgor qo'shish</button>
        </Link>
      </div>
      <div className="admin_right_table">
        <div className="table">
          <div className="thead">
            <div className="tr">
              <div className="th">№</div>
              <div className="th">Ism</div>
              <div className="th">Familiya</div>
              <div className="th">Telefon</div>
              <div className="th">Email</div>
            </div>
          </div>
          <div className="tbody">
            {getData ? (
              searchSwitch ? (
                searchData.length > 0 ? (
                  searchData.map((item, index) => (
                    <Link to={`/admin/${item._id}`} className="tr" key={index}>
                      <div className="td">{index + 1}</div>
                      <div className="td">{item.name}</div>
                      <div className="td">{item.surname}</div>
                      <div className="td">{item.pNumber}</div>
                      <div className="td">{item.sub1}</div>
                    </Link>
                  ))
                ) : (
                  <p className="warning">Qiduruv bo'yicha malumot topilmadi</p>
                )
              ) : (
                getData.map((item, index) => (
                  <Link to={`/admin/${item._id}`} className="tr" key={index}>
                    <div className="td">{index + 1}</div>
                    <div className="td">{item.name}</div>
                    <div className="td">{item.surname}</div>
                    <div className="td">{item.pNumber}</div>
                    <div className="td">{item.sub1}</div>
                  </Link>
                ))
              )
            ) : (
              <p className="warning">Hali hech qanday malumotlar yo'q</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lids