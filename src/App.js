import "./App.css";

function App() {
  const date = new Date().toDateString();
  return (
    <div className="Container">
      <div className="DateContainer">
        <label>{date}</label>
      </div>
      <div className="FoodRow">
        <img
          class="CategoryImage"
          src="https://www.fitwatch.com/files/large/621b3f19db47a57"
        />
        <button className="FoodIntakeButton">-</button>
        <div className="circle" />
        <div className="circle" />
        <div className="circle" />
        <div className="circle" />
        <div className="circle" />
        <div className="circle" />
        <button className="FoodIntakeButton">+</button>
      </div>
    </div>
  );
}

export default App;
