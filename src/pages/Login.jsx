import React ,{useState} from "react";
import { Box, Button, TextField } from "@mui/material";
import axios from 'axios'

export default function Login() {
    const [form,setForm] = useState({
        useremail:"",
        userpassword:""
    })

    const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }); //
    };

    const handleSubmit = async() =>{
        try {
            const res = await axios.post("http://localhost:9000/auth/login", form)
            console.log(res.data)
            if(res.data.success){
                alert("Loged in sucessfully")
                localStorage.setItem("mytoken",res.data.token)
            }
        } catch (error) {
          alert(error)
        }
    }
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Login Page</h1>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: "300px",
          margin: "auto",
        }}
      >
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
          label="Password"
          variant="outlined"
            name="userpassword"
            onChange={handleChange}
            value={form.userpassword}
        />
        <Button variant="contained" onClick={handleSubmit}>Login User</Button>
      </Box>
    </div>
  );
}
