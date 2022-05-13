import { User } from "../types";

interface Props {
  user: User
}

const PostUser = ({ user }: Props) => {
  return (
    <p>
      {user.name}
    </p>
  )
}

export default PostUser;