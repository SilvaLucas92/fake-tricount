import clsx from "clsx";
import { CustomSelect } from "../Select";

const Counts = ({ data }) => {
  
  const options = data?.map((item: any) => {
    return {
      value: item.title,
      label: item.title,
    };
  });

  return (
    // <div
    //   className={clsx(
    //     "w-2/4",
    //     "border",
    //     "border-gray-100",
    //     "rounded-md",
    //     "flex",
    //     "justify-between",
    //     "items-center",
    //     "my-5",
    //     "py-5",
    //     "px-10"
    //   )}
    // >
    //   <div className="flex-col">
    //     <h5 className="font-semibold">Vacaciones</h5>
    //     <p>Sin descripcion</p>
    //   </div>
    //   <div>
    //     <div className="flex-col">
    //       <p className="font-semibold">Lucas Silva</p>
    //     </div>
    //   </div>
    // </div>
    <>
      {options?.map((item: any) => (
        <CustomSelect key={item.title} data={item} placeholder={"Select..."} />
      ))}
    </>
  );
};

export default Counts;
