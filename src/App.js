import { useState } from 'react';
import './App.css';
const upload_url = 'http://localhost:9292/upload';

function App() {
  const [imageUrl, setImageUrl] = useState();
  const [file, setFile] = useState();

  function handleImageChange(e) {
    setFile(e.target.files[0])
    console.log(e.target.files[0])
  }

  function uploadImage(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);

    fetch(upload_url, {
      method: 'POST',
      body:formData,
    })
      .then((res) => res.json())
      .then(json => setImageUrl(`http://localhost:9292/${json.url}`));
  }

  return (
    <div className="App">
      <h1>Upload File</h1>
      <form onSubmit={uploadImage}>
        <label htmlFor="file">File:</label>
        <input type="file" name="image" onChange={handleImageChange} />
        <button type="submit">Upload</button>
      </form>

      <hr />

      {imageUrl ? <img src={imageUrl} alt={imageUrl} /> : ''}
    </div>
  );
}

export default App;
