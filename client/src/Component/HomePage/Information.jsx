import React from "react";

const Information = (props) => {
  const { email } = props;
  return (
    <div className="information-video">
      <div className="title-video">Movie Title</div>
      <div className="mail-user">Share by: {email}</div>
      <div className="description">
        <div className="label">Description</div>
        <div className="description-content">
          I think that the error message is a little bit misleading, as it has
          nothing to do with your actual host, but is more about how resources
          from youtube.com are referenced on the page. There are two things I
          would suggest in order to get rid of this error message. (At least
          these were working in my case.)
        </div>
      </div>
    </div>
  );
};

export default Information;
