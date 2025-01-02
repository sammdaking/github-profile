import { useState, useEffect } from "react";
import style from "./App.module.css";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [data, setData] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [bio, setBio] = useState("");

  const keyDown = (e) => {
    if (e.key === "Enter") {
      fetchProfile();
    }
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://api.github.com/users/sammdaking");
      const jsonData = await response.json();
      setData(jsonData);
      setPhotoUrl(jsonData.avatar_url);
      const date = jsonData.created_at;
      const seperatedYear = date.split("T")[0].split("-").reverse();
      const truDate = seperatedYear.slice(0, 3) + seperatedYear.slice(3, 4);
      setBio(jsonData.bio);
      setCreatedDate(truDate);
      console.log(jsonData);
    };

    fetchData();
  }, []);
  const fetchProfile = async () => {
    const url = `https://api.github.com/users/${name}`;
    const response = await axios.get(url);
    setData(response.data);
    setPhotoUrl(response.data.avatar_url);
    const date = response.data.created_at;
    //2008-01-28
    const seperatedYear = date.split("T")[0].split("-").reverse();
    const truDate = seperatedYear.slice(0, 3) + seperatedYear.slice(3, 4);
    // const year = seperatedDate.split(0, 4);
    // const monthandday = seperatedDate.split(4);
    // const realyDate = `${monthandday}${year}`;
    setCreatedDate(truDate);
    setBio(response.data.bio);
    setCreatedDate(truDate);
  };
  return (
    <div className={style.container}>
      <div className={style.headerSide}>
        <h2>devfinder</h2>
      </div>
      <div className={style.inputSide}>
        <input
          type="text"
          placeholder="Search Github username..."
          value={name}
          onChange={handleChange}
          className={style.inputStyle}
          onKeyDown={keyDown}
        />
        <button className={style.searchButton} onClick={fetchProfile}>
          Search
        </button>
      </div>
      <div className={style.infoSide}>
        {data ? (
          <>
            <div className={style.infoSideContainer}>
              <div className={style.potoSide}>
                <img
                  className=""
                  src={photoUrl}
                  alt="avatar"
                  height={30}
                  width={30}
                />
              </div>
              <div className={style.writeSide}>
                <div className={style.accounNameSide}>
                  <p className={style.accountName}>Account Name {data.login}</p>
                  <p className={style.createdDate}>
                    Created Date {createdDate}
                  </p>
                  {bio === null ? <p>This profile has no bio</p> : <p>{bio}</p>}
                </div>

                <div className={style.numericalInfoSide}>
                  <p className={style.repo}>
                    Repo
                    <span className={style.publicRepo}>
                      {data.public_repos}
                    </span>
                  </p>
                  <p>
                    Followers{" "}
                    <span className={style.publicRepo}>{data.followers}</span>
                  </p>
                  <p>
                    Following{" "}
                    <span className={style.publicRepo}>{data.following}</span>
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>veriler yükleniyor</p>
        )}
      </div>
    </div>
  );
}

export default App;
