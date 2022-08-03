# Sinatra/React Image Upload Demo

(Backend repo is here: https://github.com/marcmajcher/sinatra-react-file-upload-demo-backend)

## Set up the Sinatra template for the backend
1. clone https://github.com/learn-co-curriculum/phase-3-sinatra-react-project.git image-upload-backend
1. cd image-upload-backend
1. rm -rf .canvas .git .github
1. bundle install
1. git init; git add . ; git commit -m init
1. rake server

## Set up a React app for the frontend
1. npx create-react-app image-upload-frontend
1. cd image-upload-frontend
1. npm start
1. (optional) delete all the junk from the default react app:
	webvitals, logo, boilerplate App, etc

## Add the upload form on the frontend
```html
<h1>Upload File</h1>
<form onSubmit={uploadImage}>
  <label htmlFor="file">File:</label>
  <input type="file" name="image" onChange={handleImageChange} />
  <button type="submit">Upload</button>
</form>
```

## Set up your handlers
```js
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

  fetch('http://localhost:9292/upload', {
    method: 'POST',
    body:formData,
  })
    .then((res) => res.json())
    .then(json => setImageUrl(`http://localhost:9292/${json.url}`));
}
```

## Add a bit to display the image once uploaded
```js
{ imageUrl ? <img src={imageUrl} alt={imageUrl} /> : '' }
```

## On the backend:
- create folder in app: public/images
- in ApplicationCcntroller, set the public dir:
```ruby
set :public_folder, 'app/public'
```
- and image directory:
```ruby
set :image_dir, File.join(settings.public_folder, 'images')
```

## In your controller, add the upload route
```ruby
post '/upload' do
  if params[:image]
    filename = params[:image][:filename]
    tempfile = params[:image][:tempfile]
    FileUtils.copy(tempfile, File.join(settings.image_dir, filename))
    {status: "ok", url: "/images/#{filename}"}.to_json
  else
    {status: "error", message: "no file"}
  end
end
```

Now when you submit a file through the form, the backend will grab the filename and the temporary file, copy the temp file to the images dir, and send back a url to access it!
