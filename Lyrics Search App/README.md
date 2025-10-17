\# Lyrics Search App



A web application to search for song lyrics using an exact search or partial lyrics.



\## Prerequisites

\- Node.js (version 14.x or higher recommended)

\- npm (comes with Node.js)

\- Live Server extension (for VS Code) or any local server



\## Setup Instructions



1\. \*\*Clone or Download the Repository\*\*

\- If using Git, clone the repository:git clone <repository-url>

&nbsp;   cd Lyrics Search App

\- Otherwise, download the ZIP and extract it to a folder.



2\. \*\*Install Backend Dependencies\*\*

\- Navigate to the `backend` folder: cd backend  (note : there is no backend folder in this project but you can make one for backend with server.js and package.json file)

\- Install dependencies: npm install



3\. \*\*Start the Backend Server\*\*

\- In the `backend` folder, run: node server.js

\- Ensure the server logs: `Server running at http://localhost:3002`.



4\. \*\*Run the Frontend\*\*

\- Navigate back to the root folder: cd ..

\- Use Live Server to open `frontend/index.html` at `http://127.0.0.1:5500/frontend/index.html`.

\- Alternatively, use a local server command if available.



5\. \*\*Test the App\*\*

\- Open the browser at the served URL.

\- Test cases:

\- Exact Search: Enter "Queen" as Artist and "Bohemian Rhapsody" as Song.





\## Project Structure

\- `backend/`: Contains the Node.js server (`server.js`) and dependencies.

\- `frontend/`: Contains `index.html`, `script.js`, and `styles.css` for the web app.

\- `node\_modules/`: (Auto-generated) Dependency folder (ignored by `.gitignore`).

\- `dist/`: (Optional) Build output if using a bundler (ignored by `.gitignore`).



\## Notes

\- The app uses a mock dataset for partial lyrics due to issues with the `genius-lyrics` library in browsers.

\- For real partial lyrics, consider obtaining a Genius API key and integrating it.



\## Contributing

Feel free to fork and submit pull requests!

