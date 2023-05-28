export default function IndexPage() {
  return <p>Redirecting...</p>;
}

export function getServerSideProps() {
  return {
    redirect: {
      destination: "/v2/home",
      permanent: false,
    },
  };
}
