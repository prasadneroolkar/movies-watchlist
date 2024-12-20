import Button from "../components/Button";
const CreateWatchlist = () => {
  return (
    <>
      <div className="create_watchlist">
        <h2>Create a new Watchlist</h2>
      </div>
      <div className="simpleForm">
        <form onSubmit="onSubmit">
          <div className="fields">
            <label htmlFor="">Name</label>
            <input type="text" />
            <p> error</p>
          </div>
          <div className="fields">
            <label htmlFor="">Description</label>
            <textarea name="" id="" />
          </div>
          <Button btnName="Create watchlist" type="submit" />
        </form>
      </div>
    </>
  );
};

export default CreateWatchlist;
