import "./Component2.css"; 

export function Component2() {
  let title = "Random Texts";

  const generateRandomText = () => {
    const length = Math.floor(Math.random() * (64 - 8 + 1)) + 8;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$$%^&*()_";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const randomTextList = Array.from({ length: 5 }, () => generateRandomText());

  function getHeading() {
    return title;
  }

  return (
    <div className="component2-container">
      <h1 className="title">{getHeading()}</h1>
      <p className="random-text-list">
        {randomTextList.map((text, index) => (
          <li className="random-text-item" key={index}>{text}</li>
        ))}
      </p>
    </div>
  );
}
