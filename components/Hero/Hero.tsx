import clsx from "clsx";

const Hero = () => {
  return (
    <section className={clsx("text-left")}>
      <h3 className={clsx("text-4xl", "font-bold", "text-gray-900", "mt-5")}>
        Join{" "}
        <span className="font-bold text-4xl">
          <span
            className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400"
            style={{ display: "inline" }}
          >
            Splitcounts!
          </span>
        </span>
      </h3>

      <p className={clsx("my-6", "text-xl", "leading-8", "text-gray-500")}>
        Welcome to the Splitcounts, here you can divide your expenses with your
        friends or family!
      </p>
    </section>
  );
};

export default Hero;
