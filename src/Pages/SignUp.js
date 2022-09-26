import React from "react";
import { useHistory } from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import config from "../config";
import axios from 'axios';

const SignUp = () => {
    const [error, setError] = React.useState('')
	const history = useHistory(); 
	const formik = useFormik({
		initialValues: {
			username: "",
			email: "",
			password: "",
		},
        validate:(value)=>{
            const error = {};
            if(!value.username)
            {
                error.username = 'Please enter Username'
            }
            if(!value.email)
            {
                error.email = 'Please enter Email'
            }
            if(value.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email))
            {
                error.email = 'Please enter valid Email'
            }
            if(!value.password)
            {
                error.password = 'Please enter password'
            }
            if(value.password && value.password.length < 8)
            {
                error.password = 'Password length must be greater then 8 character';
            }
            return error;
        },
		onSubmit: async (values) => {
			setError('');
            const result1 = await axios.get(config.url.users);
            if(result1.data.filter(e=>e?.email?.toLowerCase() === values.email.toLowerCase()))
            {
                setError('User already exist!!!');
            }
			const result = await axios.post(config.url.users, values);
            if(result.status === 201)
            {
                setError('Success');
            }
            else{
                setError(`Something Went Wrong, Error Code :${result.status}`)
            }
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<div
				className="flex justify-center items-center"
				style={{ height: "100vh", width: "100vw" }}>
				<div className="border rounded-lg shadow p-10 w-full md:w-6/12">
					<Typography variant="h3" className="text-left mt-10 mb-10 font-bold">
						Sign Up
					</Typography>
					<div className="mt-5">
						<TextField
							fullWidth
							id="Username"
							name="username"
							type={"text"}
							label="User Name"
							variant="outlined"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
						/>
					</div>
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
							Sign Up
						</Button>
					</div>
                    {error !== 'Success' && <p className="text-red-900 my-5">{error}</p>}
                    {error==='Success' && <p className="text-green-400 my-5">User Created Successfully!!!. <span className="font-bold underline cursor-pointer" onClick={()=>history.push('/')}>Click Here</span> to Login</p>}
					<p className="mt-5">
						Already have an account?{" "}
						<span
							className="cursor-pointer underline"
							onClick={() => history.push("/")}>
							Click Here
						</span>
						.
					</p>
				</div>
			</div>
		</form>
	);
};

export default SignUp;
