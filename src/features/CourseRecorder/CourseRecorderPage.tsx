import { Controller, SubmitHandler, useFieldArray, useForm } from "react-hook-form";

type Register = {
  userId: string;
  userName: string;
};
type Inputs = {
  courseId: number;
  courseName: string;
  startDate: Date;
  endDate: Date;
  startRegisterDate: Date;
  endregisterDate: Date;
  register: Register[];
};

const CourseList = [
  { courseId: 1, courseName: "Clean Architecture" },
  { courseId: 2, courseName: "Game Development" },
  { courseId: 3, courseName: "Programmer" },
];

export default function CourseRecorderPage() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormProvider)
      name: "test", // unique name for your Field Array
    }
  );
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <select defaultValue={2} {...register("courseId")}>
          {CourseList.map((x) => (
            <option value={x.courseId}>{x.courseName}</option>
          ))}
        </select>
        เวลาเรียน
        <input type="datetime-local" {...register("startDate")} />
        <input type="datetime-local" {...register("endDate")} />
        เวลาลงทะเบียน
        <input type="datetime-local" {...register("startRegisterDate")} />
        <input type="datetime-local" {...register("endregisterDate")} />
        ผู้ลงทะเบียน
        <ul>
          {fields.map((item, index) => (
            <li key={item.id}>
              <input {...register(`test.${index}.firstName`)} />
              {/* <Controller
                render={({ field }) => <input {...field} />}
                name={`test.${index}.lastName`}
                control={control}
              /> */}
              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => append({ firstName: "bill", lastName: "luo" })}
        >
          append
        </button>
        <input type="submit" />
      </form>
    </div>
  );
}

// design
// class
