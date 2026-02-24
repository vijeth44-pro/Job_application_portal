import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    useremail: "",
    userphone: "",
    userpassword:""
  });
 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }); //
  };

  const handleSubmit = async() =>{
    try {
        const res = await axios.post("http://localhost:9000/auth/register", form)
        console.log(res.data)
        if(res.data.success){
            alert("Data added sucessfully")
        }

    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div>
      <h1 style={{textAlign:'center'}}>Register Page</h1>
      <Box sx={{ display: "flex", flexDirection:"column", gap: 3 ,width:'300px', margin:'auto' }}>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          name="username" 
          onChange={handleChange}
          value={form.username}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          name="useremail"
          onChange={handleChange}
          value={form.useremail}
        />
        <TextField
          id="outlined-basic"
          label="Phone"
          variant="outlined"
          name="userphone"
          onChange={handleChange}
          value={form.userphone}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          name="userpassword"
          onChange={handleChange}
          value={form.userpassword}
        />

        <Button variant="contained" onClick={handleSubmit}>Signup User</Button>
      </Box>
    </div>
  );
}
