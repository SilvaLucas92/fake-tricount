import clsx from "clsx";

const Counts = () => {
  return (
    <div
      className={clsx(
        "w-2/4",
        "border",
        "border-gray-100",
        "rounded-md",
        "flex",
        "justify-between",
        "items-center",
        "my-5",
        "py-5",
        "px-10"
      )}
    >
      <div className="flex-col">
        <h5 className="font-semibold">Vacaciones</h5>
        <p>Sin descripcion</p>
      </div>
      <div>
        <div className="flex-col">
          <p className="font-semibold">Lucas Silva</p>
        </div>
      </div>
    </div>
  );
};

export default Counts;
