import React from "react";
import PageTitle from "../components/watchlist/PageTitle";
import Button from "../components/Button";
import WatchlistForm from "../components/watchlist/WatchlistForm";
import InputField from "../components/watchlist/InputField";
import Textarea from "../components/watchlist/Textarea";
import { Link } from "react-router-dom";

const Editwatchlist = () => {
  const onSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <div className="editpage_title d-flex justify-content-between align-items-center">
        <PageTitle
          className="create_watchlist mt-0"
          Title="Edit your Watchlist"
        />
        <Link to="/">Delete Watchlist</Link>
      </div>
      <WatchlistForm onSubmit={onSubmit}>
        <InputField />
        <Textarea />
      </WatchlistForm>
      <section
        className="editmovie_list
      "
      >
        <p
          className="mb-1"
          style={{ fontSize: "18px", lineHeight: "22px", fontWeight: "bold" }}
        >
          Movies
        </p>
        <ul>
          <li>
            movie name <Button className="remove_btn" btnName="remove" />
          </li>
          <li>
            movie name <Button className="remove_btn" btnName="remove" />
          </li>
          <li>
            movie name <Button className="remove_btn" btnName="remove" />
          </li>
        </ul>
        <Button btnName="save" type="submit" />
      </section>
    </>
  );
};

export default Editwatchlist;
