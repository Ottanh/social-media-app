interface Props {
  user: string
}

const PostUser = ({ user }: Props) => {
  return (
    <div>
      {user}
    </div>
  );
};

export default PostUser;