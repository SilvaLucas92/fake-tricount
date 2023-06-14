import clsx from "clsx";

const Hero = () => {
  return (
    <section className={clsx("text-left")}>
      <h3 className={clsx("text-4xl", "font-bold", "text-gray-900", "mt-5")}>
        Join fake tricount!
      </h3>
      <p className={clsx("my-6", "text-xl", "leading-8", "text-gray-500")}>
        Welcome to the tricount clone, here you can divide your expenses with
        your friends or family!
      </p>
    </section>
  );
};

export default Hero;
