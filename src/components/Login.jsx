import { useEffect, useState } from "react"
import ncNewsGet from "../api/APIUtils";
import UserCard from "./UserCard";

export default  function Login () {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [usersList, setUsersList] = useState([]);
    useEffect(()=>{
        ncNewsGet("/users")
            .then(({ data: { users } }) => {
              setIsLoading(false);
              setUsersList(users);
            })
            .catch((err) => {
              setIsLoading(false);
              setIsError(err);
            });
    }, [])




    return (
        <div id="users">
          {usersList.map((user) => {
            return <UserCard key={user.username} displayUser={user} />;
          })}
        </div>
      );
}