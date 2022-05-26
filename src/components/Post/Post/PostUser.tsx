interface Props {
  user: string
}

const PostUser = ({ user }: Props) => {
  return (
    <div className="Name">
      {user}
    </div>
  );
};

export default PostUser;