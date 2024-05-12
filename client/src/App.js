import { useQuery, gql } from '@apollo/client';

const GET_HELLO = gql`
  query GetHello {
    hello
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_HELLO);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <p>Error loading data!</p>;
  }

  console.log("Data received from GraphQL:", data);
  return <div>New Hello from GraphQL: {data.hello}</div>;
}

export default App;
