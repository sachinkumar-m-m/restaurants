import React from "react";
import { useHistory } from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import axios from 'axios';
import config from "../config";
import { useDispatch } from 'react-redux';
import { setUser } from "../redux/reducer";
const Login = () => {
    const dispatch = useDispatch();
    const [error, setError] = React.useState('')
	const history = useHistory();
    const dispatchUser = (user)=>{
        localStorage.setItem('user',JSON.stringify(user));
        dispatch(setUser(user))
        history.push('/home')
    }
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validate: (value) => {
			const error = {};
			if (!value.email) {
				error.email = "Please enter Email";
			}
			if (value.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) {
				error.email = "Please enter valid Email";
			}
			if (!value.password) {
				error.password = "Please enter password";
			}
			if (value.password && value.password.length < 8) {
				error.password = "Password length must be greater then 8 character";
			}
			return error;
		},
		onSubmit:async (values) => {
            setError('');
			const result = await axios.get(config.url.users);
            if(result.data.filter(e=>e?.email?.toLowerCase() === values.email.toLowerCase() && e?.password === values.password)?.length)
            {
                dispatchUser(result.data.filter(e=>e?.email?.toLowerCase() === values.email.toLowerCase())[0])
            }
            else{
                setError("Incorrect Email and Password");
            }

		},
	});
    React.useEffect(() => {
        const data = JSON.parse(JSON.stringify(localStorage.getItem('user')))        
        if(data)
            dispatchUser(JSON.parse(data))
    }, [])
    
	return (
        <form onSubmit={formik.handleSubmit}>
            <div
                className="flex justify-center items-center"
                style={{ height: "100vh", width: "100vw" }}>
                <div className="border rounded-lg shadow p-10 w-full md:w-6/12">
                    <Typography variant="h3" className="text-left mt-10 mb-10 font-bold">
                        Login
                    </Typography>
                    <div className="mt-5">
                        <TextField
                            fullWidth
                            id="Email"
                            name="email"
                            type={"text"}
                            label="Email"
                            variant="outlined"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </div>
                    <div className="mt-5">
                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            variant="outlined"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                    </div>
                    <div className="my-10">
                        <Button fullWidth variant="contained" type="submit">
                            Login
                        </Button>
                    </div>
                    {error && <p className="text-red-900 my-5">{error}</p>}
                    <p className="mt-5">
                        Don't have an account?{" "}
                        <span
                            className="cursor-pointer underline"
                            onClick={() => history.push("/signup")}>
                            Click Here
                        </span>
                        .
                    </p>
                </div>
            </div>
        </form>
	);
};

export default Login;
