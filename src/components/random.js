import React, { useEffect, useState } from "react";
import generator from "generate-password";
import "./random.css";
import box from "./box-archive-solid.svg";
import clipbord from "./clipboard-regular.svg";
// import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
// import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Random() {
  const [password, setPassword] = useState("");
  const [length1, setLength1] = useState(10);
  const [isLowerCase, setIsLowerCase] = useState(false);
  const [isUpperCase, setIsUpperCase] = useState(false);
  const [isNumbers, setIsNumbers] = useState(false);
  const [isSymbols, setIsSymbols] = useState(false);
  const [storedPasswords, setStoredPasswords] = useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //   const generatePassword = () => {
  //     const pwd = generator.generate({
  //       length: length,
  //       lowercase: isLowerCase,
  //       uppercase: isUpperCase,
  //       numbers: isNumbers,
  //       symbols: isSymbols
  //     });
  //     setPassword(pwd);

  //   }

  const generatePassword = () => {
    var length = parseInt(length1, 10);

    const charset = [];

    console.log("daafa", isLowerCase);

    if (!isLowerCase) charset.push("abcdefghijklmnopqrstuvwxyz");
    if (!isUpperCase) charset.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    if (!isNumbers) charset.push("0123456789");
    if (!isSymbols) charset.push("!@#$%^&*()");

    console.log("dcaa", charset);
    if (length1 > 15) {
      setPassword("The password length is more than 15 charter");
      return;
    }
    if (charset.length === 0) {
      setPassword("At least one option should be selected.");
      return;
    }

    const passwordArray = [];
    const charsetString = charset.join("");
    const charsetLength = charsetString.length;

    const randomValues = new Uint32Array(length);
    window.crypto.getRandomValues(randomValues);

    console.log("zcac", randomValues);

    for (let i = 0; i < length; i++) {
      const randomIndex = randomValues[i] % charsetLength;
      passwordArray.push(charsetString[randomIndex]);
      console.log("kiran", randomIndex);
    }
    const newPassword = passwordArray.join("");
    setPassword(newPassword);

    // Store in local storage
    const storedPasswords =
      JSON.parse(localStorage.getItem("generatedPasswords")) || [];
    storedPasswords.push(newPassword);
    if (storedPasswords.length > 5) {
      storedPasswords.shift(); // Remove oldest password if more than 5
    }
    localStorage.setItem("generatedPasswords", JSON.stringify(storedPasswords));
    // setPassword(passwordArray.join(""));
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  useEffect(() => {
    const passwords =
      JSON.parse(localStorage.getItem("generatedPasswords")) || [];
    setStoredPasswords(passwords);
  }, [storedPasswords]);

  return (
    <div className="container">
      <h2>Generate a random password</h2>
      <div className="row">
        <div className="col">
          <label>
            <span className="lbl-len">Length:</span>
            <input
              type="number"
              className="input-len form-control"
              value={length1}
              onChange={(e) => setLength1(e.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label className="form-control">
            <input
              type="checkbox"
              className="mr-1"
              defaultChecked="{isLowerCase}"
              onChange={() => setIsLowerCase((val) => !val)}
            />
            <span>LowerCase</span>
          </label>
        </div>
        <div className="col">
          <label className="form-control">
            <input
              type="checkbox"
              className="mr-1"
              defaultChecked="{isUpperCase}"
              onChange={() => setIsUpperCase((val) => !val)}
            />
            <span>UpperCase</span>
          </label>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label className="form-control">
            <input
              type="checkbox"
              className="mr-1"
              defaultChecked="{isNumbers}"
              onChange={() => setIsNumbers((val) => !val)}
            />
            <span>Numbers</span>
          </label>
        </div>
        <div className="col">
          <label className="form-control">
            <input
              type="checkbox"
              className="mr-1"
              defaultChecked="{isSymbols}"
              onChange={() => setIsSymbols((val) => !val)}
            />

            <span>Symbols</span>
          </label>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <input
            type="button"
            className="btn btn-dark mt-2 mb-3"
            value="Generate Password"
            onClick={generatePassword}
          />
          <div className="password">Your Password is: {password}</div>
          {console.log("aaaf", password)}
        </div>
        <div style={{ margin: "0 20px" }} className="boxImg-container1">
          <img
            src={clipbord}
            className="boxImg1"
            width={50}
            height={40}
            onClick={handleCopyToClipboard}
          />
        </div>
        <div style={{ margin: "0 20px" }} className="boxImg-container">
          <img
            src={box}
            className="boxImg"
            width={50}
            height={40}
            onClick={handleOpen}
          />
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Genrated last Five password
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Box>
                {storedPasswords.length > 0 ? (
                  <ul>
                    {storedPasswords.map((password, index) => (
                      <li key={index}>{password}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No stored passwords found.</p>
                )}
              </Box>
            </Typography>
            <Box>
                <button className="closeBtn" onClick={handleClose}>Close</button>
            </Box>
          </Box>
        </Modal>
      </div>
      <small className="small-text">
        Note: At least one option should be selected.
      </small>
    </div>
  );
}

export default Random;
