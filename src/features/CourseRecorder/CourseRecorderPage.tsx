import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

type Register = {
  userId: number;
  userName: string;
  base64: string;
  file: File;
};
type Inputs = {
  courseId: number;
  courseName: string;
  startDate: string;
  endDate: string;
  startRegisterDate: string;
  endregisterDate: string;
  register: Register[];
};

const CourseList = [
  { courseId: 1, courseName: "Clean Architecture" },
  { courseId: 2, courseName: "Game Development" },
  { courseId: 3, courseName: "Programmer" },
];

const Employee = [
  { userName: "wasan", userId: 1 },
  { userName: "teletub", userId: 2 },
  { userName: "joe", userId: 3 },
];

const response = {
  courseId: 3,
  startDate: "2024-06-13T21:00",
  endDate: "2024-06-27T21:00",
  startRegisterDate: "2024-07-02T21:00",
  endregisterDate: "2024-06-18T21:01",
  register: [
    {
      userId: 3,
      fileName: "file1",
      file: {},
      base64: "data:image/",
    },
    {
      userId: 1,
      fileName: "file2",
      base64:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHEAAADmCAYAAADiHWBJRU5ErkJggg==",
    },
  ],
};

export default function CourseRecorderPage() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: response,
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormProvider)
      name: "register", // unique name for your Field Array
    }
  );

  function toBase64(file: File) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <select defaultValue={2} {...register("courseId")}>
          {CourseList.map((x) => (
            <option value={x.courseId}>{x.courseName}</option>
          ))}
        </select>
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
        <button type="button" onClick={() => append({userId:0})}>
          append
        </button>
        <ul>
          {fields.map((item, index) => (
            <li key={"user" + index}>
              {/* <input {...register(`register.${index}.userName`)} /> */}
              <select
                defaultValue={2}
                {...register(`register.${index}.userId`)}
              >
                <option value={0}>PleaseSelect</option>
                {Employee.map((x) => (
                  <option value={x.userId}>{x.userName}</option>
                ))}
              </select>
              {/* file upload */}
              <input
                {...(register(`register.${index}.file`),
                {
                  onChange: async (e) => {
                    // console.log(e.target.files[0]);
                    const a = await toBase64(e.target.files[0]).then();
                    // putinto
                    setValue(`register.${index}.base64`, a as string); // ✅ performant
                    setValue(`register.${index}.file`, e.target.files![0]); // ✅ performant
                    // console.log(a);
                  },
                })}
                type="file"
              />
              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        <input type="submit" />
      </form>
    </div>
  );
}

// design
// class
