interface IProps {
  githubAddress?: string;
}

const LinkIcons = ({ githubAddress }: IProps) => {
  const handleClickGitHub = () => {
    window.open(githubAddress);
  };
  return (
    <section>
      {githubAddress && (
        <img
          onClick={handleClickGitHub}
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          alt="git"
        />
      )}
    </section>
  );
};

export default LinkIcons;
