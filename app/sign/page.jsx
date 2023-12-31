"use client";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { updateForm } from "../features/formSlice/formSlice";
import { addUser } from "../features/usersSlice/usersSlice";
import { useState } from "react";
import Success from "../components/Success";
import { v4 as uuidv4 } from "uuid";

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.number().required().positive().integer(),
});

function Form() {
  const [isSucces, setIsSuccess] = useState(false);
  const dispatch = useDispatch();
  const formState = useSelector((state) => state.form);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    data,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: formState.userName,
      email: formState.email,
      phone: formState.phoneNumber,
      id: formState.id,
    },
  });

  const onSubmit = (data) => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
    }, 1000);
    const newData = { ...data, id: uuidv4() };
    dispatch(addUser(newData));
    console.log(newData);
    reset();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateForm({ name, value }));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-5 w-full items-center"
      >
        <TextField
          error={Boolean(errors.name)}
          {...register("name")}
          id="outlined-basic"
          label="What is your name? "
          variant="outlined"
          className="w-72"
          onChange={handleChange}
        />
        <TextField
          error={Boolean(errors.email)}
          {...register("email")}
          id="outlined-basic"
          label="E-mail"
          variant="outlined"
          className="w-72"
          onChange={handleChange}
        />
        <TextField
          error={Boolean(errors.phone)}
          helperText={errors.phone && `Please enter valid phone number!`}
          {...register("phone")}
          id="outlined-basic"
          label="Phone Number"
          variant="outlined"
          className="w-72"
          onChange={handleChange}
        />
        <Button type="submit" variant="outlined" color="inherit">
          Submit
        </Button>
      </form>
      {isSucces && <Success />}
    </>
  );
}

export default Form;
