import React from "react";

const Home = () => {
  return (
    <>
      <section className="main d-flex">
        {/* <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3"> */}
        <article className="sidebar">
          <h1>watchlist</h1>
          <input type="text" />
          <div className="menu_list">
            <ul>
              <li>Home</li>
              <li>History</li>
            </ul>
          </div>
          <button className="btn_create">create watchlist</button>
          <hr />
          <div className="watchlist">
            <p>My lists</p>
          </div>
        </article>
        {/* </div> */}
        {/* <div className="col-lg-9"> */}
        <div className="right_common">comman</div>
        {/* </div> */}
        {/* </div>
        </div> */}
      </section>
    </>
  );
};

export default Home;
