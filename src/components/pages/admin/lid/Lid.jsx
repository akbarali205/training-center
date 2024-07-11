import React from 'react'
import useFetch from '../../../customHooks/useFetch';
import useSetValue from '../../../customHooks/useSetValue';

function Lid({ lid }) {

  const {handleChange, inputValues} = useSetValue()

  const {getData: groups} = useFetch({
    url: "http://localhost:5000/groups",
    mode: "GET"
  })

  async function submidLid() {
    if (!inputValues.group) {
      return alert('Guruhni tanlang!')
    }
    const setData = {
      name: lid.name,
      surname: lid.surname,
      group: inputValues.group,
      address: lid.address,
      born: lid.born,
      phone: lid.phone,
      lid: lid._id
    }
    if (inputValues.parentsPhone) {
      setData.parentsPhone = inputValues.parentsPhone;
    }
    console.log(setData);
    const response = await fetch('http://localhost:5000/pupils',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(setData)
    }
  )
    if(response.status < 300 && response.ok) {
      alert("O'quvchilarga qo'shildi")
      console.log(response);
    } else {
      alert("O'quvchilarga qo'shishda xatolik yuz berdi")
    }
  }

  return (
    <div className="cabinet">
      <div className="cabinet_nav">
        <i>Talabgor kabineti</i>
        <div className="cabinet_btn_box">
          <button>Talabgorni o'chirish</button>
        </div>
      </div>
      <div className='cabinet_container'>
        <div className="cabinet_info">
          <h2>{lid.name} {lid.surname}</h2>
          <p>O'qimoqchi bo'lgan fani: <i>{lid.subject}</i></p>
          <p>Bo'sh vaqti: <i>{lid.free}</i></p>
          <p>Telefon raqami: <i>{lid.phone}</i></p>
          <p>Manzili: <i>{lid.address}</i></p>
          <p>Tug'ilgan yili: <i>{lid.born}</i></p>
        </div>
        <div className="cabinet_body">
        <label htmlFor="group">
        <select name="group" id='group' defaultValue={''} onChange={handleChange}>
          <option value="" disabled>Tanlang...</option>
          {groups.map((group, index) => (
            <option key={index} value={group._id}>Guruh nomi: {group.name}, Fani: {group.direction}, Vaqt: {group.time}
            </option>
          ))}
        </select>
        </label>
          <label className='label' htmlFor="parentsPhone">
            <span>Ota-Onasining telefon raqami: (ixtiyoriy)</span>
            <input className='input' type="number" id="parentsPhone" name="parentsPhone" onChange={handleChange} placeholder="+998 XX XXX-XX-XX" />
          </label>
        <button onClick={submidLid}>Talabgorni o'quvchilarga qo'shish</button>
        </div>
      </div>
    </div>
  )
}

export default Lid