import Detail from "@/components/CountsDetails";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

const CountsDetails = () => {
  return <Detail/>;
};

export default CountsDetails;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);

  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  return {
    props: {
      session,
    },
  };
};
