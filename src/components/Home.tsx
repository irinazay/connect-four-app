import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { SubmitHandler } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { playersInfoState } from "../state/game";
import "../styles/partials/_home.scss";

interface IFormValues {
  name1: string;
  age1: string;
  name2: string;
  age2: string;
}

export default function Home() {
  const setPlayerInfo = useSetRecoilState(playersInfoState);
  const navigate = useNavigate();
  const formSchema = useMemo(
    () =>
      zod.object({
        name1: zod.string().min(3, { message: "Email address is required" }),
        age1: zod.string().min(1, { message: "Please choose a password" }),
        name2: zod.string().min(3, { message: "Email address is required" }),
        age2: zod.string().min(1, { message: "Please choose a password" }),
      }),
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name1: "",
      age1: "",
      name2: "",
      age2: "",
    },
  });

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    const randomNum = Math.floor(Math.random() * 2 + 1);
    randomNum === 2
      ? setPlayerInfo({
          name1: data.name2,
          age1: data.age2,
          name2: data.name1,
          age2: data.age1,
        })
      : setPlayerInfo(data);
    navigate("/game");
  };

  return (
    <div className="user-info">
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>Please enter name and age </p>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name1"
            required
            placeholder="Name"
            {...register("name1")}
          />
          {errors.name1 && <div>{errors.name1.message}</div>}
          <label htmlFor="age1">Age</label>
          <input
            type="text"
            id="age1"
            required
            placeholder="Age"
            {...register("age1")}
          />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name2"
            required
            placeholder="Name"
            {...register("name2")}
          />
          {errors.name2 && <div>{errors.name2.message}</div>}
          <label htmlFor="age2">Age</label>
          <input
            type="text"
            id="age2"
            required
            placeholder="Age"
            {...register("age2")}
          />
        </div>
        <button type="submit">Submit</button>
        {errors.age2 && <div>{errors.age2.message}</div>}
      </form>
    </div>
  );
}
