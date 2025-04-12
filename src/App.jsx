import { useState, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, setName, turnOn, turnOff, toggle } from './redux/store';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Home() {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.name.name);
  const lightOn = useSelector((state) => state.light.on);
  const [inputName, setInputName] = useState('');

  useEffect(() => {
    document.body.style.backgroundColor = lightOn ? '#cceeff' : '#111';
    document.body.style.color = lightOn ? '#000' : '#fff';
  }, [lightOn]);

  return (
    <>
      <h1> Bosh sahifa</h1>
      <input
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
        placeholder="Ismingizni kiriting"
        style={{ padding: '6px', marginRight: '8px' }}
      />
      <button onClick={() => dispatch(setName(inputName))}>Saqlash</button>
      {name && <p>Salom, {name} 👋</p>}

      <h2 style={{ color: lightOn ? 'green' : 'gray' }}>
        💡 Chiroq holati: {lightOn ? 'YONIQ ■' : 'O‘CHIQ ■■'}
      </h2>
      <button onClick={() => dispatch(turnOn())}>Yoqish</button>
      <button onClick={() => dispatch(turnOff())}>O‘chirish</button>
      <button onClick={() => dispatch(toggle())}>Teskari qilish</button>

      <nav style={{ marginTop: '20px' }}>
        <Link to="/profile">🔁 Profile sahifasi</Link> |{' '}
        <Link to="/newPage">💡 Yangi sahifa</Link>
      </nav>
    </>
  );
}

function Profile() {
  const name = useSelector((state) => state.name.name);
  return <h2>👤 Profile sahifasi — Salom, {name}</h2>;
}

function NewPage() {
  const lightOn = useSelector((state) => state.light.on);
  return (
    <h2 style={{ color: lightOn ? 'green' : 'gray' }}>
      📄 Yangi sahifa — Chiroq holati: {lightOn ? 'YONIQ' : 'O‘CHIQ'}
    </h2>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/newPage" element={<NewPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
